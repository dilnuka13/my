import { useState, useEffect, useRef } from 'react';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const indicatorRef = useRef(null);

  useEffect(() => {
    const activeFilterEl = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
    if (activeFilterEl && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeFilterEl.offsetWidth}px`;
      indicatorRef.current.style.height = `${activeFilterEl.offsetHeight}px`;
      indicatorRef.current.style.transform = `translate(${activeFilterEl.offsetLeft}px, ${activeFilterEl.offsetTop}px)`;
      indicatorRef.current.style.opacity = '1';
    }
  }, [filter]);

  const items = [
    { id: 1, type: 'web', label: 'EDU LK App', icon: 'fas fa-qrcode', style: {} },
    { id: 2, type: 'branding', label: 'Coffee Brand', icon: 'fas fa-coffee', style: { background: 'rgba(255,159,10,0.1)', color: 'var(--accent-orange)' } },
    { id: 3, type: 'web', label: 'E-Commerce UI', icon: 'fas fa-shopping-bag', style: { background: 'rgba(10,132,255,0.1)', color: 'var(--accent-blue)' } }
  ];

  const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);

  return (
    <section id="portfolio" className="page-section section-padding active">
      <div className="container">
        {/* Live Sites */}
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2>Live Projects</h2>
          <p style={{ color: 'var(--text-muted)' }}>Systems and websites currently in operation.</p>
        </div>
        <div className="grid grid-4" style={{ marginBottom: '5rem' }}>
          <div className="card liquid-glass" style={{ textAlign: 'center' }}>
            <div className="sf-icon-wrapper green" style={{ margin: '0 auto 1.5rem' }}>
              <i className="fas fa-cloud-arrow-down"></i>
            </div>
            <h4 style={{ marginBottom: '0.5rem' }}>DE Downloader</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Media Downloader App</p>
            <a href="https://dilnuka13.github.io/DE-DOWNLOADER/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }}>
              Visit Site
            </a>
          </div>
          <div className="card liquid-glass" style={{ textAlign: 'center' }}>
            <div className="sf-icon-wrapper green" style={{ margin: '0 auto 1.5rem' }}>
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h4 style={{ marginBottom: '0.5rem' }}>DE Education.lk</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Student Management</p>
            <a href="https://dilnuka13.github.io/AL/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }}>
              Visit Site
            </a>
          </div>
          <div className="card liquid-glass" style={{ textAlign: 'center' }}>
            <div className="sf-icon-wrapper purple" style={{ margin: '0 auto 1.5rem' }}>
              <i className="fas fa-book-open"></i>
            </div>
            <h4 style={{ marginBottom: '0.5rem' }}>DE NOVA Reader</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>PDF Reader Web</p>
            <a href="https://dilnuka13.github.io/DE-NOVA-READER/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }}>
              Visit Site
            </a>
          </div>
          <div className="card liquid-glass" style={{ textAlign: 'center' }}>
            <div className="sf-icon-wrapper orange" style={{ margin: '0 auto 1.5rem' }}>
              <i className="fas fa-users"></i>
            </div>
            <h4 style={{ marginBottom: '0.5rem' }}>DMY&SC</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Social Club Website</p>
            <a href="https://dmyc.space/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }}>
              Visit Site
            </a>
          </div>
          <div className="card liquid-glass" style={{ textAlign: 'center' }}>
            <div className="sf-icon-wrapper blue" style={{ margin: '0 auto 1.5rem' }}>
              <i className="fas fa-gas-pump"></i>
            </div>
            <h4 style={{ marginBottom: '0.5rem' }}>National Fuel System</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Fuel Pass Clone</p>
            <a href="https://dilnuka13.github.io/FUAL_PASS/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }}>
              Visit Site
            </a>
          </div>
        </div>

        {/* Design Portfolio */}
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h2>Design Showcase</h2>
        </div>
        
        {/* PORTFOLIO FILTERS (With Gliding Indicator) */}
        <div className="portfolio-filters liquid-glass" id="portfolioFilters">
          <div className="liquid-indicator" id="filterIndicator" ref={indicatorRef}></div>
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
            data-filter="all"
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`} 
            data-filter="web"
            onClick={() => setFilter('web')}
          >
            Web UI
          </button>
          <button 
            className={`filter-btn ${filter === 'branding' ? 'active' : ''}`} 
            data-filter="branding"
            onClick={() => setFilter('branding')}
          >
            Branding
          </button>
        </div>
        
        <div className="grid grid-3 portfolio-grid">
          {filteredItems.map(item => (
            <div key={item.id} className={`portfolio-item ${item.type} liquid-glass`}>
              <div className="portfolio-img" style={item.style}>
                <i className={item.icon}></i>
              </div>
              <div className="portfolio-info">
                <h4>{item.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
