import React, { useState, useEffect } from 'react';
import { AuthService } from '../../services/auth';
import type { UserProfile } from '../../types/auth';
import { ThemeSelector } from '../ThemeSelector';

interface LeafyAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
  onOpenConfig: () => void;
  onMigrateLocalData: () => void;
  hasLocalDataToMigrate: boolean;
  plantCount: number;
  journalCount: number;
  photoCount: number;
}

export const LeafyAccountModal: React.FC<LeafyAccountModalProps> = ({
  isOpen,
  onClose,
  onOpenAuth,
  onOpenConfig,
  onMigrateLocalData,
  hasLocalDataToMigrate,
  plantCount,
  journalCount,
  photoCount
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const isConfigured = AuthService.isConfigured();

  useEffect(() => {
    if (isOpen) {
      AuthService.getCurrentProfile().then((p) => {
        setProfile(p);
        if (p) {
          setDisplayName(p.display_name || '');
          setAvatarUrl(p.avatar_url || '');
          setNotifications(p.preferences?.notifications_enabled !== false);
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setFeedbackMsg(null);

    const { profile: updated, error } = await AuthService.updateProfile({
      display_name: displayName.trim(),
      avatar_url: avatarUrl.trim(),
      preferences: { ...profile.preferences, notifications_enabled: notifications }
    });
    setSaving(false);

    if (error) {
      setFeedbackMsg(`❌ ${error}`);
    } else {
      setProfile(updated);
      setFeedbackMsg('✓ Profile updated successfully!');
      setTimeout(() => setFeedbackMsg(null), 3000);
      setShowAccountForm(false);
    }
  };

  const handleToggleNotifications = async () => {
    const nextVal = !notifications;
    setNotifications(nextVal);
    if (profile) {
      await AuthService.updateProfile({
        preferences: { ...profile.preferences, notifications_enabled: nextVal }
      });
      setFeedbackMsg(`✓ Notifications ${nextVal ? 'enabled' : 'muted'}`);
      setTimeout(() => setFeedbackMsg(null), 2500);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setFeedbackMsg('❌ Password must be at least 6 characters.');
      return;
    }
    setSaving(true);
    const { error } = await AuthService.updatePassword(newPassword);
    setSaving(false);

    if (error) {
      setFeedbackMsg(`❌ ${error}`);
    } else {
      setFeedbackMsg('✓ Password changed successfully!');
      setNewPassword('');
      setShowPasswordSection(false);
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await AuthService.signOut();
      onClose();
      window.location.reload();
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      '⚠️ WARNING: Are you sure you want to delete your account? This will permanently delete all your private plants, journal entries, and photos from the cloud. This action cannot be undone.'
    );
    if (confirmed) {
      await AuthService.deleteAccount();
      onClose();
      window.location.reload();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{
          background: 'var(--bg-modal)',
          color: 'var(--text-main)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '460px',
          width: '92%',
          padding: '28px 24px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-card)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Back/Close button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)'
            }}
            aria-label="Back"
          >
            ←
          </button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            My Profile
          </h2>
          <div style={{ width: '28px' }} />
        </div>

        {/* Feedback Alert Notice */}
        {feedbackMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: feedbackMsg.startsWith('✓') ? 'var(--matcha-soft)' : '#fee2e2',
              color: feedbackMsg.startsWith('✓') ? 'var(--leaf-green)' : '#b91c1c',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '16px',
              textAlign: 'center'
            }}
          >
            {feedbackMsg}
          </div>
        )}

        {/* Guest Profile Banner */}
        {!profile ? (
          <div style={{ textAlign: 'center', padding: '16px 0 24px 0' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                margin: '0 auto 14px auto',
                borderRadius: '50%',
                background: 'var(--bg-elevated)',
                border: '2px dashed var(--matcha)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px'
              }}
            >
              🌱
            </div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '19px', fontWeight: 800, color: 'var(--text-main)' }}>
              Guest Botanist
            </h3>
            <p style={{ margin: '0 0 18px 0', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, padding: '0 12px' }}>
              Sign in to automatically sync your garden, growth milestones, and photos to your cloud account.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '280px', margin: '0 auto 24px auto' }}>
              <button
                className="leafy-btn-primary"
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
              >
                Log In or Sign Up
              </button>

              <button
                className="leafy-btn-secondary"
                onClick={() => {
                  onClose();
                  onOpenConfig();
                }}
              >
                ⚙️ Link Supabase Project
              </button>
            </div>
          </div>
        ) : (
          /* Logged In User Avatar & Header */
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '10px' }}>
              <img
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'}
                alt={profile.display_name || 'Profile Avatar'}
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--matcha)',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <button
                onClick={() => setShowAccountForm(!showAccountForm)}
                title="Edit avatar & display name"
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--leaf-green)',
                  color: '#ffffff',
                  border: '2px solid var(--bg-modal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
              >
                📷
              </button>
            </div>

            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
              {profile.display_name || 'Monica'}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {profile.email}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--leaf-green)', fontWeight: 700, marginTop: '6px' }}>
              <span>● Cloud Garden Active</span>
            </div>
          </div>
        )}

        {/* Garden Statistics Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '20px',
            textAlign: 'center'
          }}
        >
          <div style={{ background: 'var(--bg-card)', padding: '12px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-main)' }}>{plantCount}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Plants</div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '12px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-main)' }}>{journalCount}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Journal Logs</div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '12px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-main)' }}>{photoCount}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Photos</div>
          </div>
        </div>

        {/* Local Garden Migration Banner */}
        {hasLocalDataToMigrate && (
          <div
            style={{
              background: 'var(--matcha-soft)',
              border: '1px solid var(--matcha)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--leaf-green)', marginBottom: '4px' }}>
              🌱 Import Local Garden to Cloud
            </div>
            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
              We detected local plants that are not synced yet. Would you like to import them to your cloud account?
            </p>
            <button
              className="leafy-btn-primary"
              style={{ padding: '8px 16px', fontSize: '12px' }}
              onClick={onMigrateLocalData}
            >
              Import Local Plants Now
            </button>
          </div>
        )}

        {/* Profile Menu List Items (Matching Reference Layout) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
          {/* 1. Account Settings */}
          {profile && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden'
              }}
            >
              <button
                type="button"
                onClick={() => setShowAccountForm(!showAccountForm)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-leafy)',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '16px' }}>⚙️</span>
                  <span>Account Settings</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  {showAccountForm ? '▲' : '›'}
                </span>
              </button>

              {showAccountForm && (
                <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <form onSubmit={handleSaveProfile} style={{ marginTop: '12px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                        DISPLAY NAME
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="leafy-search-input"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        required
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                        AVATAR PHOTO URL
                      </label>
                      <input
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="leafy-search-input"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        placeholder="https://..."
                      />
                    </div>

                    <button type="submit" className="leafy-btn-primary full-width" style={{ padding: '8px 14px', fontSize: '13px' }} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Profile Changes'}
                    </button>
                  </form>

                  {/* Password Section */}
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      type="button"
                      onClick={() => setShowPasswordSection(!showPasswordSection)}
                      style={{ background: 'none', border: 'none', color: 'var(--leaf-green)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                    >
                      {showPasswordSection ? '▲ Cancel Password Change' : '🔒 Change Password'}
                    </button>

                    {showPasswordSection && (
                      <form onSubmit={handleUpdatePassword} style={{ marginTop: '8px' }}>
                        <input
                          type="password"
                          placeholder="New password (min 6 characters)"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="leafy-search-input"
                          style={{ width: '100%', marginBottom: '8px', boxSizing: 'border-box' }}
                          required
                        />
                        <button type="submit" className="leafy-btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                          Update Password
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. Notifications Item */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '16px' }}>🔔</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Notifications</span>
            </div>
            <button
              type="button"
              onClick={handleToggleNotifications}
              style={{
                background: notifications ? 'var(--leaf-green)' : 'var(--bg-elevated)',
                border: '1px solid var(--border-card)',
                width: '42px',
                height: '24px',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                padding: 0
              }}
              title={notifications ? 'Disable notifications' : 'Enable notifications'}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: notifications ? '20px' : '3px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  transition: 'left 0.2s ease'
                }}
              />
            </button>
          </div>

          {/* 3. App Preferences & Appearance (Theme Switcher!) */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '16px' }}>📱</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>App Preferences</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Appearance</span>
            </div>

            {/* Segmented Theme Mode Selector (Light, Dark, System) */}
            <div style={{ marginTop: '2px' }}>
              <ThemeSelector />
            </div>
          </div>

          {/* 4. Help & Support */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}
          >
            <button
              type="button"
              onClick={() => setShowHelp(!showHelp)}
              style={{
                width: '100%',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-leafy)',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '16px' }}>❓</span>
                <span>Help & Support</span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                {showHelp ? '▲' : '›'}
              </span>
            </button>

            {showHelp && (
              <div style={{ padding: '0 16px 14px 16px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ margin: '8px 0 6px 0' }}>
                  <strong>🌱 Care Reminders:</strong> Reminders dynamically calculate watering intervals based on your plant species requirements.
                </p>
                <p style={{ margin: '0 0 6px 0' }}>
                  <strong>✨ 3D Viewer:</strong> Drag with cursor or touch to rotate specimen 3D models. Switch between seed, juvenile, and mature growth stages anytime.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>☁️ Cloud Sync:</strong> Your garden synchronizes in real time with Supabase PostgreSQL cloud storage.
                </p>
              </div>
            )}
          </div>

          {/* Database Configuration item */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => {
              onClose();
              onOpenConfig();
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '16px' }}>🗄️</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Database Status</span>
            </div>
            <span style={{ fontSize: '12px', color: isConfigured ? 'var(--leaf-green)' : 'var(--terracotta)', fontWeight: 700 }}>
              {isConfigured ? '🟢 Connected' : '🟡 Offline'} ›
            </span>
          </div>

          {/* 5. Log Out / Account Action */}
          {profile && (
            <button
              type="button"
              onClick={handleSignOut}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                color: '#ef4444',
                fontFamily: 'var(--font-leafy)',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <span style={{ fontSize: '16px' }}>🚪</span>
              <span>Log Out</span>
            </button>
          )}

          {/* Delete Account link for authenticated user */}
          {profile && (
            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <button
                type="button"
                onClick={handleDeleteAccount}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Permanently Delete Account & Cloud Garden Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
