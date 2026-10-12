export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  created_at?: string;
  preferences?: {
    theme?: string;
    notifications_enabled?: boolean;
    watering_reminder_time?: string;
  };
}

export type AuthMode = 'login' | 'register' | 'forgot-password';
