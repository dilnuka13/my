import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ onStartProjectClick }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybO-OxijJKzE_tBJtLuo_cag_5J6e8RdSs0qPUzrTXklG0-KTM2e-s6l_-6MxGC14FFg/exec';

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
      .then(() => {
        setShowSuccessModal(true);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((err) => {
        console.error(err);
        alert('Submission failed. Please check your internet connection.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <section id="contact" className="page-section section-padding active">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2>Get In Touch</h2>
            <p style={{ color: 'var(--text-muted)' }}>Let's discuss your next big idea.</p>
          </div>
          <div className="grid grid-2">
            <div className="card liquid-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Ready to build something?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Use my detailed requirement form for a comprehensive quote, or send a quick message.
              </p>
              
              <button className="btn btn-primary" onClick={onStartProjectClick} style={{ width: '100%', marginBottom: '1rem' }}>
                <i className="fas fa-file-alt"></i> Fill Project Requirement Form
              </button>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://wa.me/94716155666" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ flex: 1 }}>
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
                <a href="mailto:in.fo.dilnuka@outlook.com" className="btn btn-secondary" style={{ flex: 1 }}>
                  <i className="fas fa-envelope"></i> Email
                </a>
              </div>
            </div>
            
            <div className="card liquid-glass">
              <h3 style={{ marginBottom: '1.5rem' }}>Quick Message</h3>
              <form id="contactForm" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name" 
                  className="form-control" 
                  required 
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  required 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea 
                  name="message" 
                  className="form-control" 
                  rows="4" 
                  required 
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="grid grid-3" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <div className="card liquid-glass" style={{ padding: '1.5rem' }}>
              <div className="sf-icon-wrapper green" style={{ margin: '0 auto 1rem', width: '48px', height: '48px', fontSize: '1.2rem' }}>
                <i className="fab fa-whatsapp"></i>
              </div>
              <p style={{ fontWeight: 500 }}>WhatsApp</p>
            </div>
            <div className="card liquid-glass" style={{ padding: '1.5rem' }}>
              <div className="sf-icon-wrapper blue" style={{ margin: '0 auto 1rem', width: '48px', height: '48px', fontSize: '1.2rem' }}>
                <i className="fas fa-envelope"></i>
              </div>
              <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>in.fo.dilnuka@outlook.com</p>
            </div>
            <div className="card liquid-glass" style={{ padding: '1.5rem' }}>
              <div className="sf-icon-wrapper orange" style={{ margin: '0 auto 1rem', width: '48px', height: '48px', fontSize: '1.2rem' }}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <p style={{ fontWeight: 500 }}>Horana, Sri Lanka 12400</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ENHANCED FOOTER */}
      <footer className="site-footer liquid-glass">
        <div className="container">
          <div className="footer-grid-layout">
            {/* Brand Section */}
            <div className="footer-brand">
              <img 
                src={`${import.meta.env.BASE_URL}titlebar.png`} 
                alt="ID Logo" 
                onError={(e) => { e.target.src = 'https://placehold.co/80x80/1C1C1E/FFFFFF?text=ID'; }} 
              />
              <h3>Isara Dilnuka</h3>
              <p>Creative Full Stack Developer & Graphics Designer. Transforming your digital vision into reality with code and art.</p>
              <div className="footer-socials">
                <a href="https://wa.me/94716155666" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                <a href="mailto:in.fo.dilnuka@outlook.com" className="social-icon" title="Email"><i className="fas fa-envelope"></i></a>
                <a href="https://www.facebook.com/Dilnuka.13x" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/dilnuka.13x/" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/channel/UC6dd601bYXS5lMI6HiJjy7Q" target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="https://www.tiktok.com/@dilnuka.13x" target="_blank" rel="noopener noreferrer" className="social-icon" title="TikTok"><i className="fab fa-tiktok"></i></a>
                <a href="https://x.com/Dilnuka13x" target="_blank" rel="noopener noreferrer" className="social-icon" title="X (Twitter)"><i className="fab fa-twitter"></i></a>
                <a href="https://www.threads.com/@dilnuka.13x" target="_blank" rel="noopener noreferrer" className="social-icon" title="Threads"><i className="fas fa-at"></i></a>
                <a href="https://www.linkedin.com/in/isara-dilnuka-ab8161352/" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://dilnuka13.github.io/my/" target="_blank" rel="noopener noreferrer" className="social-icon" title="Website"><i class="fas fa-globe"></i></a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="footer-links-sec">
              <h4 className="footer-heading">Explore</h4>
              <ul className="footer-links-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Me</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/apps">Applications</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="footer-contact-info">
              <h4 className="footer-heading">Contact Details</h4>
              <p><i className="fas fa-map-marker-alt"></i> <span>Horana, Sri Lanka 12400</span></p>
              <p><i className="fab fa-whatsapp"></i> <span>WhatsApp</span></p>
              <p><i className="fas fa-envelope"></i> <span>in.fo.dilnuka@outlook.com</span></p>
            </div>
          </div>
          
          <div className="footer-bottom-bar">
            <p>&copy; <span>{currentYear}</span> Isara Dilnuka. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* NOTIFICATION MODAL */}
      <div className={`modal ${showSuccessModal ? 'active' : ''}`} id="notificationModal">
        <div className="modal-content liquid-glass" style={{ borderRadius: '32px' }}>
          <i className="fas fa-check-circle" style={{ fontSize: '4rem', color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
          <h2>Success</h2>
          <p id="successMessage" style={{ color: 'var(--text-muted)', margin: '0.5rem 0 2rem' }}>Message sent Successfully.</p>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowSuccessModal(false)}>Done</button>
        </div>
      </div>
    </>
  );
}
