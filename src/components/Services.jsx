export default function Services({ onStartProjectClick }) {
  return (
    <section id="services" className="page-section section-padding active">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h2>My Services</h2>
          <p style={{ color: 'var(--text-muted)' }}>High-quality services tailored to your needs.</p>
        </div>
        <div className="grid grid-4">
          <div className="card liquid-glass">
            <div className="sf-icon-wrapper blue"><i className="fas fa-laptop-code"></i></div>
            <h3 style={{ marginBottom: '0.8rem' }}>Web Development</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Complete web solutions. From frontend design to backend databases and dashboards.
            </p>
            <button className="btn btn-secondary" onClick={onStartProjectClick} style={{ width: '100%', fontSize: '0.9rem' }}>
              Inquire Now
            </button>
          </div>
          <div className="card liquid-glass">
            <div className="sf-icon-wrapper orange"><i className="fas fa-pen-nib"></i></div>
            <h3 style={{ marginBottom: '0.8rem' }}>Logo Design</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Memorable brand identities and modern vector logos that perfectly represent your business.
            </p>
            <button className="btn btn-secondary" onClick={onStartProjectClick} style={{ width: '100%', fontSize: '0.9rem' }}>
              Inquire Now
            </button>
          </div>
          <div className="card liquid-glass">
            <div className="sf-icon-wrapper purple"><i className="fas fa-share-alt"></i></div>
            <h3 style={{ marginBottom: '0.8rem' }}>Social Media Graphics</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Engaging post designs, cover arts, and full social media branding kits.
            </p>
            <button className="btn btn-secondary" onClick={onStartProjectClick} style={{ width: '100%', fontSize: '0.9rem' }}>
              Inquire Now
            </button>
          </div>
          <div className="card liquid-glass">
            <div className="sf-icon-wrapper green"><i className="fas fa-cloud-arrow-down"></i></div>
            <h3 style={{ marginBottom: '0.8rem' }}>Media Downloader</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Free high-speed downloader for YouTube, Facebook, Instagram, and TikTok media.
            </p>
            <a href="https://dilnuka13.github.io/DE-DOWNLOADER/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem', textAlign: 'center', textDecoration: 'none' }}>
              Launch App
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
