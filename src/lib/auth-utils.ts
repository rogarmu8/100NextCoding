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
    const supabase = createClient();
    
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: { message: error.message, code: error.message } };
    }

    return { error: null };
  } catch (error) {
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
