import { useEffect, useRef, useState } from 'react';
import { fetchDownloadUrl, triggerDownload } from '../services/mediaApi';

const PLATFORM_META = {
  yt: { icon: 'fab fa-youtube',   label: 'YouTube',   color: '#FF0000', glow: 'rgba(255,0,0,0.3)' },
  fb: { icon: 'fab fa-facebook',  label: 'Facebook',  color: '#1877F2', glow: 'rgba(24,119,242,0.3)' },
  ig: { icon: 'fab fa-instagram', label: 'Instagram', color: '#E1306C', glow: 'rgba(225,48,108,0.3)' },
  tt: { icon: 'fab fa-tiktok',    label: 'TikTok',    color: '#69C9D0', glow: 'rgba(105,201,208,0.3)' },
};

// Quality options per platform
const VIDEO_QUALITIES = {
  yt: [
    { label: '4K',   quality: '2160', format: 'MP4', badge: 'ULTRA' },
    { label: '1080p', quality: '1080', format: 'MP4', badge: 'HD' },
    { label: '720p',  quality: '720',  format: 'MP4', badge: 'HD' },
    { label: '480p',  quality: '480',  format: 'MP4', badge: null },
    { label: '360p',  quality: '360',  format: 'MP4', badge: null },
    { label: '240p',  quality: '240',  format: 'MP4', badge: null },
  ],
  fb: [
    { label: 'HD',  quality: '720',  format: 'MP4', badge: 'HD' },
    { label: 'SD',  quality: '480',  format: 'MP4', badge: null },
  ],
  ig: [
    { label: 'Original', quality: '1080', format: 'MP4', badge: 'HD' },
    { label: 'Standard', quality: '720',  format: 'MP4', badge: null },
  ],
  tt: [
    { label: 'HD (No Watermark)', quality: '1080', format: 'MP4', badge: 'HD' },
    { label: 'SD',               quality: '720',  format: 'MP4', badge: null },
  ],
};

const AUDIO_QUALITIES = {
  yt: [
    { label: '320 kbps', quality: '1080', format: 'MP3', badge: 'BEST', audioBitrate: '320' },
    { label: '256 kbps', quality: '1080', format: 'MP3', badge: null,   audioBitrate: '256' },
    { label: '192 kbps', quality: '1080', format: 'MP3', badge: null,   audioBitrate: '192' },
    { label: '128 kbps', quality: '1080', format: 'MP3', badge: null,   audioBitrate: '128' },
    { label: '64 kbps',  quality: '1080', format: 'MP3', badge: null,   audioBitrate: '64' },
  ],
  fb: [{ label: '128 kbps', quality: '1080', format: 'MP3', badge: null, audioBitrate: '128' }],
  ig: [{ label: '128 kbps', quality: '1080', format: 'MP3', badge: null, audioBitrate: '128' }],
  tt: [
    { label: '320 kbps', quality: '1080', format: 'MP3', badge: 'BEST', audioBitrate: '320' },
    { label: '128 kbps', quality: '1080', format: 'MP3', badge: null,   audioBitrate: '128' },
  ],
};

const IMAGE_QUALITIES = {
  ig: [
    { label: 'Original', quality: '1080', format: 'JPG/PNG', badge: 'BEST' },
    { label: 'Standard', quality: '720',  format: 'JPG',     badge: null },
  ],
  fb: [
    { label: 'Original',    quality: '1080', format: 'JPG', badge: 'BEST' },
    { label: 'Compressed',  quality: '720',  format: 'JPG', badge: null },
  ],
  tt: [
    { label: 'Cover Image', quality: '1080', format: 'JPG', badge: null },
  ],
  yt: [
    { label: 'Max Res', quality: '1080', format: 'JPG', badge: 'BEST' },
    { label: 'High',    quality: '720',  format: 'JPG', badge: null },
  ],
};

