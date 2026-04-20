'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@trpglobal.com' && password === 'admin123') {
      localStorage.setItem('trp_admin', 'true');
      router.push('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card rv go">
        <div className="eyebrow">Secure Access</div>
        <h1 className="heading">Admin <strong>Login</strong></h1>
        <p className="body-text">Enter your credentials to access the TRP GLOBAL management console.</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@trpglobal.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="btn-primary login-btn">Sign In <span className="arrow">→</span></button>
        </form>
        <Link href="/" className="btn-text login-back">Back to Website</Link>
      </div>
      <div className="login-bg-overlay"></div>
    </div>
  );
}
