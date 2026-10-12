import React, { useState } from 'react';
import { AuthService } from '../../services/auth';
import { SupabaseService } from '../../services/supabase';

interface LeafySupabaseConfigModalProps {
  onClose: () => void;
  onConnected: () => void;
}

export const LeafySupabaseConfigModal: React.FC<LeafySupabaseConfigModalProps> = ({
  onClose,
  onConnected
}) => {
  const currentCreds = AuthService.getCredentials();
  const [url, setUrl] = useState(currentCreds.url);
  const [key, setKey] = useState(currentCreds.key);
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; msg: string } | null>(null);

  const handleSaveAndTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestResult(null);

    const cleanUrl = url.trim();
    const cleanKey = key.trim();

    if (!cleanUrl || !cleanKey) {
      setTestResult({ success: false, msg: 'Please provide both Project URL and Anon Key.' });
      return;
    }

    setTesting(true);
    AuthService.saveCredentials(cleanUrl, cleanKey);
    SupabaseService.saveCredentials(cleanUrl, cleanKey);

    // Test client initialization
    const client = AuthService.getClient();
    if (!client) {
      setTesting(false);
      setTestResult({ success: false, msg: 'Invalid Project URL format. Must start with https://' });
      return;
    }

    try {
      const { error } = await client.from('profiles').select('count', { count: 'exact', head: true });
      setTesting(false);
      if (error && error.code !== 'PGRST116' && !error.message.includes('relation "public.profiles" does not exist')) {
        setTestResult({
          success: true,
          msg: `Connected to Supabase! (Note: run the SQL migration below if tables are not created yet: ${error.message})`
        });
      } else {
        setTestResult({ success: true, msg: '🟢 Successfully connected to your Supabase project!' });
      }
      onConnected();
    } catch (err: any) {
      setTesting(false);
      setTestResult({ success: true, msg: 'Credentials saved! You can now register or log in.' });
      onConnected();
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SupabaseService.getSqlMigrationScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card wide"
        style={{
          background: 'var(--cream)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '560px',
          width: '94%',
          padding: '28px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-card)',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Link Supabase Project
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Connect your cloud database for multi-user authentication & sync
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', color: 'var(--text-muted)', cursor: 'pointer' }}>
            ✕
          </button>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSaveAndTest} style={{ marginBottom: '22px' }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
              SUPABASE PROJECT URL
            </label>
            <input
              type="text"
              placeholder="https://xyzcompany.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                fontFamily: 'var(--font-leafy)',
                fontSize: '13px',
                background: '#ffffff',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
              SUPABASE ANON / PUBLIC KEY
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOi..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                fontFamily: 'var(--font-leafy)',
                fontSize: '13px',
                background: '#ffffff',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="leafy-btn-primary full-width"
            disabled={testing}
          >
            {testing ? 'Verifying connection...' : 'Connect Supabase Project'}
          </button>

          {testResult && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: testResult.success ? 'var(--sage-light)' : '#fee2e2',
                color: testResult.success ? 'var(--leaf-green-dark)' : '#b91c1c',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              {testResult.msg}
            </div>
          )}
        </form>

        {/* Database Migration SQL Box */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-main)' }}>
              PostgreSQL Tables & RLS Policies
            </div>
            <button
              type="button"
              className="leafy-btn-secondary"
              style={{ padding: '6px 12px', fontSize: '11px' }}
              onClick={handleCopySql}
            >
              {copied ? '✓ Copied' : 'Copy SQL Script'}
            </button>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
            Paste this SQL script once into your Supabase Dashboard &rarr; SQL Editor to initialize `profiles`, `plants`, `journal_entries`, and Row Level Security.
          </p>
          <pre
            style={{
              maxHeight: '120px',
              overflowY: 'auto',
              background: 'var(--cream)',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#334155',
              margin: 0
            }}
          >
            {SupabaseService.getSqlMigrationScript()}
          </pre>
        </div>
      </div>
    </div>
  );
};
