import React from 'react';

export default function AboutPage() {
  return (
    <section id="about" className="about-page">
      <div className="about-card about-split">
        <div className="about-main">
          <p className="section-label">About</p>
          <h2>Security-first, built for delivery</h2>
          <p className="about-lead">
            An OWASP-aligned scanner with balanced depth, authenticated access, and a calm UX—so security checks stay in sync with shipping velocity.
          </p>
          <ul className="about-list">
            <li>
              <span className="about-bullet-title">OWASP-driven scanning</span>
              <span className="about-bullet-copy">Quick and Deep modes tuned for SQLi, XSS, CSRF, traversal, and misconfigurations.</span>
            </li>
            <li>
              <span className="about-bullet-title">Authenticated & auditable</span>
              <span className="about-bullet-copy">Firebase login (email/Google) gates scans to known users while keeping the flow simple.</span>
            </li>
            <li>
              <span className="about-bullet-title">Release-friendly UX</span>
              <span className="about-bullet-copy">Clear success/error states and one-click reports keep teams moving without extra tooling.</span>
            </li>
          </ul>
        </div>

        <div className="about-panels">
          <div className="about-panel">
            <h4>Coverage</h4>
            <p>Targets critical web risks (SQLi, XSS, CSRF, traversal, misconfigurations) with ZAP at the core.</p>
          </div>
          <div className="about-panel">
            <h4>Scan modes</h4>
            <p>Quick for fast feedback; Deep for broader crawls with isolated workspaces to avoid cross-run conflicts.</p>
          </div>
          <div className="about-panel">
            <h4>Reporting</h4>
            <p>Generates clean PDFs and exposes raw findings so teams can triage immediately and export for auditors.</p>
          </div>
          <div className="about-panel">
            <h4>Operational guardrails</h4>
            <p>Per-scan isolation, gated access, and mail-based support keep usage controlled and traceable.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
