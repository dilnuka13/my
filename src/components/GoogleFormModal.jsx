import { useEffect } from 'react';

export default function GoogleFormModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div 
      className={`modal ${isOpen ? 'active' : ''}`} 
      id="googleFormModal" 
      onClick={(e) => { if (e.target.id === 'googleFormModal') onClose(); }}
    >
      <div className="modal-content liquid-glass">
        <div className="modal-drag-handle"></div>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Start Your Project</h3>
          <button className="close-modal" onClick={onClose}><i className="fas fa-times"></i></button>
        </div>
        <div className="modal-body">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLScQkB_ysu4QDdlmae7QsqWNI2K2FQTyIc-witwFmE_kV04PBA/viewform?embedded=true"
            title="Google Project Form"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
}
