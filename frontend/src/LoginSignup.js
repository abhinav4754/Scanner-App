
import React, { useState } from 'react';
import { useAuth } from './auth/AuthProvider';

export default function LoginSignup({ onClose }) {
  const { login, signup, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onClose();
    } catch (err) {
      setError(err?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setError(err?.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#0b111d', padding: '40px', borderRadius: '16px',
        boxShadow: '0 0 15px #1c2b3a', color: '#66d9ef', position: 'relative',
        maxWidth: '420px', width: '100%'
      }}>
        <button style={{
          position: 'absolute', top: '10px', right: '15px',
          background: 'transparent', border: 'none', fontSize: '24px',
          color: '#66d9ef', cursor: 'pointer'
        }} onClick={onClose}>×</button>
        <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>
          {mode === 'login' ? 'Login' : 'Create Account'}
        </h2>
        <p style={{ textAlign: 'center', color: '#8aa2c0', marginBottom: '18px' }}>
          {mode === 'login' ? 'Access your scanner dashboard.' : 'Sign up to run scans and download reports.'}
        </p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              border: mode === 'login' ? '1px solid #66d9ef' : '1px solid #1e2d3d',
              backgroundColor: mode === 'login' ? '#112135' : 'transparent',
              color: '#d0e7ff',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              border: mode === 'signup' ? '1px solid #66d9ef' : '1px solid #1e2d3d',
              backgroundColor: mode === 'signup' ? '#112135' : 'transparent',
              color: '#d0e7ff',
              cursor: 'pointer'
            }}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p style={{ color: '#ff7676', marginBottom: '10px' }}>{error}</p>
          )}
          <button type="submit" style={{
            width: '100%', padding: '12px', marginTop: '8px',
            fontWeight: 'bold', border: '1px solid #66d9ef',
            borderRadius: '10px', backgroundColor: 'transparent',
            color: '#66d9ef', cursor: 'pointer', opacity: loading ? 0.7 : 1
          }} disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>
        <div style={{ marginTop: '16px' }}>
          <button
            type="button"
            onClick={handleGoogle}
            style={{
              width: '100%', padding: '12px',
              fontWeight: 'bold', border: '1px solid #66d9ef',
              borderRadius: '10px', backgroundColor: '#112135',
              color: '#d0e7ff', cursor: 'pointer', opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 15px', marginBottom: '16px',
  border: '1px solid #1e2d3d', borderRadius: '8px',
  backgroundColor: '#0d1424', color: '#d0e7ff'
};
