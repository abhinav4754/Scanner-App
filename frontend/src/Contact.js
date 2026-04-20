
import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await axios.post('http://localhost:5000/api/contact', { name, email, message });
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setError(err?.response?.data?.error || 'Failed to send message.');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">Have a question or need assistance? Get in touch with us using the form below.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows="5"
          placeholder="Type your message here..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p style={{ color: '#1dd78c', marginTop: '10px' }}>Thanks! Your message was sent.</p>
        )}
        {status === 'error' && (
          <p style={{ color: '#ff7676', marginTop: '10px' }}>{error}</p>
        )}
      </form>
    </section>
  );
}
