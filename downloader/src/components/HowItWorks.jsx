const STEPS = [
  {
    icon: '📋',
    title: 'Copy the Link',
    desc: 'Go to YouTube, Facebook, Instagram, or TikTok. Copy the video or post URL from your browser or the app\'s share button.',
    step: 1,
  },
  {
    icon: '🔍',
    title: 'Paste & Detect',
    desc: 'Paste the URL into the download box above. DE Downloader automatically detects the platform and fetches available formats.',
    step: 2,
  },
  {
    icon: '⬇️',
    title: 'Download',
    desc: 'Choose your preferred quality (1080p, 720p, MP3, etc.) and hit download. Your file will be saved instantly.',
    step: 3,
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="how-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-eyebrow">Simple Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Download any video in just 3 easy steps. No sign-up, no hassle.</p>
        </div>

        <div className="steps-grid">
          {STEPS.map((step) => (
            <div key={step.step} className="step-card liquid-glass">
              <div className="step-number-wrapper">
                <span style={{ fontSize: '1.8rem' }}>{step.icon}</span>
                <span className="step-number">{step.step}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
