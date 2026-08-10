import express from 'express';
import cors from 'cors';
import { execFile } from 'child_process';
import http from 'http';
import https from 'https';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Format duration
function formatDuration(sec) {
  if (!sec || isNaN(sec)) return null;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Detect Platform
function detectPlatform(url) {
  if (!url) return 'yt';
  if (/youtube\.com|youtu\.be/.test(url)) return 'yt';
  if (/facebook\.com|fb\.watch/.test(url)) return 'fb';
  if (/instagram\.com/.test(url)) return 'ig';
  if (/tiktok\.com/.test(url)) return 'tt';
  return 'yt';
}

// ─── POST /api/info ─────────────────────────────────────────────────────────
app.post('/api/info', (req, res) => {
  const url = req.body?.url || req.query?.url;
  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return res.status(400).json({ status: 'error', message: 'Please provide a valid HTTP/HTTPS URL.' });
  }

  const platform = detectPlatform(url);
  const args = ['--no-update', '--no-warnings', '--no-playlist', '--skip-download', '-J', url];

  execFile('yt-dlp', args, { maxBuffer: 1024 * 1024 * 25, timeout: 15000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('yt-dlp info error:', stderr || error.message);
      return res.status(500).json({
        status: 'error',
        message: 'Could not fetch video info. Link may be private, deleted, or unsupported.',
      });
    }

    try {
      const data = JSON.parse(stdout);
      const title = data.title || data.fulltitle || 'Downloaded Media';
      const author = data.uploader || data.channel || data.artist || data.creator || '';
      const duration = formatDuration(data.duration);
      
      let thumbnail = data.thumbnail;
      if (!thumbnail && Array.isArray(data.thumbnails) && data.thumbnails.length > 0) {
        thumbnail = data.thumbnails[data.thumbnails.length - 1].url;
      }

      const isImage = (data.vcodec === 'none' && data.acodec === 'none') || data.ext === 'jpg' || data.ext === 'png';

      res.json({
        status: 'success',
        platform,
        title,
        author,
        duration,
        thumbnail,
        type: isImage ? 'image' : 'video',
      });
    } catch (parseErr) {
      console.error('yt-dlp JSON parse error:', parseErr);
      res.status(500).json({ status: 'error', message: 'Failed to process media information.' });
    }
  });
});

// ─── GET & POST /api/get-url ── Extract Direct Download Stream URL ──────────
const handleGetUrl = (req, res) => {
  const url = req.body?.url || req.query?.url;
  const modeStr = req.body?.mode || req.query?.mode || 'video';

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ status: 'error', message: 'Invalid URL parameter.' });
  }

  let formatArg = 'b/best';
  if (modeStr === 'audio') {
    formatArg = 'ba/b/best';
  } else if (modeStr === 'image') {
    formatArg = 'b/best';
  }

  const args = ['--no-update', '--no-warnings', '--no-playlist', '-g', '-f', formatArg, url];

  execFile('yt-dlp', args, { timeout: 15000 }, (error, stdout) => {
    if (error || !stdout.trim()) {
      // Fallback
      const fallbackArgs = ['--no-update', '--no-warnings', '--no-playlist', '-g', url];
      execFile('yt-dlp', fallbackArgs, { timeout: 15000 }, (fbErr, fbStdout) => {
        if (fbErr || !fbStdout.trim()) {
          return res.status(500).json({ status: 'error', message: 'Could not extract direct stream URL.' });
        }
        const lines = fbStdout.trim().split('\n');
        const directUrl = lines[0].trim();
        const proxyUrl = `http://localhost:${PORT}/api/proxy?url=${encodeURIComponent(directUrl)}`;
        return res.json({ status: 'success', url: proxyUrl, directUrl });
      });
      return;
    }

    const lines = stdout.trim().split('\n');
    const directUrl = lines[0].trim();
    const proxyUrl = `http://localhost:${PORT}/api/proxy?url=${encodeURIComponent(directUrl)}`;
    return res.json({ status: 'success', url: proxyUrl, directUrl });
  });
};

app.post('/api/get-url', handleGetUrl);
app.get('/api/get-url', handleGetUrl);

// ─── GET /api/proxy ── Proxy stream directly for clean download ───────────
app.get('/api/proxy', (req, res) => {
  const mediaUrl = req.query.url;
  if (!mediaUrl || typeof mediaUrl !== 'string') {
    return res.status(400).send('Missing media url');
  }

  try {
    const parsedUrl = new URL(mediaUrl);
    const client = parsedUrl.protocol === 'https:' ? https : http;

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': '*/*',
    };

    client.get(mediaUrl, { headers }, (remoteRes) => {
      if (remoteRes.statusCode >= 300 && remoteRes.statusCode < 400 && remoteRes.headers.location) {
        return res.redirect(`/api/proxy?url=${encodeURIComponent(remoteRes.headers.location)}`);
      }

      const contentType = remoteRes.headers['content-type'] || 'video/mp4';
      const contentLength = remoteRes.headers['content-length'];

      res.setHeader('Content-Disposition', `attachment; filename="DE_Downloader_${Date.now()}.mp4"`);
      res.setHeader('Content-Type', contentType);
      if (contentLength) res.setHeader('Content-Length', contentLength);

      remoteRes.pipe(res);
    }).on('error', (err) => {
      console.error('Proxy stream error:', err);
      if (!res.headersSent) res.status(500).send('Download stream failed');
    });
  } catch (e) {
    console.error('Invalid URL for proxy:', e);
    res.status(400).send('Invalid stream URL');
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', server: 'DE Downloader Backend' });
});

app.listen(PORT, () => {
  console.log(`DE Downloader Backend running on http://localhost:${PORT}`);
});
