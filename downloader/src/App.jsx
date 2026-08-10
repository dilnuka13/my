import { useState, useEffect, useRef } from 'react';
import Preloader from './components/Preloader';
import BackgroundBlobs from './components/BackgroundBlobs';
import Header from './components/Header';
import DownloaderHero from './components/DownloaderHero';
import HowItWorks from './components/HowItWorks';
import SupportedSites from './components/SupportedSites';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Toast component
function Toast({ toast }) {
  return (
    <div className={`toast ${toast.type} ${toast.visible ? 'show' : ''}`}>
      <i className={toast.type === 'success' ? 'fas fa-circle-check' : 'fas fa-circle-xmark'}></i>
      {toast.message}
    </div>
  );
}

// Back to top button
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`back-to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  const toastTimer = useRef(null);

  // Smooth scroll to section
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const sections = ['hero', 'how', 'platforms', 'faq'];
    const onScroll = () => {
      const scrollY = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type, visible: true });
    toastTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <>
      <Preloader />
      <BackgroundBlobs />
      <Header activeSection={activeSection} onNavClick={handleNavClick} />

      <main>
        <DownloaderHero onShowToast={showToast} />
        <HowItWorks />
        <SupportedSites />
        <FAQ />
      </main>

      <Footer onNavClick={handleNavClick} />
      <BackToTop />
      <Toast toast={toast} />
    </>
  );
}
