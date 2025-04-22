import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Sentinal AI</title>
        <meta name="description" content="Protecting Digital Integrity with Advanced AI" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <div className="logo">
          <h1>Sentinal AI</h1>
          <h2>Protecting Digital Integrity with Advanced AI</h2>
        </div>

        <p className="description">
          Sentinal AI is a cutting-edge platform that leverages artificial intelligence to detect and prevent digital threats,
          ensuring the integrity of your online presence. Our system combines advanced machine learning algorithms,
          blockchain verification, and decentralized governance to create a comprehensive solution for content moderation
          and digital security.
        </p>

        <div className="features">
          <div className="feature">
            <h3>Content Moderation</h3>
            <p>Advanced AI algorithms to detect and filter inappropriate content across your digital platforms.</p>
          </div>

          <div className="feature">
            <h3>Threat Detection</h3>
            <p>Real-time monitoring and detection of potential security threats and vulnerabilities.</p>
          </div>

          <div className="feature">
            <h3>Analytics Dashboard</h3>
            <p>Comprehensive analytics and reporting to track and visualize your digital security status.</p>
          </div>
        </div>

        <div className="cta">
          <a href="https://github.com/Sagexd08/Sentinal-AI" className="button">View on GitHub</a>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Sentinal AI. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f5f5f5;
          font-family: 'Montserrat', sans-serif;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 1200px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #777;
        }

        .logo {
          margin-bottom: 2rem;
          text-align: center;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #4a6cf7;
        }

        h2 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          color: #555;
        }

        .description {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          text-align: center;
          max-width: 800px;
        }

        .features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin: 3rem 0;
        }

        .feature {
          background-color: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 300px;
          text-align: center;
        }

        .feature h3 {
          color: #4a6cf7;
          margin-bottom: 1rem;
        }

        .cta {
          margin-top: 3rem;
        }

        .button {
          display: inline-block;
          background-color: #4a6cf7;
          color: white;
          padding: 1rem 2rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
          transition: background-color 0.3s;
        }

        .button:hover {
          background-color: #3a5ce5;
        }
      `}</style>
    </div>
  );
}
