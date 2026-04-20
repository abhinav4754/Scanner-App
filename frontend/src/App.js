
// import React, { useState } from 'react';
// // import './style.css';
// import LoginSignup from './LoginSignup';
// import HowItWorks from './HowItWorks';
// import AboutAttacks from './AboutAttacks';
// import ScanSection from './ScanSection';
// import Contact from './Contact';
// import Footer from './Footer';

// export default function App() {
//   const [showLogin, setShowLogin] = useState(false);

//   return (
//     <div>
//       <button style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }} onClick={() => setShowLogin(true)}>
//         Login / Signup
//       </button>
//       {showLogin && <LoginSignup onClose={() => setShowLogin(false)} />}

//       <section className="landing">
//         <div className="content">
//           <h5>WEB APPLICATION<br />SECURITY SCANNER</h5>
//           <h1>YOUR WEBSITE<br />DESERVES<br />THE BEST<br />SECURITY</h1>
//           <p>Detect vulnerabilities like <span>SOL Injection</span>, <span>XSS</span>, and more — in just a few seconds.</p>
//           <button onClick={() => alert("Starting security scan...")}>START SCANNING</button>
//         </div>
//         <div className="shield">
//           <img src={`${process.env.PUBLIC_URL}/shield2.png`} alt="Security Shield" />
//         </div>
//       </section>

//       <section className="features" id="features">
//         <h2 className="section-title">FEATURES</h2>
//         <div className="features-grid">
//           <div className="feature-box">
//             <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Fast Scanning" className="feature-icon" />
//             <h3>Fast &<br />Accurate<br />Scanning</h3>
//           </div>
//           <div className="feature-box">
//             <img src="https://cdn-icons-png.flaticon.com/512/1049/1049169.png" alt="Major Vulnerabilities" className="feature-icon green" />
//             <h3 className="green-text">Covers<br />Major<br />Vulnerabilities</h3>
//           </div>
//           <div className="feature-box">
//             <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Download Reports" className="feature-icon" />
//             <h3>Downloadable<br />Reports</h3>
//           </div>
//         </div>
//       </section>

//       <HowItWorks />
//       <AboutAttacks />
//       <ScanSection />
//       <Contact />
//       <Footer />
//     </div>
//   );
// }
// src/App.js
import React, { useState } from 'react';
import './App.css';
import LoginSignup from './LoginSignup';
import HowItWorks from './HowItWorks';
import AboutAttacks from './AboutAttacks';
import ScanSection from './ScanSection';
import Contact from './Contact';
import Footer from './Footer';
import ScanForm from './components/ScanForm';
import LetterGlitch from './components/LetterGlitch';
import AboutPage from './AboutPage';
import { useAuth } from './auth/AuthProvider';
import AuthGate from './components/AuthGate';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showScanForm, setShowScanForm] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <div className="glitch-page-bg" aria-hidden="true">
        <LetterGlitch
          glitchColors={["#10221a", "#1dd78c", "#3b9bff"]}
          glitchSpeed={60}
          centerVignette
          outerVignette
        />
      </div>

      <div className="page-content">
        <button
          style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}
          onClick={user ? logout : () => setShowLogin(true)}
        >
          {user ? `Logout (${user.email})` : 'Login / Signup'}
        </button>
        {showLogin && <LoginSignup onClose={() => setShowLogin(false)} />}

        <section className="landing" id="home">
          <div className="content">
              <h5 className="brand-badge">WEB APPLICATION SECURITY SCANNER</h5>
            <h1>YOUR WEBSITE<br />DESERVES<br />THE BEST<br />SECURITY</h1>
            <p>
              Detect vulnerabilities like <span>SQL Injection</span>, <span>XSS</span>,
              and more — in just a few seconds.
            </p>
            {/* <button onClick={() => setShowScanForm(true)}>START SCANNING</button> */}
          </div>
          <div className="shield">
            <img src={`${process.env.PUBLIC_URL}/shield2.png`} alt="Security Shield" />
          </div>
        </section>

        {showScanForm && (
          <section className="scan-form-section" id="scan-form">
            <h2 style={{ textAlign: 'center', marginTop: '30px' }}>🔍 Start Your Scan</h2>
            <ScanForm />
          </section>
        )}

        <section className="features" id="features">
          <h2 className="section-title">FEATURES</h2>
          <div className="features-grid">
            <div className="feature-box">
              <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Fast Scanning" className="feature-icon" />
              <h3>Fast, Targeted Scans</h3>
              <p>Quick or deep OWASP ZAP runs with tuned spidering for reliable, actionable results.</p>
            </div>
            <div className="feature-box">
              <img src="https://cdn-icons-png.flaticon.com/512/1049/1049169.png" alt="Major Vulnerabilities" className="feature-icon green" />
              <h3 className="green-text">Critical Coverage</h3>
              <p>Detects high-impact risks like SQLi, XSS, and common web misconfigurations.</p>
            </div>
            <div className="feature-box">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Download Reports" className="feature-icon" />
              <h3>Downloadable Reports</h3>
              <p>Export clean PDF reports for teams and auditors, with findings and remediation notes.</p>
            </div>
          </div>
        </section>

        <AboutPage />
        <HowItWorks />
        <AuthGate
          fallback={
            <section className="scan-section" id="scan">
              <div className="scan-box" style={{ textAlign: 'center' }}>
                <h2>Login to Start Scanning</h2>
                <p style={{ color: '#8aa2c0', marginTop: '8px' }}>
                  Create an account or log in to run vulnerability scans and download reports.
                </p>
                <button id="start-scan" onClick={() => setShowLogin(true)}>
                  Login / Signup
                </button>
              </div>
            </section>
          }
        >
          <ScanSection id="scan" />
        </AuthGate>
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