export default function DownloadModal({ isOpen, onClose, result, originalUrl, onShowToast }) {
  const [activeTab, setActiveTab]       = useState('video');
  const [preparing, setPreparing]       = useState(null);   // { index, label }
  const [progress, setProgress]         = useState(0);
  const [downloadUrl, setDownloadUrl]   = useState(null);
  const [downloadErr, setDownloadErr]   = useState(null);
  const [thumbErr, setThumbErr]         = useState(false);

  const backdropRef  = useRef(null);
  const progressTmr  = useRef(null);

  const platform = result ? (PLATFORM_META[result.platform] || PLATFORM_META.yt) : null;
  const platformKey  = result?.platform || 'yt';
  const isImageType  = result?.type === 'image';
  const hasImage     = ['ig', 'fb', 'tt'].includes(platformKey);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setPreparing(null);
      setProgress(0);
      setDownloadUrl(null);
      setDownloadErr(null);
      setThumbErr(false);
      setActiveTab(isImageType ? 'image' : 'video');
    }
    return () => clearInterval(progressTmr.current);
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);

  const handleBackdrop = (e) => { if (e.target === backdropRef.current) onClose(); };

  // ─── Start preparing a quality ──────────────────────────────────────────────
  const handleSelectQuality = async (item, tabMode) => {
    if (preparing) return;
    const key = `${tabMode}-${item.label}`;
    setPreparing(key);
    setProgress(0);
    setDownloadUrl(null);
    setDownloadErr(null);

    // Fake progress while real API call runs
    let fakeP = 0;
    progressTmr.current = setInterval(() => {
      fakeP = Math.min(fakeP + Math.random() * 8 + 4, 85);
      setProgress(fakeP);
    }, 120);

    try {
      const opts = {
        quality:      item.quality,
        mode:         tabMode === 'audio' ? 'audio' : (tabMode === 'image' ? 'auto' : 'auto'),
        audioFormat:  tabMode === 'audio' ? 'mp3' : undefined,
        audioBitrate: tabMode === 'audio' ? item.audioBitrate : undefined,
      };

      const data = await fetchDownloadUrl(originalUrl, opts);
      clearInterval(progressTmr.current);
      setProgress(100);

      // cobalt returns either a direct URL or a picker array
      if (data.status === 'picker') {
        // Multiple items (e.g. Instagram carousel) — use first
        const firstUrl = data.picker?.[0]?.url;
        if (firstUrl) {
          setDownloadUrl(firstUrl);
          onShowToast(`${item.label} ${item.format} — Ready!`, 'success');
        } else throw new Error('No downloadable item found');
      } else if (data.url) {
        setDownloadUrl(data.url);
        onShowToast(`${item.label} ${item.format} — Ready!`, 'success');
      } else {
        throw new Error('No download URL returned');
      }
    } catch (err) {
      clearInterval(progressTmr.current);
      setProgress(0);
      setPreparing(null);
      const msg = err.message || 'Download preparation failed. Please try again.';
      setDownloadErr(msg);
      onShowToast(`Error: ${msg}`, 'error');
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    triggerDownload(downloadUrl, result?.title || 'download');
    onShowToast('Download started!', 'success');
    // Don't close so user can download more qualities
  };

  const handleReset = () => {
    clearInterval(progressTmr.current);
    setPreparing(null);
    setProgress(0);
    setDownloadUrl(null);
    setDownloadErr(null);
  };

  if (!result) return null;

  const videoList = VIDEO_QUALITIES[platformKey] || VIDEO_QUALITIES.yt;
  const audioList = AUDIO_QUALITIES[platformKey] || [];
  const imageList = IMAGE_QUALITIES[platformKey] || [];

  return (
    <div
      className={`dl-modal-backdrop ${isOpen ? 'active' : ''}`}
      ref={backdropRef}
      onClick={handleBackdrop}
    >
      <div className={`dl-modal ${isOpen ? 'active' : ''}`} role="dialog" aria-modal="true">

        {/* Drag handle */}
        <div className="dl-modal-drag"></div>

        {/* ── Header ── */}
        <div className="dl-modal-header">
          <div className="dl-modal-platform-badge" style={{ '--p-color': platform.color }}>
            <i className={platform.icon}></i>
            <span>{platform.label}</span>
          </div>
          <div className="dl-modal-title-wrap">
            <h3 className="dl-modal-title" title={result.title}>{result.title}</h3>
            <div className="dl-modal-meta">
              {result.author && <span><i className="fas fa-user"></i> {result.author}</span>}
              {result.duration && <span><i className="fas fa-clock"></i> {result.duration}</span>}
              {result.views   && <span><i className="fas fa-eye"></i> {result.views}</span>}
            </div>
          </div>
          <button className="dl-modal-close" onClick={onClose} aria-label="Close">
            <i className="fas fa-xmark"></i>
          </button>
        </div>

        {/* ── Preview Thumbnail ── */}
        <div className="dl-modal-preview">
          <div className="dl-preview-thumb" style={{ '--p-color': platform.color }}>
            {result.thumbnail && !thumbErr ? (
              <img
                src={result.thumbnail}
                alt={result.title}
                className="dl-preview-img"
                onError={() => setThumbErr(true)}
              />
            ) : (
              <i className={`${platform.icon} dl-preview-icon`} style={{ color: platform.color }}></i>
            )}
            <div className="dl-preview-overlay">
              {result.type !== 'image' && (
                <i className="fas fa-play-circle dl-play-icon"></i>
              )}
            </div>
            <div className="dl-preview-badge" style={{ background: platform.color }}>
              {result.type === 'image' ? 'IMAGE' : 'VIDEO'}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="dl-modal-tabs">
          {!isImageType && (
            <>
              <button
                className={`dl-tab ${activeTab === 'video' ? 'active' : ''}`}
                onClick={() => { setActiveTab('video'); handleReset(); }}
              >
                <i className="fas fa-film"></i> MP4 Video
              </button>
              <button
                className={`dl-tab ${activeTab === 'audio' ? 'active' : ''}`}
                onClick={() => { setActiveTab('audio'); handleReset(); }}
              >
                <i className="fas fa-music"></i> MP3 Audio
              </button>
            </>
          )}
          {(isImageType || hasImage) && (
            <button
              className={`dl-tab ${activeTab === 'image' ? 'active' : ''}`}
              onClick={() => { setActiveTab('image'); handleReset(); }}
            >
              <i className="fas fa-image"></i> Image
            </button>
          )}
        </div>

        {/* ── Error Banner ── */}
        {downloadErr && (
          <div className="dl-error-banner">
            <i className="fas fa-circle-exclamation"></i>
            {downloadErr}
            <button onClick={handleReset} className="dl-error-retry">
              <i className="fas fa-rotate-right"></i> Retry
            </button>
          </div>
        )}

        {/* ── Quality List ── */}
        <div className="dl-quality-list">
          {activeTab === 'video' && videoList.map((item, i) => (
            <QualityRow
              key={i}
              item={item}
              tabMode="video"
              preparingKey={preparing}
              rowKey={`video-${item.label}`}
              progress={progress}
              downloadUrl={downloadUrl}
              platformColor={platform.color}
              onSelect={handleSelectQuality}
              onDownload={handleDownload}
            />
          ))}
          {activeTab === 'audio' && audioList.map((item, i) => (
            <QualityRow
              key={i}
              item={item}
              tabMode="audio"
              preparingKey={preparing}
              rowKey={`audio-${item.label}`}
              progress={progress}
              downloadUrl={downloadUrl}
              platformColor={platform.color}
              onSelect={handleSelectQuality}
              onDownload={handleDownload}
            />
          ))}
          {activeTab === 'image' && imageList.map((item, i) => (
            <QualityRow
              key={i}
              item={item}
              tabMode="image"
              preparingKey={preparing}
              rowKey={`image-${item.label}`}
              progress={progress}
              downloadUrl={downloadUrl}
              platformColor={platform.color}
              onSelect={handleSelectQuality}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="dl-modal-footer-note">
          <i className="fas fa-shield-halved" style={{ color: 'var(--primary-color)' }}></i>
          Powered by cobalt.tools · Safe &amp; No ads
        </div>
      </div>
    </div>
  );
}

// ─── Quality Row ───────────────────────────────────────────────────────────────
function QualityRow({ item, tabMode, preparingKey, rowKey, progress, downloadUrl, platformColor, onSelect, onDownload }) {
  const isThisRow    = preparingKey === rowKey;
  const isOtherRow   = preparingKey !== null && preparingKey !== rowKey;
  const isReady      = isThisRow && progress >= 100 && downloadUrl;
  const isPreparing  = isThisRow && !isReady;

  const formatIcon = item.format === 'MP3' ? 'fas fa-music' : item.format?.includes('JPG') ? 'fas fa-image' : 'fas fa-film';

  return (
    <div className={`dl-quality-row ${isPreparing ? 'preparing' : ''} ${isOtherRow ? 'disabled' : ''} ${isReady ? 'ready' : ''}`}>
      <div className="dl-quality-info">
        <div className="dl-quality-name-wrap">
          <span className="dl-quality-name">{item.label}</span>
          {item.badge && (
            <span className="dl-quality-badge" style={{ '--p-color': platformColor }}>
              {item.badge}
            </span>
          )}
        </div>
        <span className="dl-quality-meta">
          <i className={formatIcon}></i> {item.format}
        </span>
      </div>

      {/* Progress bar while preparing */}
      {isPreparing && (
        <div className="dl-progress-wrap">
          <div className="dl-progress-bar-bg">
            <div
              className="dl-progress-bar-fill"
              style={{ width: `${progress}%`, '--p-color': platformColor }}
            ></div>
          </div>
          <span className="dl-progress-pct">{Math.round(progress)}%</span>
        </div>
      )}

      {/* Action area */}
      <div className="dl-quality-action">
        {isReady ? (
          <button
            className="dl-btn dl-btn-download"
            style={{ '--p-color': platformColor }}
            onClick={onDownload}
          >
            <i className="fas fa-download"></i> Download
          </button>
        ) : isPreparing ? (
          <span className="dl-btn-preparing">
            <i className="fas fa-circle-notch fa-spin"></i> Preparing...
          </span>
        ) : (
          <button
            className="dl-btn dl-btn-select"
            disabled={!!isOtherRow}
            onClick={() => onSelect(item, tabMode)}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
}
