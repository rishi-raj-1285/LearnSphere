import React, { useState } from 'react';
import { authApi, setStoredToken } from '../api/client';

export default function Auth({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (mode === 'register') {
        result = await authApi.register({ name, email, password });
      } else {
        result = await authApi.login({ email, password });
      }

      setStoredToken(result.token);
      onAuthenticated(result.user);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '28px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark-blue)' }}>LearnSphere</h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
            {mode === 'login' ? 'Sign in to your student account' : 'Create your student account'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            type="button"
            className={`btn btn-sm ${mode === 'login' ? 'btn-primary' : 'btn-outline'}`}
            style={{ flex: 1 }}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`btn btn-sm ${mode === 'register' ? 'btn-primary' : 'btn-outline'}`}
            style={{ flex: 1 }}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-name">Full name</label>
              <input
                id="auth-name"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            <small style={{ color: 'var(--color-text-muted)' }}>At least 8 characters</small>
          </div>

          {error && (
            <div role="alert" style={{ color: '#B91C1C', marginBottom: '12px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
          Logout clears your token in the browser. The server does not revoke issued JWTs until they expire.
        </p>
      </div>
    </div>
  );
}
