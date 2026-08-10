/**
 * DE Downloader — Media API Service
 * Integrates local yt-dlp backend with automatic public fallbacks
 */

const LOCAL_API = 'http://localhost:5000';
const COBALT_API = 'https://api.cobalt.tools/';

// ─── Detect Platform & Extract IDs ───────────────────────────────────────────

export function detectPlatformFromUrl(url) {
  if (!url) return null;
  if (/youtube\.com|youtu\.be/.test(url))  return 'yt';
  if (/facebook\.com|fb\.watch/.test(url)) return 'fb';
  if (/instagram\.com/.test(url))          return 'ig';
  if (/tiktok\.com/.test(url))             return 'tt';
  return null;
}

export function extractYoutubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// ─── Check Local Backend Health ──────────────────────────────────────────────

async function checkBackendHealth() {
  try {
    const res = await fetch(`${LOCAL_API}/health`, { method: 'GET', signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch (e) {
    return false;
  }
}

// ─── Fetch Media Info ────────────────────────────────────────────────────────

export async function fetchMediaInfo(url, platformKey) {
  // 1. Try Local Backend (yt-dlp)
  try {
    const backendOnline = await checkBackendHealth();
    if (backendOnline) {
      const res = await fetch(`${LOCAL_API}/api/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success') {
          return {
            title:     data.title,
            thumbnail: data.thumbnail,
            author:    data.author,
            duration:  data.duration,
            platform:  data.platform || platformKey,
            type:      data.type || 'video',
            isLocal:   true,
          };
        }
      }
    }
  } catch (err) {
    console.warn('Local backend info check failed, using fallback:', err);
  }

  // 2. Fallback: YouTube oEmbed / noembed
  try {
    if (platformKey === 'yt') {
      const ytId = extractYoutubeId(url);
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = await res.json();
        return {
          title:     data.title || 'YouTube Video',
          thumbnail: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : data.thumbnail_url,
          author:    data.author_name || '',
          platform:  'yt',
          type:      'video',
        };
      }
      if (ytId) {
        return {
          title:     'YouTube Video',
          thumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
          author:    '',
          platform:  'yt',
          type:      'video',
        };
      }
    }

    const noembedUrl = `https://noembed.com/embed?url=${encodeURIComponent(url)}`;
    const res = await fetch(noembedUrl);
    if (res.ok) {
      const data = await res.json();
      if (data.title && !data.error) {
        return {
          title:     data.title,
          thumbnail: data.thumbnail_url || null,
          author:    data.author_name || '',
          platform:  platformKey,
          type:      platformKey === 'ig' && !url.includes('/reel') && !url.includes('/video') ? 'image' : 'video',
        };
      }
    }
  } catch (e) {
    console.warn('fetchMediaInfo fallback error:', e);
  }

  return {
    title:     'Media Content',
    thumbnail: null,
    author:    '',
    platform:  platformKey,
    type:      'video',
  };
}

// ─── Fetch Download URL / Direct Stream ──────────────────────────────────────

export async function fetchDownloadUrl(url, opts = {}) {
  // 1. Check Local Backend (yt-dlp)
  try {
    const backendOnline = await checkBackendHealth();
    if (backendOnline) {
      const res = await fetch(`${LOCAL_API}/api/get-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          mode: opts.mode || 'video',
          quality: opts.quality || '720',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.url) {
          return {
            status: 'redirect',
            url: data.url,
            filename: 'DE_Downloader_Media',
            isLocal: true,
          };
        }
      }
    }
  } catch (e) {
    console.warn('Local download stream check failed:', e);
  }

  // 2. Fallback to Cobalt API
  const body = {
    url,
    videoQuality:  opts.quality      || '720',
    downloadMode:  opts.mode === 'audio' ? 'audio' : 'auto',
    audioFormat:   opts.audioFormat  || 'mp3',
    audioBitrate:  opts.audioBitrate || '128',
    filenameStyle: 'pretty',
  };

  const res = await fetch(COBALT_API, {
    method: 'POST',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.status === 'error') {
    const code = data?.error?.code || '';
    const MSG = {
      'error.api.auth.jwt.missing':       'Backend server starting... Please retry in a few seconds.',
      'error.api.unreachable':           'Download service unreachable. Try again.',
      'error.api.link.unsupported':      'This platform or URL is not supported.',
      'error.api.link.video.unavailable':'This video is unavailable or private.',
      'error.api.content.too_long':      'Video is too long to download.',
      'error.api.fetch.fail':            'Could not fetch media. Link may be private.',
    };
    throw new Error(MSG[code] || code || `Download Error (${res.status})`);
  }

  return data;
}

// ─── Trigger Browser Download ─────────────────────────────────────────────────

export function triggerDownload(url, filename = 'download') {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.target   = '_blank';
  a.rel      = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
