import { useState, useRef } from 'react';
import DownloadModal from './DownloadModal';
import { detectPlatformFromUrl, fetchMediaInfo } from '../services/mediaApi';

const PLATFORMS = [
  { id: 'youtube',   key: 'yt', label: 'YouTube',   icon: 'fab fa-youtube',   placeholder: 'https://www.youtube.com/watch?v=...' },
  { id: 'facebook',  key: 'fb', label: 'Facebook',  icon: 'fab fa-facebook',  placeholder: 'https://www.facebook.com/watch?v=...' },
  { id: 'instagram', key: 'ig', label: 'Instagram', icon: 'fab fa-instagram', placeholder: 'https://www.instagram.com/p/...' },
  { id: 'tiktok',    key: 'tt', label: 'TikTok',    icon: 'fab fa-tiktok',    placeholder: 'https://www.tiktok.com/@user/video/...' },
];

function getPlatformByKey(key) {
  return PLATFORMS.find((p) => p.key === key) || PLATFORMS[0];
}

export default function DownloaderHero({ onShowToast }) {
  const [activePlatform, setActivePlatform] = useState(PLATFORMS[0]);
  const [url, setUrl]                       = useState('');
  const [loading, setLoading]               = useState(false);
  const [modalOpen, setModalOpen]           = useState(false);
  const [modalResult, setModalResult]       = useState(null);
  const inputRef = useRef(null);

  const detectedKey = detectPlatformFromUrl(url);
  const detectedPlatform = detectedKey ? getPlatformByKey(detectedKey) : activePlatform;

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    const key = detectPlatformFromUrl(val);
    if (key) setActivePlatform(getPlatformByKey(key));
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      const key = detectPlatformFromUrl(text);
      if (key) setActivePlatform(getPlatformByKey(key));
      onShowToast('URL pasted!', 'success');
    } catch {
      inputRef.current?.focus();
    }
  };

  const handleAnalyze = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      onShowToast('Please enter a valid URL', 'error');
      inputRef.current?.focus();
      return;
    }

    // Validate URL format loosely
    if (!trimmed.startsWith('http')) {
      onShowToast('Please enter a full URL starting with https://', 'error');
      return;
    }

    setLoading(true);
    try {
      const platformKey = detectPlatformFromUrl(trimmed) || activePlatform.key;
      // Fetch real video info (title, thumbnail, author)
      const info = await fetchMediaInfo(trimmed, platformKey);
      setModalResult({ ...info, originalUrl: trimmed });
      setModalOpen(true);
    } catch (err) {
      onShowToast('Could not fetch media info. Check the URL and try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAnalyze();
  };

  return (
    <>
      <section id="hero" className="hero-section">
        {/* Badge */}
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Free · Fast · No Registration Required
        </div>

        {/* Title */}
        <h1 className="hero-title">
          Download Any<br />
          <span className="highlight">Social Media</span> Video
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Paste a link from YouTube, Facebook, Instagram, or TikTok and download videos &amp; images in seconds. Free, fast, and no account needed.
        </p>

        {/* Platform Tabs + URL Input */}
        <div className="platform-tabs-wrapper">
          {/* Platform Tabs */}
          <div className="platform-tabs liquid-glass">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                className={`platform-tab ${p.key} ${detectedPlatform.id === p.id ? 'active' : ''}`}
                onClick={() => setActivePlatform(p)}
              >
                <i className={`${p.icon} platform-tab-icon`}></i>
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* URL Input */}
          <div className="url-input-wrapper">
            <div className="url-input-box">
              <i className={`${detectedPlatform.icon} url-platform-icon ${detectedPlatform.key}`}></i>
              <input
                ref={inputRef}
                type="url"
                className="url-input"
                placeholder={detectedPlatform.placeholder}
                value={url}
                onChange={handleUrlChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
              />
              <button className="url-paste-btn" onClick={handlePaste} title="Paste from clipboard">
                <i className="fas fa-clipboard"></i>
                Paste
              </button>
              <button
                className={`url-download-btn ${loading ? 'loading' : ''}`}
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    Fetching...
                  </>
                ) : (
                  <>
                    <i className="fas fa-magnifying-glass"></i>
                    Analyze
                  </>
                )}
              </button>
            </div>
            <p className="url-hint">
              <i className="fas fa-shield-halved" style={{ color: 'var(--primary-color)' }}></i>
              Safe &amp; secure · No signup required · 100% free · Press <kbd>Enter</kbd> to analyze
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-bar liquid-glass">
          <div className="stat-item">
            <div className="stat-number">10M+</div>
            <div className="stat-label">Downloads</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Platforms</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Free</div>
          </div>
        </div>
      </section>

      {/* Download Modal — receives real info + original URL for cobalt API */}
      <DownloadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        result={modalResult}
        originalUrl={modalResult?.originalUrl || url}
        onShowToast={onShowToast}
      />
    </>
  );
}
