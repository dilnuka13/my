import { Fragment, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const indicatorRef = useRef(null);

  const getActiveSection = (pathname) => {
    if (pathname === '/' || !pathname) return 'home';
    return pathname.replace('/', '');
  };

  const activeSection = getActiveSection(location.pathname);

  useEffect(() => {
    const targetHref = activeSection === 'home' ? '#/' : `#/${activeSection}`;
    const activeLink = document.querySelector(`.nav-link[href="${targetHref}"]`);
    if (activeLink && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
      indicatorRef.current.style.height = `${activeLink.offsetHeight}px`;
      indicatorRef.current.style.transform = `translate(${activeLink.offsetLeft}px, ${activeLink.offsetTop}px)`;
      indicatorRef.current.style.opacity = '1';
    }
  }, [activeSection]);

  const handleLinkClick = (e, section) => {
    e.preventDefault();
    navigate(section === 'home' ? '/' : `/${section}`);
  };

  const menuItems = [
    { id: 'home', text: 'Home', icon: 'fas fa-home' },
    { id: 'about', text: 'About', icon: 'fas fa-user' },
    { id: 'services', text: 'Services', icon: 'fas fa-briefcase' },
    { id: 'portfolio', text: 'Portfolio', icon: 'fas fa-layer-group' },
    { id: 'apps', text: 'Apps', icon: 'fas fa-mobile-alt' },
    { id: 'contact', text: 'Contact', icon: 'fas fa-envelope' },
  ];

  return (
    <>
      {/* MOBILE ONLY TOP LOGO */}
      <a 
        href="#/" 
        className="mobile-top-logo nav-logo"
        onClick={(e) => handleLinkClick(e, 'home')}
      >
        <img 
          src={`${import.meta.env.BASE_URL}titlebar.png`} 
          alt="ID" 
          style={{ height: '28px', objectFit: 'contain' }} 
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
      </a>

      {/* DYNAMIC PILL HEADER / MOBILE BOTTOM BAR */}
      <header className="header liquid-glass">
        <div className="nav-container">
          {/* Desktop Left: Logo Image */}
          <div className="nav-logo-wrapper">
            <a 
              href="#/" 
              className="nav-logo"
              onClick={(e) => handleLinkClick(e, 'home')}
            >
              <img 
                src={`${import.meta.env.BASE_URL}titlebar.png`} 
                alt="Isara Dilnuka" 
                className="logo-img" 
                onError={(e) => { e.target.src = 'https://placehold.co/80x30/1C1C1E/FFFFFF?text=ID'; }} 
              />
            </a>
          </div>

          {/* Center: Navigation */}
          <nav className="nav-main">
            <ul className="nav-links" id="navLinks">
              {/* The sliding liquid drop indicator */}
              <div 
                className="liquid-indicator" 
                id="navIndicator" 
                ref={indicatorRef}
              ></div>

              {menuItems.map((item, idx) => (
                <Fragment key={item.id}>
                  <li>
                    <a 
                      href={item.id === 'home' ? '#/' : `#/${item.id}`} 
                      className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                    >
                      <i className={`${item.icon} nav-icon`}></i>
                      <span className="nav-text">{item.text}</span>
                    </a>
                  </li>
                  {idx < menuItems.length - 1 && <li className="nav-dot"><i className="fas fa-circle"></i></li>}
                </Fragment>
              ))}
            </ul>
          </nav>

          {/* Desktop Right Placeholder (Balances Logo width) */}
          <div className="nav-placeholder"></div>
        </div>
      </header>
    </>
  );
}

