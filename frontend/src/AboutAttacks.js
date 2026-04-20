
import React from 'react';

export default function AboutAttacks() {
  return (
    <section className="about-attacks" id="about-attacks">
      <h2 className="section-title">ABOUT + ATTACKS</h2>
      <p className="about-text">
        This tool scans your web application for vulnerabilities and helps identify potential security risks.
      </p>
      <div className="attacks-grid">
        <div className="attack-box">
          <img src="https://cdn-icons-png.flaticon.com/512/10961/10961461.png" alt="SQL Injection" />
          <div>
            <h3>SQL Injection</h3>
            <p>Attackers insert SQL queries via input fields to access or manipulate databases.</p>
          </div>
        </div>
        <div className="attack-box">
          <img src="https://cdn-icons-png.flaticon.com/512/14702/14702378.png" alt="XSS" />
          <div>
            <h3>Cross-Site Scripting (XSS)</h3>
            <p>Injecting malicious scripts into pages viewed by other users.</p>
          </div>
        </div>
        <div className="attack-box">
          <img src="https://cdn-icons-png.flaticon.com/512/9295/9295988.png" alt="CSRF" />
          <div>
            <h3>Cross-Site Request Forgery (CSRF)</h3>
            <p>Tricks the user into submitting unwanted actions.</p>
          </div>
        </div>
        <div className="attack-box">
          <img src="https://cdn-icons-png.flaticon.com/512/3145/3145765.png" alt="Directory Traversal" />
          <div>
            <h3>Directory Traversal</h3>
            <p>Accessing restricted directories and executing unauthorized commands.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
