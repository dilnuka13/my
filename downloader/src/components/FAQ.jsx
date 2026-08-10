import { useState } from 'react';

const FAQS = [
  {
    q: 'Is DE Downloader free to use?',
    a: 'Yes! DE Downloader is completely free. No registration, no subscription, no hidden fees. Just paste your URL and download.',
  },
  {
    q: 'What video qualities are supported?',
    a: 'We support multiple qualities including 4K, 1080p, 720p, 480p, and 360p for video. You can also extract MP3 audio from YouTube videos.',
  },
  {
    q: 'Can I download TikTok videos without watermark?',
    a: 'Yes! DE Downloader can download TikTok videos without the watermark in HD quality.',
  },
  {
    q: 'Is it safe to use this downloader?',
    a: 'Absolutely. We do not store your URLs or any personal data. All processing is done securely and your privacy is fully protected.',
  },
  {
    q: 'Why is my download not working?',
    a: 'Make sure your URL is correct and the content is publicly accessible. Private videos or age-restricted content may not be downloadable. Try refreshing and pasting the URL again.',
  },
  {
    q: 'How do I download Instagram Reels?',
    a: 'Open the Instagram Reel, tap the three-dot menu (⋯), and select "Copy Link". Then paste it into DE Downloader and click Download.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-eyebrow">Help & Support</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about DE Downloader.</p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, idx) => (
            <div key={idx} className={`faq-item liquid-glass ${openIdx === idx ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => toggle(idx)}>
                <span>{faq.q}</span>
                <i className="fas fa-chevron-down faq-chevron"></i>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
