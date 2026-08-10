export default function About() {
  return (
    <section id="about" className="page-section section-padding active">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h2>About Me</h2>
          <p style={{ color: 'var(--text-muted)' }}>Passionate about blending creativity with technology.</p>
        </div>
        <div className="grid grid-2">
          <div>
            <div className="liquid-glass" style={{ borderRadius: '32px', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '1.5rem 1.5rem 0 1.5rem', minHeight: '350px' }}>
              <img 
                src={`${import.meta.env.BASE_URL}my-bk-remove.png`} 
                className="about-image-float profile-mask"
                alt="About Isara" 
                loading="lazy" 
                onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}isara-profile.jpg`; }} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
              />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Who is Isara?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
              I’m <strong>Isara Dilnuka</strong>, a Full Stack Developer and Graphics Designer based in Horana, Sri Lanka. I’m passionate about building creative, useful, and modern digital solutions.
              <br /><br />
              My journey started with a curiosity about how websites and applications work. Over time, that curiosity grew into hands-on experience in web development, UI design, and digital content creation.
              <br /><br />
              I work with technologies such as <strong>HTML, CSS, JavaScript, PHP, SQL, and Python</strong> to build websites, systems, and creative digital projects that help individuals and businesses improve their online presence.
            </p>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="card liquid-glass">
                <div className="sf-icon-wrapper green"><i className="fas fa-code"></i></div>
                <h4>Developer</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Frontend & Backend</p>
              </div>
              <div className="card liquid-glass">
                <div className="sf-icon-wrapper purple"><i className="fas fa-paint-brush"></i></div>
                <h4>Designer</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>UI/UX & Branding</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
