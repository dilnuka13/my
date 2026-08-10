const PLATFORMS = [
  {
    key: 'yt',
    icon: 'fab fa-youtube',
    name: 'YouTube',
    desc: 'Download YouTube videos, Shorts, playlists, and extract audio in MP3.',
    features: ['1080p / 4K', '720p / 480p', 'MP3 Audio', 'Shorts'],
  },
  {
    key: 'fb',
    icon: 'fab fa-facebook',
    name: 'Facebook',
    desc: 'Save Facebook videos, Reels, and stories in HD or SD quality.',
    features: ['HD Video', 'SD Video', 'Reels', 'Stories'],
  },
  {
    key: 'ig',
    icon: 'fab fa-instagram',
    name: 'Instagram',
    desc: 'Download Instagram Reels, posts, stories, and profile images easily.',
    features: ['Reels', 'Posts', 'Stories', 'Images'],
  },
  {
    key: 'tt',
    icon: 'fab fa-tiktok',
    name: 'TikTok',
    desc: 'Download TikTok videos without watermark in HD quality.',
    features: ['No Watermark', 'HD Quality', 'MP3 Audio', 'Slideshows'],
  },
];

export default function SupportedSites() {
  return (
    <section id="platforms" className="platforms-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-eyebrow">Supported Platforms</span>
          <h2 className="section-title">Download From Anywhere</h2>
          <p className="section-subtitle">4 major platforms supported — more coming soon.</p>
        </div>

        <div className="platform-cards-grid">
          {PLATFORMS.map((p) => (
            <div key={p.key} className={`platform-card liquid-glass ${p.key}`}>
              <div className="platform-icon-wrap">
                <i className={p.icon}></i>
              </div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="platform-features">
                {p.features.map((f) => (
                  <span key={f} className="platform-feature-tag">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
