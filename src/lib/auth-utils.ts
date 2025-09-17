/**
 * Authentication Utility Functions
 * 
 * This file contains helper functions for user authentication
 * using Supabase Auth and our custom users table.
 */

import { createClient } from '@/lib/supabase/client';
import { createClient as createServerClient } from '@/lib/supabase/server';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  username?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

/**
 * Sign up a new user
 */
export async function signUp(data: SignUpData): Promise<{ user: any; error: AuthError | null }> {
  try {
    const supabase = createClient();
    
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          username: data.username,
        }
      }
    });

    if (authError) {
      console.error('Supabase sign up error:', authError);
      return { user: null, error: { message: authError.message, code: authError.message } };
    }

    console.log('Sign up successful:', authData);
    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Unexpected sign up error:', error);
    return { 
      user: null, 
      error: { message: `An unexpected error occurred during sign up: ${error instanceof Error ? error.message : 'Unknown error'}` } 
    };
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(data: SignInData): Promise<{ user: any; error: AuthError | null }> {
  try {
    const supabase = createClient();
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      return { user: null, error: { message: authError.message, code: authError.message } };
    }

    return { user: authData.user, error: null };
  } catch (error) {
    return { 
      user: null, 
      error: { message: 'An unexpected error occurred during sign in' } 
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    console.log('auth-utils: Creating Supabase client...');
    const supabase = createClient();
    
    console.log('auth-utils: Calling supabase.auth.signOut()...');
    
    // Add timeout to prevent hanging
    const signOutPromise = supabase.auth.signOut();
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Sign out timeout after 3 seconds')), 3000)
    );
    
    const result = await Promise.race([signOutPromise, timeoutPromise]);
    console.log('auth-utils: Sign out completed, result:', result);

    if (result.error) {
      console.error('auth-utils: Sign out error:', result.error);
      return { error: { message: result.error.message, code: result.error.message } };
    }

    console.log('auth-utils: Sign out successful');
    return { error: null };
  } catch (error) {
    console.error('auth-utils: Unexpected error during sign out:', error);
    
    // If it's a timeout error, we need to force clear the session
    if (error instanceof Error && error.message.includes('timeout')) {
      console.log('auth-utils: Sign out timed out, forcing session clear...');
      
      try {
        // Force clear local session data
        const supabase = createClient();
        
        // Clear all auth-related data from localStorage
        if (typeof window !== 'undefined') {
          const keys = Object.keys(localStorage);
          keys.forEach(key => {
            if (key.startsWith('sb-') || key.includes('supabase')) {
              localStorage.removeItem(key);
            }
          });
          
          // Also clear sessionStorage
          const sessionKeys = Object.keys(sessionStorage);
          sessionKeys.forEach(key => {
            if (key.startsWith('sb-') || key.includes('supabase')) {
              sessionStorage.removeItem(key);
            }
          });
        }
        
        // Try to clear the session one more time with a shorter timeout
        const quickSignOut = supabase.auth.signOut();
        const quickTimeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Quick sign out timeout')), 1000)
        );
        
        try {
          await Promise.race([quickSignOut, quickTimeout]);
          console.log('auth-utils: Quick sign out successful');
        } catch (quickError) {
          console.log('auth-utils: Quick sign out also timed out, but localStorage cleared');
        }
        
        return { error: null };
      } catch (forceError) {
        console.error('auth-utils: Error during forced session clear:', forceError);
        return { error: null }; // Still return success since we cleared localStorage
      }
    }
    
    return { 
      error: { message: 'An unexpected error occurred during sign out' } 
    };
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser(): Promise<{ user: any; error: AuthError | null }> {
  try {
    const supabase = createClient();
    
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return { user: null, error: { message: error.message, code: error.message } };
    }

    return { user, error: null };
  } catch (error) {
    return { 
      user: null, 
      error: { message: 'An unexpected error occurred while getting user' } 
    };
  }
}

/**
 * Get user profile from our custom users table
 */
export async function getUserProfile(userId: string): Promise<{ profile: any; error: AuthError | null }> {
  try {
    const supabase = createClient();
    
    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return { profile: null, error: { message: error.message, code: error.message } };
    }

    return { profile, error: null };
  } catch (error) {
    return { 
      profile: null, 
      error: { message: 'An unexpected error occurred while getting profile' } 
    };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: any): Promise<{ profile: any; error: AuthError | null }> {
  try {
    const supabase = createClient();
    
    const { data: profile, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { profile: null, error: { message: error.message, code: error.message } };
    }

    return { profile, error: null };
  } catch (error) {
    return { 
      profile: null, 
      error: { message: 'An unexpected error occurred while updating profile' } 
    };
  }
}

/**
 * Check if user has premium access
 */
export async function isPremiumUser(userId: string): Promise<boolean> {
  try {
    const { profile, error } = await getUserProfile(userId);
    
    if (error || !profile) {
      return false;
    }

    return profile.premium > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  try {
    const supabase = createClient();
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (authError) {
      console.error('Supabase password reset error:', authError);
      return { error: { message: authError.message, code: authError.message } };
    }

    console.log('Password reset email sent successfully');
    return { error: null };
  } catch (error) {
    console.error('Unexpected password reset error:', error);
    return {
      error: { message: `An unexpected error occurred during password reset: ${error instanceof Error ? error.message : 'Unknown error'}` }
    };
  }
}

/**
 * Update user password (for password reset flow)
 */
export async function updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
  try {
    const supabase = createClient();
    const { error: authError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (authError) {
      console.error('Supabase password update error:', authError);
      return { error: { message: authError.message, code: authError.message } };
    }

    console.log('Password updated successfully');
    return { error: null };
  } catch (error) {
    console.error('Unexpected password update error:', error);
    return {
      error: { message: `An unexpected error occurred during password update: ${error instanceof Error ? error.message : 'Unknown error'}` }
    };
  }
}
