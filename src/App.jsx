import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Preloader from './components/Preloader';
import BackgroundBlobs from './components/BackgroundBlobs';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Apps from './components/Apps';
import Contact from './components/Contact';
import GoogleFormModal from './components/GoogleFormModal';
import BackToTop from './components/BackToTop';

function AppContent() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <>
      {/* iOS STYLE PRELOADER */}
      <Preloader />

      {/* BACKGROUND GRAPHICS */}
      <BackgroundBlobs />

      {/* NAVIGATION HEADER */}
      <Header />

      {/* MAIN CONTENT AREA */}
      <main id="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Hero 
                onStartProjectClick={() => setIsFormModalOpen(true)} 
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route 
            path="/services" 
            element={
              <Services 
                onStartProjectClick={() => setIsFormModalOpen(true)} 
              />
            } 
          />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/apps" element={<Apps />} />
          <Route 
            path="/contact" 
            element={
              <Contact 
                onStartProjectClick={() => setIsFormModalOpen(true)} 
              />
            } 
          />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* EMBEDDED GOOGLE FORM MODAL */}
      <GoogleFormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} />

      {/* BACK TO TOP BUTTON */}
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

