"use server";

import { createClient } from "@/lib/supabase/server";

export const signOutAction = async () => {
  console.log('🔧 [AUTH DEBUG] Starting server-side sign out...');
  
  try {
    const supabase = await createClient();
    console.log('🔧 [AUTH DEBUG] Supabase client created');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('🔧 [AUTH DEBUG] Sign out error:', error);
      return { success: false, error: error.message };
    } else {
      console.log('🔧 [AUTH DEBUG] Sign out successful');
      return { success: true };
    }
    
  } catch (error) {
    console.error('🔧 [AUTH DEBUG] Unexpected error during sign out:', error);
    return { success: false, error: 'Unexpected error during sign out' };
  }
};
