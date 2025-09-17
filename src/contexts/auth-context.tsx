"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getCurrentUser, signOut } from '@/lib/auth-utils';
import { createClient } from '@/lib/supabase/client';

interface UserProfile {
  id: string;
  email: string;
  premium: number;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user and profile
    const getUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (!error && user) {
          setUser(user);
          
          // Get user profile from public.users table
          const supabase = createClient();
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('id, email, premium, is_active')
            .eq('id', user.id)
            .single();
          
          if (!profileError && profile) {
            setUserProfile(profile);
          }
        }
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (!error) {
        setUser(null);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isPremium = Boolean(userProfile?.premium && userProfile.premium > 0);

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      loading, 
      signOut: handleSignOut, 
      isPremium 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
