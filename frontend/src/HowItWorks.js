
import React from 'react';

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <h2 className="section-title">HOW IT WORKS</h2>
      <div className="steps-grid">
        <div className="step-box">
          <img src="https://cdn-icons-png.flaticon.com/512/6994/6994770.png" alt="Enter URL" />
          <p>Enter your URL</p>
        </div>
        <div className="step-box">
          <img src="https://cdn-icons-png.flaticon.com/512/9710/9710270.png" alt="Choose Scan Type" />
          <p>Choose scan type</p>
        </div>
        <div className="step-box">
          <img src="https://cdn-icons-png.flaticon.com/512/17130/17130851.png" alt="View Results" />
          <p>View results</p>
        </div>
        <div className="step-box">
          <img src="https://cdn-icons-png.flaticon.com/512/724/724933.png" alt="Download Report" />
          <p>Download report</p>
        </div>
      </div>
    </section>
  );
}
