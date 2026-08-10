import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      document.body.classList.add('loaded');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={hidden ? 'hide' : ''}>
      <div className="loader-content">
        <img src="./logo.png" alt="DE Downloader" className="loader-logo" />
        <p className="welcome-text">Download from anywhere</p>
        <h1 className="brand-text">DE Downloader</h1>
        <div className="loader-spinner">
          <div className="loader-spinner-bar"></div>
        </div>
      </div>
    </div>
  );
}
