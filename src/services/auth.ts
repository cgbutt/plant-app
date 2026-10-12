import { createClient, SupabaseClient, type User, type Session } from '@supabase/supabase-js';
import type { UserProfile } from '../types/auth';

const SUPABASE_URL_KEY = 'plant_app_supabase_url';
const SUPABASE_KEY_KEY = 'plant_app_supabase_anon_key';

class AuthServiceClass {
  private client: SupabaseClient | null = null;

  public getCredentials() {
    const url =
      (import.meta.env.VITE_SUPABASE_URL as string) ||
      localStorage.getItem(SUPABASE_URL_KEY) ||
      '';
    const key =
      (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
      localStorage.getItem(SUPABASE_KEY_KEY) ||
      '';
    return { url, key };
  }

  public saveCredentials(url: string, key: string) {
    localStorage.setItem(SUPABASE_URL_KEY, url.trim());
    localStorage.setItem(SUPABASE_KEY_KEY, key.trim());
    this.client = null; // Re-instantiate client
  }

  public isConfigured(): boolean {
    const { url, key } = this.getCredentials();
    return Boolean(url && key && url.startsWith('http'));
  }

  public getClient(): SupabaseClient | null {
    if (this.client) return this.client;

    const { url, key } = this.getCredentials();
    if (url && key && url.startsWith('http')) {
      try {
        this.client = createClient(url, key, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
        return this.client;
      } catch (err) {
        console.warn('Could not initialize Supabase client:', err);
        return null;
      }
    }
    return null;
  }

  // Register with email & password
  public async signUp(email: string, password: string, displayName: string): Promise<{ user: User | null; error: string | null }> {
    const client = this.getClient();
    if (!client) return { user: null, error: 'Supabase project not connected. Please connect your credentials.' };

    try {
      const { data, error } = await client.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            display_name: displayName.trim(),
            avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'
          }
        }
      });

      if (error) return { user: null, error: error.message };
      return { user: data.user, error: null };
    } catch (err: any) {
      return { user: null, error: err.message || 'An unexpected error occurred during sign up.' };
    }
  }

  // Log in with email & password
  public async signIn(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: string | null }> {
    const client = this.getClient();
    if (!client) return { user: null, session: null, error: 'Supabase project not connected.' };

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) return { user: null, session: null, error: error.message };
      return { user: data.user, session: data.session, error: null };
    } catch (err: any) {
      return { user: null, session: null, error: err.message || 'Login failed.' };
    }
  }

  // Google OAuth Sign In
  public async signInWithGoogle(): Promise<{ error: string | null }> {
    const client = this.getClient();
    if (!client) return { error: 'Supabase project not connected.' };

    try {
      const { error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) return { error: error.message };
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Google authentication error.' };
    }
  }

  // Send password reset email
  public async resetPassword(email: string): Promise<{ error: string | null }> {
    const client = this.getClient();
    if (!client) return { error: 'Supabase project not connected.' };

    try {
      const { error } = await client.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}#/reset-password`
      });

      if (error) return { error: error.message };
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Failed to send password reset.' };
    }
  }

  // Update password (when user is logged in or following reset link)
  public async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    const client = this.getClient();
    if (!client) return { error: 'Supabase project not connected.' };

    try {
      const { error } = await client.auth.updateUser({ password: newPassword });
      if (error) return { error: error.message };
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Failed to update password.' };
    }
  }

  // Sign out
  public async signOut(): Promise<{ error: string | null }> {
    const client = this.getClient();
    if (!client) return { error: null };

    try {
      const { error } = await client.auth.signOut();
      if (error) return { error: error.message };
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }

  // Get currently logged-in user
  public async getCurrentUser(): Promise<User | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data: { user } } = await client.auth.getUser();
      return user;
    } catch {
      return null;
    }
  }

  // Fetch or create profile record
  public async getCurrentProfile(): Promise<UserProfile | null> {
    const user = await this.getCurrentUser();
    if (!user) return null;

    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        // Fallback profile from user auth metadata
        return {
          id: user.id,
          email: user.email || '',
          display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'Botanist',
          avatar_url: user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
          created_at: user.created_at
        };
      }

      return data as UserProfile;
    } catch {
      return null;
    }
  }

  // Update profile
  public async updateProfile(updates: Partial<UserProfile>): Promise<{ profile: UserProfile | null; error: string | null }> {
    const user = await this.getCurrentUser();
    if (!user) return { profile: null, error: 'User not authenticated' };

    const client = this.getClient();
    if (!client) return { profile: null, error: 'Supabase not connected' };

    try {
      const { data, error } = await client
        .from('profiles')
        .update({
          display_name: updates.display_name,
          avatar_url: updates.avatar_url,
          preferences: updates.preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) return { profile: null, error: error.message };
      return { profile: data as UserProfile, error: null };
    } catch (err: any) {
      return { profile: null, error: err.message };
    }
  }

  // Delete user account & all private data
  public async deleteAccount(): Promise<{ error: string | null }> {
    const user = await this.getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    const client = this.getClient();
    if (!client) return { error: 'Supabase not connected' };

    try {
      // 1. Delete user plants (cascades to photos & journal entries via foreign keys)
      await client.from('plants').delete().eq('user_id', user.id);
      // 2. Delete user profile
      await client.from('profiles').delete().eq('id', user.id);
      // 3. Sign out
      await client.auth.signOut();
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Error deleting account data' };
    }
  }

  // Reactive listener for session changes
  public onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    const client = this.getClient();
    if (!client) return { unsubscribe: () => {} };

    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });

    return subscription;
  }
}

export const AuthService = new AuthServiceClass();
