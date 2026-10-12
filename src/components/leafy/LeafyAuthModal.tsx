import React, { useState } from 'react';
import { AuthService } from '../../services/auth';
import type { AuthMode } from '../../types/auth';

interface LeafyAuthModalProps {
  initialMode?: AuthMode;
  onClose: () => void;
  onSuccess: () => void;
  onOpenConfig?: () => void;
}

export const LeafyAuthModal: React.FC<LeafyAuthModalProps> = ({
  initialMode = 'login',
  onClose,
  onSuccess,
  onOpenConfig
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isConfigured = AuthService.isConfigured();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!isConfigured) {
      setErrorMsg('Supabase project is not linked yet. Please click "Link Supabase Project" below.');
      return;
    }

    if (mode === 'register') {
      if (!displayName.trim()) {
        setErrorMsg('Please enter your name.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }

      setLoading(true);
      const { user, error } = await AuthService.signUp(email, password, displayName);
      setLoading(false);

      if (error) {
        setErrorMsg(error);
      } else {
        if (user && user.identities && user.identities.length === 0) {
          setErrorMsg('An account with this email already exists.');
        } else {
          setSuccessMsg('🌱 Account created! Checking session...');
          setTimeout(() => {
            onSuccess();
            onClose();
          }, 1200);
        }
      }
    } else if (mode === 'login') {
      setLoading(true);
      const { user, error } = await AuthService.signIn(email, password);
      setLoading(false);

      if (error) {
        setErrorMsg(error);
      } else if (user) {
        setSuccessMsg('🌱 Welcome back! Loading your garden...');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 800);
      }
    } else if (mode === 'forgot-password') {
      if (!email.trim()) {
        setErrorMsg('Please enter your email address.');
        return;
      }
      setLoading(true);
      const { error } = await AuthService.resetPassword(email);
      setLoading(false);

      if (error) {
        setErrorMsg(error);
      } else {
        setSuccessMsg('Reset link sent to your email! Please check your inbox.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    if (!isConfigured) {
      setErrorMsg('Supabase project is not linked yet. Please connect your credentials first.');
      return;
    }
    setLoading(true);
    const { error } = await AuthService.signInWithGoogle();
    setLoading(false);
    if (error) {
      setErrorMsg(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{
          background: 'var(--cream)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '440px',
          width: '92%',
          padding: '32px 28px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-card)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Brand Icon Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              margin: '0 auto 14px auto',
              background: 'var(--matcha-soft)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--leaf-green)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
            </svg>
          </div>

          {/* Dynamic Headings matching Specification */}
          {mode === 'login' && (
            <>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Welcome back 🌱
              </h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                Your garden is waiting for you.
              </p>
            </>
          )}

          {mode === 'register' && (
            <>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Start your garden
              </h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                A little care goes a long way.
              </p>
            </>
          )}

          {mode === 'forgot-password' && (
            <>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: 800, color: 'var(--text-main)' }}>
                Reset password
              </h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                Enter your email address to receive a secure reset link.
              </p>
            </>
          )}
        </div>

        {/* Not Configured Alert Banner */}
        {!isConfigured && (
          <div
            style={{
              background: 'var(--yellow-soft)',
              border: '1px solid #fde047',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              fontSize: '12px',
              color: '#854d0e',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px'
            }}
          >
            <span>⚠️ Supabase project not linked yet.</span>
            {onOpenConfig && (
              <button
                type="button"
                onClick={onOpenConfig}
                style={{
                  background: '#854d0e',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Link Project
              </button>
            )}
          </div>
        )}

        {/* Error / Success Feedback */}
        {errorMsg && (
          <div
            style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              color: '#b91c1c',
              fontSize: '13px',
              marginBottom: '16px'
            }}
          >
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div
            style={{
              background: 'var(--sage-light)',
              border: '1px solid var(--matcha)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              color: 'var(--leaf-green-dark)',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '16px'
            }}
          >
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuthSubmit}>
          {/* Display Name (Register only) */}
          {mode === 'register' && (
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
                YOUR NAME
              </label>
              <input
                type="text"
                placeholder="e.g. Alex"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  fontFamily: 'var(--font-leafy)',
                  fontSize: '14px',
                  background: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="alex@garden.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                fontFamily: 'var(--font-leafy)',
                fontSize: '14px',
                background: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          {/* Password */}
          {mode !== 'forgot-password' && (
            <div style={{ marginBottom: '14px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
                  PASSWORD
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot-password')}
                    style={{ background: 'none', border: 'none', color: 'var(--leaf-green)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-card)',
                    fontFamily: 'var(--font-leafy)',
                    fontSize: '14px',
                    background: '#ffffff',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    fontSize: '14px'
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Password (Register only) */}
          {mode === 'register' && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
                CONFIRM PASSWORD
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  fontFamily: 'var(--font-leafy)',
                  fontSize: '14px',
                  background: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            className="leafy-btn-primary full-width"
            disabled={loading}
            style={{ marginBottom: '14px' }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
          </button>

          {/* Continue with Google */}
          {mode !== 'forgot-password' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', margin: '14px 0', gap: '10px' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-card)' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-card)' }} />
              </div>

              <button
                type="button"
                className="leafy-btn-secondary full-width"
                onClick={handleGoogleLogin}
                disabled={loading}
                style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </>
          )}

          {/* Toggle Login / Register / Back */}
          <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
            {mode === 'login' && (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMsg(null); }}
                  style={{ background: 'none', border: 'none', color: 'var(--leaf-green)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  Create an Account
                </button>
              </>
            )}

            {mode === 'register' && (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(null); }}
                  style={{ background: 'none', border: 'none', color: 'var(--leaf-green)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  Log In
                </button>
              </>
            )}

            {mode === 'forgot-password' && (
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(null); }}
                style={{ background: 'none', border: 'none', color: 'var(--leaf-green)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
              >
                ← Back to Log In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
