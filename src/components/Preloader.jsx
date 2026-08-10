import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hide, setHide] = useState(false);
  const [displayNone, setDisplayNone] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setHide(true);
      document.body.classList.add('loaded');
    }, 1500);

    const timer2 = setTimeout(() => {
      setDisplayNone(true);
    }, 2000); // 1500ms + 500ms transition

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (displayNone) return null;

  return (
    <div id="preloader" className={hide ? 'hide' : ''}>
      <div className="loader-content">
        <img 
          src={`${import.meta.env.BASE_URL}titlebar.png`} 
          alt="Logo" 
          className="loader-logo" 
          onError={(e) => { e.target.src = 'https://placehold.co/100x100/1C1C1E/FFFFFF?text=ID'; }} 
        />
        <p className="welcome-text">Welcome to</p>
        <h1 className="brand-text">Isara Dilnuka's Website</h1>
      </div>
    </div>
  );
}
