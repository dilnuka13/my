import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Hero({ onStartProjectClick }) {
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    const texts = ['Full Stack Dev', 'Graphics Designer', 'Creator'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    function tick() {
      const currentText = texts[textIndex];
      if (isDeleting) {
        setTypedText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 80 : 150;

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        speed = 2000; // Wait before deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500; // Wait before typing next word
      }

      timer = setTimeout(tick, speed);
    }

    tick();

    return () => clearTimeout(timer);
  }, []);

  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 2018;

  return (
    <section id="home" className="page-section section-padding active">
      <div className="container hero-container">
        <div className="grid grid-2">
          <div className="hero-content">
            {/* Since 2018 Badge */}
            <div className="since-badge liquid-glass">
              <i className="fas fa-history"></i> Freelancer Since 2018
            </div>
            
            <br />
            <span style={{ color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Hello, I'm Isara Dilnuka
            </span>
            <h1>
              Creative <br />
              <span className="typing-text">{typedText}</span>
            </h1>
            <p className="hero-subtitle">
              I craft high-performance websites, robust backend systems, and unique brand identities. Transforming your digital vision into reality.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onStartProjectClick}>
                <i className="fas fa-rocket"></i> Start Project
              </button>
              <Link to="/portfolio" className="btn btn-secondary">
                <i className="fas fa-eye"></i> View Work
              </Link>
            </div>

            <div className="stat-group">
              <div className="stat-item">
                <h3>{experienceYears}+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Projects Done</p>
              </div>
            </div>
          </div>
          {/* Hero image hides on Mobile entirely via CSS */}
          <div className="hero-image">
            <div className="image-wrapper liquid-glass" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <img 
                src={`${import.meta.env.BASE_URL}my-bk-remove.png`} 
                className="profile-mask"
                alt="Isara Dilnuka" 
                loading="lazy" 
                onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}isara-profile.jpg`; }} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
