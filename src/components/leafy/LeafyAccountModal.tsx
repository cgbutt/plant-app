import React, { useState, useEffect } from 'react';
import { AuthService } from '../../services/auth';
import type { UserProfile } from '../../types/auth';

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
          background: 'var(--cream)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '520px',
          width: '92%',
          padding: '28px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-card)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Account & Cloud Settings
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Manage your personal garden profile and cloud sync
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', color: 'var(--text-muted)', cursor: 'pointer' }}>
            ✕
          </button>
        </div>

        {/* Feedback Message */}
        {feedbackMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: feedbackMsg.startsWith('✓') ? 'var(--sage-light)' : '#fee2e2',
              color: feedbackMsg.startsWith('✓') ? 'var(--leaf-green-dark)' : '#b91c1c',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '16px'
            }}
          >
            {feedbackMsg}
          </div>
        )}

        {/* Guest vs Logged In View */}
        {!profile ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🌱</div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
              You are currently browsing as a Guest
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Create an account or log in to sync your plants, photos, and journal entries across all your devices with cloud backup.
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
          <div>
            {/* User Profile Card */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'}
                alt="Avatar"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--matcha)'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-main)' }}>
                  {profile.display_name || 'Botanist'}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {profile.email}
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--leaf-green)', fontWeight: 700, marginTop: '4px' }}>
                  <span>● Cloud Synced</span>
                </div>
              </div>
            </div>

            {/* Cloud Garden Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginBottom: '20px',
                textAlign: 'center'
              }}
            >
              <div style={{ background: '#ffffff', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>{plantCount}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Plants</div>
              </div>
              <div style={{ background: '#ffffff', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>{journalCount}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Journal Logs</div>
              </div>
              <div style={{ background: '#ffffff', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>{photoCount}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Photos</div>
              </div>
            </div>

            {/* Local Garden Migration Card (if existing unlinked local plants exist) */}
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
                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--leaf-green-dark)', marginBottom: '4px' }}>
                  🌱 Import Local Garden to Cloud
                </div>
                <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  We detected plants on this device that are not synced yet. Would you like to import them to your cloud account?
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

            {/* Edit Profile Form */}
            <form onSubmit={handleSaveProfile} style={{ marginBottom: '22px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
                  DISPLAY NAME
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-card)',
                    fontFamily: 'var(--font-leafy)',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
                  AVATAR IMAGE URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-card)',
                    fontFamily: 'var(--font-leafy)',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                  Care Reminders Notifications
                </span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--leaf-green)' }}
                />
              </div>

              <button type="submit" className="leafy-btn-secondary full-width" disabled={saving}>
                {saving ? 'Saving...' : 'Update Profile Info'}
              </button>
            </form>

            {/* Security: Change Password */}
            <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '16px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--leaf-green)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: 0,
                  marginBottom: '10px'
                }}
              >
                {showPasswordSection ? '▲ Hide Change Password' : '▼ Change Account Password'}
              </button>

              {showPasswordSection && (
                <form onSubmit={handleUpdatePassword} style={{ marginTop: '10px' }}>
                  <input
                    type="password"
                    placeholder="New password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-card)',
                      fontFamily: 'var(--font-leafy)',
                      fontSize: '13px',
                      marginBottom: '8px',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                  <button type="submit" className="leafy-btn-secondary" style={{ fontSize: '12px', padding: '8px 14px' }}>
                    Save New Password
                  </button>
                </form>
              )}
            </div>

            {/* Supabase Link Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Database: {isConfigured ? '🟢 Supabase PostgreSQL Connected' : '🟡 Supabase Not Linked'}
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenConfig();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--leaf-green)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Project Settings
              </button>
            </div>

            {/* Log Out & Delete Account Actions */}
            <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border-card)', paddingTop: '18px' }}>
              <button
                type="button"
                className="leafy-btn-secondary"
                style={{ flex: 1 }}
                onClick={handleSignOut}
              >
                Log Out
              </button>

              <button
                type="button"
                style={{
                  flex: 1,
                  background: '#fee2e2',
                  color: '#b91c1c',
                  border: '1px solid #fca5a5',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-leafy)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: '10px'
                }}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
