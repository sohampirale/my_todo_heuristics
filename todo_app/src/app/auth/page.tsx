'use client';

import { useState } from 'react';
import { SeededButton, SeededInput } from '@/components/seeded';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signin' && email && password) {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'signin', email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error || 'Sign in failed');
        } else {
          localStorage.setItem('user', JSON.stringify(data.user));
          router.push('/tasks');
        }
      } else if (mode === 'signup' && email && password && name) {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'signup', name, email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error || 'Signup failed');
        } else {
          localStorage.setItem('user', JSON.stringify(data.user));
          router.push('/tasks');
        }
      } else if (mode === 'forgot' && email) {
        // Password reset - just show success message for now
        alert('Password reset link sent to: ' + email);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-2" data-testid="auth-title">
          {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
        </h1>
        <p className="text-gray-600">
          {mode === 'signin' ? 'Sign in to your account' : mode === 'signup' ? 'Get started with TodoApp' : 'Recover your account'}
        </p>
      </div>

      {/* Auth Card */}
      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <SeededInput
              seedPage="auth"
              id="signup-name"
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={mode === 'signup'}
              data-testid="auth-name-input"
            />
          )}

          <SeededInput
            seedPage="auth"
            id="auth-email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
            data-testid="auth-email-input"
          />

          {mode !== 'forgot' && (
            <SeededInput
              seedPage="auth"
              id="auth-password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={mode === 'signin' || mode === 'signup'}
              data-testid="auth-password-input"
            />
          )}

          <SeededButton
            seedPage="auth"
            type="submit"
            className="w-full"
            data-testid="auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (mode === 'signin' ? '🔐 Sign In' : mode === 'signup' ? '✨ Create Account' : '📧 Send Reset Link')}
          </SeededButton>
        </form>

        <div className="mt-6 space-y-3">
          {mode === 'signin' && (
            <>
              <button
                onClick={() => setMode('signup')}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                data-testid="auth-switch-signup"
              >
                Don&apos;t have an account? <span className="font-semibold">Sign Up</span>
              </button>
              <button
                onClick={() => {
                  setMode('forgot' as unknown as 'signin' | 'signup');
                }}
                className="block text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                data-testid="auth-forgot-password"
              >
                Forgot Password?
              </button>
            </>
          )}

          {mode === 'signup' && (
            <button
              onClick={() => setMode('signin')}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
              data-testid="auth-switch-signin"
            >
              Already have an account? <span className="font-semibold">Sign In</span>
            </button>
          )}

          {mode === 'forgot' && (
            <button
              onClick={() => setMode('signin')}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
              data-testid="auth-back-to-signin"
            >
              ← Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
