type HomeProps = {
  onStart: () => void;
  onCategory: () => void;
};

function Home({ onStart, onCategory }: HomeProps) {
  return (
    <main className="home">

      <header className="top-nav">

        <div className="brand">
          <div className="brand-icon">
            &gt;_
          </div>

          <div>
            <strong>LINUX</strong>
            <span>QUEST</span>
          </div>
        </div>

        <nav>
          <button onClick={onCategory}>
            Challenges
          </button>

          <button>
            Learn
          </button>

          <button>
            About
          </button>
        </nav>

        <button className="nav-help">
          ?
        </button>

      </header>

      <section className="hero-section">

        <div className="hero-content">

          <div className="eyebrow">
            <span className="status-dot" />
            AI-POWERED LINUX LEARNING
          </div>

          <h1>
            Master Linux.
            <br />

            <span>One puzzle at a time.</span>
          </h1>

          <p>
            Learn Linux commands through interactive,
            AI-generated challenges designed for developers.
          </p>

          <div className="hero-actions">

            <button
              className="gradient-button"
              onClick={onStart}
            >
              Start a Challenge
              <span>→</span>
            </button>

            <button
              className="soft-button"
              onClick={onCategory}
            >
              Explore Categories
            </button>

          </div>

          <div className="hero-stats">

            <div>
              <strong>06</strong>
              <span>Categories</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>AI Puzzles</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Interactive</span>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <div className="floating-card card-top">
            <span>🔥</span>
            <div>
              <small>Learning Streak</small>
              <strong>3 days</strong>
            </div>
          </div>

          <div className="terminal-preview">

            <div className="preview-header">

              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>

              <span>linux@quest:~</span>

            </div>

            <div className="preview-body">

              <p>
                <span className="green">$</span> whoami
              </p>

              <p className="muted">
                developer
              </p>

              <p>
                <span className="green">$</span> find . -name secret.txt
              </p>

              <p className="purple">
                ./documents/secret.txt
              </p>

              <p>
                <span className="green">$</span>
                <span className="cursor">▋</span>
              </p>

            </div>

          </div>

          <div className="floating-card card-bottom">
            <span>✨</span>

            <div>
              <small>AI Challenge</small>
              <strong>Ready!</strong>
            </div>
          </div>

        </div>

      </section>

      <section className="home-categories">

        <div className="section-heading">

          <div>
            <small>CHOOSE YOUR PATH</small>

            <h2>
              Explore Linux
            </h2>
          </div>

          <button onClick={onCategory}>
            View all →
          </button>

        </div>

        <div className="mini-category-grid">

          <button onClick={() => onCategory()}>
            <span>📁</span>
            <strong>Files</strong>
            <small>ls · find · cat</small>
          </button>

          <button onClick={() => onCategory()}>
            <span>🔐</span>
            <strong>Permissions</strong>
            <small>chmod · chown</small>
          </button>

          <button onClick={() => onCategory()}>
            <span>⚙️</span>
            <strong>Processes</strong>
            <small>ps · top · kill</small>
          </button>

          <button onClick={() => onCategory()}>
            <span>🌐</span>
            <strong>Networking</strong>
            <small>ping · ip · curl</small>
          </button>

        </div>

      </section>

    </main>
  );
}

export default Home;
