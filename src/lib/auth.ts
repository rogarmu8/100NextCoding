/**
 * Authentication Utilities
 * 
 * This file contains helper functions for user authentication
 * and premium status checking.
 */

import { createClient } from '@/lib/supabase/server';

/**
 * Check if a user has premium access
 * @param userId - The user's UUID
 * @returns Promise<boolean> - True if user has premium access
 */
export async function isPremiumUser(userId: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('users')
      .select('premium')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error checking premium status:', error);
      return false;
    }

    return data.premium > 0;
  } catch (error) {
    console.error('Error in isPremiumUser:', error);
    return false;
  }
}

/**
 * Get user's premium status details
 * @param userId - The user's UUID
 * @returns Promise<object> - Premium status details
 */
export async function getUserPremiumStatus(userId: string) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('users')
      .select('premium, stripe_customer_id')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error getting premium status:', error);
      return {
        isPremium: false,
        premium: 0,
        stripeCustomerId: null,
      };
    }

    return {
      isPremium: data.premium > 0,
      premium: data.premium,
      stripeCustomerId: data.stripe_customer_id,
    };
  } catch (error) {
    console.error('Error in getUserPremiumStatus:', error);
    return {
      isPremium: false,
      premium: 0,
      stripeCustomerId: null,
    };
  }
}

/**
 * Get current authenticated user
 * @returns Promise<object|null> - User object or null if not authenticated
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Get user profile with premium status
 * @param userId - The user's UUID
 * @returns Promise<object|null> - User profile or null if not found
 */
export async function getUserProfile(userId: string) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error getting user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
}

/**
 * Update user's premium status
 * @param userId - The user's UUID
 * @param premiumData - Premium status data
 * @returns Promise<boolean> - Success status
 */
export async function updateUserPremiumStatus(
  userId: string, 
  premiumData: {
    premium: number;
    stripeCustomerId?: string;
  }
): Promise<boolean> {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('users')
      .update({
        premium: premiumData.premium,
        stripe_customer_id: premiumData.stripeCustomerId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating premium status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateUserPremiumStatus:', error);
    return false;
  }
}

/**
 * Check if user can access a specific feature
 * @param userId - The user's UUID
 * @param requiredAmount - Minimum premium amount required
 * @returns Promise<boolean> - True if user can access the feature
 */
export async function canAccessFeature(userId: string, requiredAmount: number): Promise<boolean> {
  try {
    const premiumStatus = await getUserPremiumStatus(userId);
    return premiumStatus.premium >= requiredAmount;
  } catch (error) {
    console.error('Error checking feature access:', error);
    return false;
  }
}
