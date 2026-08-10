export default function Apps() {
  return (
    <section id="apps" className="page-section section-padding active">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2>My Applications</h2>
          <p style={{ color: 'var(--text-muted)' }}>Download my custom-built software for PC and Mobile.</p>
        </div>
        <div className="grid grid-3" style={{ marginBottom: '5rem' }}>
          {/* DE NOVA Reader */}
          <div className="card liquid-glass" style={{ textAlign: 'center' }}>
            <div className="sf-icon-wrapper" style={{ margin: '0 auto 1.5rem', background: 'transparent', padding: 0 }}>
              <img 
                src="https://dilnuka13.github.io/AL/favicon.ico" 
                alt="DE NOVA Reader Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px' }} 
              />
            </div>
            <h4 style={{ marginBottom: '0.5rem' }}>DE NOVA Reader</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              A clean and efficient PDF Reader Application.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://dilnuka13.github.io/DE-NOVA-READER/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                <i className="fas fa-globe"></i> Web App
              </a>
              <a href="https://dilnuka13.github.io/DE-NOVA-READER/?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                <i className="fab fa-windows"></i> PC
              </a>
              <button className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', opacity: 0.5, pointerEvents: 'none' }} title="Coming Soon">
                <i className="fab fa-android"></i> Android
              </button>
            </div>
          </div>
          
          {/* DE Education */}
          <div className="card liquid-glass" style={{ textAlign: 'center' }}>
            <div className="sf-icon-wrapper" style={{ margin: '0 auto 1.5rem', background: 'transparent', padding: 0 }}>
              <img 
                src="https://dilnuka13.github.io/AL/favicon.ico" 
                alt="DE Education Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px' }} 
              />
            </div>
            <h4 style={{ marginBottom: '0.5rem' }}>DE Education</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              A/L Past Papers, Marking Schemes, AI Education Agents, Results Gateway, Calendar & Notices.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://dilnuka13.github.io/AL/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                <i className="fas fa-globe"></i> Web App
              </a>
              <a href="https://drive.google.com/file/d/1yFpYLmIoHH2Cp8ZkxK7Y8cO5rYmD-rYq/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                <i className="fab fa-windows"></i> PC
              </a>
              <a href="https://hppojrbfhzttzvlvovre.supabase.co/storage/v1/object/public/app-files/DE%20E%201.0v.apk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                <i className="fab fa-android"></i> Android
              </a>
            </div>
          </div>

          {/* DE Downloader */}
          <div className="card liquid-glass" style={{ textAlign: 'center' }}>
            <div className="sf-icon-wrapper green" style={{ margin: '0 auto 1.5rem' }}>
              <i className="fas fa-cloud-arrow-down" style={{ fontSize: '1.5rem' }}></i>
            </div>
            <h4 style={{ marginBottom: '0.5rem' }}>DE Downloader</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              Download HD Videos, MP3 Audio & Media from YouTube, FB, IG & TikTok effortlessly.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://dilnuka13.github.io/DE-DOWNLOADER/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                <i className="fas fa-globe"></i> Web App
              </a>
              <button className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', opacity: 0.5, pointerEvents: 'none' }} title="Coming Soon">
                <i className="fab fa-windows"></i> PC
              </button>
              <button className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', opacity: 0.5, pointerEvents: 'none' }} title="Coming Soon">
                <i className="fab fa-android"></i> Android
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
