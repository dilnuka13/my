import { Fragment, useEffect, useRef } from 'react';

const navItems = [
  { id: 'hero',      label: 'Home',       icon: 'fas fa-home' },
  { id: 'how',       label: 'How It Works', icon: 'fas fa-circle-info' },
  { id: 'platforms', label: 'Platforms',  icon: 'fas fa-layer-group' },
  { id: 'faq',       label: 'FAQ',        icon: 'fas fa-circle-question' },
];

export default function Header({ activeSection, onNavClick }) {
  const indicatorRef = useRef(null);

  useEffect(() => {
    const activeLink = document.querySelector(`.nav-link[data-section="${activeSection}"]`);
    if (activeLink && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
      indicatorRef.current.style.height = `${activeLink.offsetHeight}px`;
      indicatorRef.current.style.transform = `translate(${activeLink.offsetLeft}px, ${activeLink.offsetTop}px)`;
      indicatorRef.current.style.opacity = '1';
    }
  }, [activeSection]);

  return (
    <>
      {/* Mobile Top Logo - uses DE logo */}
      <div className="mobile-top-logo">
        <img src="./logo.png" alt="DE Downloader" style={{ height: '30px', width: '30px', objectFit: 'contain', borderRadius: '8px' }} />
        <span className="mobile-logo-text">DE <span>Downloader</span></span>
      </div>

      {/* Main Header */}
      <header className="header liquid-glass">
        <div className="nav-container">
          {/* Desktop Logo */}
          <div className="nav-logo-wrapper">
            <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }}>
              <img src="./logo.png" alt="DE Downloader" className="logo-img" />
              <span className="logo-text">DE <span>Downloader</span></span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="nav-main">
            <ul className="nav-links" id="navLinks">
              <div className="liquid-indicator" ref={indicatorRef}></div>
              {navItems.map((item, idx) => (
                <Fragment key={item.id}>
                  <li>
                    <a
                      href={`#${item.id}`}
                      className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                      data-section={item.id}
                      onClick={(e) => { e.preventDefault(); onNavClick(item.id); }}
                    >
                      <i className={`${item.icon} nav-icon`}></i>
                      <span className="nav-text">{item.label}</span>
                    </a>
                  </li>
                  {idx < navItems.length - 1 && (
                    <li className="nav-dot" aria-hidden="true"><i className="fas fa-circle"></i></li>
                  )}
                </Fragment>
              ))}
            </ul>
          </nav>

          <div className="nav-placeholder"></div>
        </div>
      </header>
    </>
  );
}
