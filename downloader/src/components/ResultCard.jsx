const PLATFORM_ICONS = {
  yt: { icon: 'fab fa-youtube',   label: 'YouTube',   cls: 'yt' },
  fb: { icon: 'fab fa-facebook',  label: 'Facebook',  cls: 'fb' },
  ig: { icon: 'fab fa-instagram', label: 'Instagram', cls: 'ig' },
  tt: { icon: 'fab fa-tiktok',    label: 'TikTok',    cls: 'tt' },
};

export default function ResultCard({ result, onShowToast }) {
  const platform = PLATFORM_ICONS[result.platform] || PLATFORM_ICONS.yt;

  const handleOptionClick = (option) => {
    // In real implementation: trigger actual download via backend URL
    onShowToast(`Preparing ${option.quality} ${option.format} download...`, 'success');

    // Simulate a download trigger (real API would return a direct file URL)
    setTimeout(() => {
      onShowToast(`${option.quality} ${option.format} — Ready to download!`, 'success');
    }, 1500);
  };

  return (
    <div className="result-card liquid-glass">
      {/* Media Info */}
      <div className="result-media-info">
        <div className="result-thumbnail">
          <i className={`${platform.icon}`} style={{ fontSize: '2rem', opacity: 0.5 }}></i>
        </div>
        <div className="result-details">
          <div className="result-title">{result.title}</div>
          <div className="result-meta">
            <span className={`result-platform-badge ${platform.cls}`}>
              <i className={platform.icon}></i>
              {platform.label}
            </span>
            {result.duration && <span><i className="fas fa-clock" style={{ marginRight: '4px', opacity: 0.6 }}></i>{result.duration}</span>}
            {result.views && <span>{result.views}</span>}
          </div>
        </div>
      </div>

      {/* Download Options */}
      <p className="download-options-label">
        <i className="fas fa-download" style={{ marginRight: '6px', color: 'var(--primary-color)' }}></i>
        Choose Download Format
      </p>
      <div className="download-options-grid">
        {result.options.map((opt, i) => (
          <button
            key={i}
            className="download-option-btn"
            onClick={() => handleOptionClick(opt)}
            title={`Download ${opt.quality} ${opt.format}`}
          >
            <i className={`${opt.icon} download-option-icon`}></i>
            <span className="download-option-quality">{opt.quality}</span>
            <span className="download-option-format">{opt.format}</span>
            <span className="download-option-size">{opt.size}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
