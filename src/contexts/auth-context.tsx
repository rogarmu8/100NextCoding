"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getCurrentUser } from '@/lib/auth-utils';
import { createClient } from '@/lib/supabase/client';

interface UserProfile {
  id: string;
  email: string;
  premium: number;
  is_active: boolean;
  stripe_customer_id?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // Get initial user and profile
    const getUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (!error && user) {
          setUser(user);
          
          // Get user profile from public.users table
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('id, email, premium, is_active, stripe_customer_id')
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

    // Listen for auth state changes (optimized)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          setLoading(false);
          
          // Fetch profile in background (non-blocking)
          try {
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('id, email, premium, is_active, stripe_customer_id')
              .eq('id', session.user.id)
              .single();
            
            if (!profileError && profile) {
              setUserProfile(profile);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);


  const isPremium = Boolean(userProfile?.premium && userProfile.premium > 0);

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      loading, 
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
