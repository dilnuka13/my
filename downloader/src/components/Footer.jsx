export default function Footer({ onNavClick }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src="./logo.png" alt="DE Downloader" className="footer-logo-img" />
              <span className="footer-logo-name">DE Downloader</span>
            </div>
            <p>
              The fastest and easiest way to download videos and images from YouTube, Facebook, Instagram, and TikTok — completely free.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
              {[
                { icon: 'fab fa-youtube', color: 'var(--youtube-color)' },
                { icon: 'fab fa-facebook', color: 'var(--facebook-color)' },
                { icon: 'fab fa-instagram', color: 'var(--instagram-color)' },
                { icon: 'fab fa-tiktok', color: 'var(--tiktok-color)' },
              ].map((s, i) => (
                <span
                  key={i}
                  style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                    color: s.color, fontSize: '1rem',
                  }}
                >
                  <i className={s.icon}></i>
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }}>Home</a></li>
              <li><a href="#how" onClick={(e) => { e.preventDefault(); onNavClick('how'); }}>How It Works</a></li>
              <li><a href="#platforms" onClick={(e) => { e.preventDefault(); onNavClick('platforms'); }}>Platforms</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); onNavClick('faq'); }}>FAQ</a></li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="footer-links-group">
            <h4>Supported Platforms</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }}><i className="fab fa-youtube" style={{ color: 'var(--youtube-color)', marginRight: '8px' }}></i>YouTube</a></li>
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }}><i className="fab fa-facebook" style={{ color: 'var(--facebook-color)', marginRight: '8px' }}></i>Facebook</a></li>
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }}><i className="fab fa-instagram" style={{ color: 'var(--instagram-color)', marginRight: '8px' }}></i>Instagram</a></li>
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }}><i className="fab fa-tiktok" style={{ color: 'var(--tiktok-color)', marginRight: '8px' }}></i>TikTok</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {year} DE Downloader. All rights reserved.</p>
          <p>
            Made with <span style={{ color: 'var(--primary-color)' }}>♥</span> by{' '}
            <a href="https://dilnuka13.github.io/my/" target="_blank" rel="noopener noreferrer">Isara Dilnuka</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
