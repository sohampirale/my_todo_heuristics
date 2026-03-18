'use client';

import { useState } from 'react';
import { SeededButton, SeededInput } from '@/components/seeded';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth - in real app would call API
    if (mode === 'signin' && email && password) {
      // Simulate error for demo
      setError('Invalid credentials');
    } else if (mode === 'signup' && email && password && name) {
      console.log('Signup:', { name, email, password });
    } else if (mode === 'forgot' && email) {
      console.log('Password reset for:', email);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6" data-testid="auth-title">
          {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
        </h1>

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
          >
            {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </SeededButton>
        </form>

        <div className="mt-6 space-y-2">
          {mode === 'signin' && (
            <>
              <button
                onClick={() => setMode('signup')}
                className="text-sm text-blue-600 hover:underline"
                data-testid="auth-switch-signup"
              >
                Don&apos;t have an account? Sign Up
              </button>
              <button
                onClick={() => {
                  setMode('forgot' as unknown as 'signin' | 'signup');
                }}
                className="block text-sm text-blue-600 hover:underline"
                data-testid="auth-forgot-password"
              >
                Forgot Password?
              </button>
            </>
          )}

          {mode === 'signup' && (
            <button
              onClick={() => setMode('signin')}
              className="text-sm text-blue-600 hover:underline"
              data-testid="auth-switch-signin"
            >
              Already have an account? Sign In
            </button>
          )}

          {mode === 'forgot' && (
            <button
              onClick={() => setMode('signin')}
              className="text-sm text-blue-600 hover:underline"
              data-testid="auth-back-to-signin"
            >
              Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
