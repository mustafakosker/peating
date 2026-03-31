import { supabase } from './supabase';
import { Profile } from '../types/database';

/**
 * Fetch the current user's profile
 */
export async function fetchProfile(): Promise<{
  data: Profile | null;
  error: Error | null;
}> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return { data, error: error as Error | null };
}

/**
 * Update the current user's profile
 */
export async function updateProfile(
  updates: { display_name?: string | null; avatar_url?: string | null }
): Promise<{ data: Profile | null; error: Error | null }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', user.id)
    .select()
    .single();

  return { data, error: error as Error | null };
}

/**
 * Generic authenticated query helper
 */
export async function authenticatedQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: unknown }>
): Promise<{ data: T | null; error: Error | null }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await queryFn();
  return { data, error: error as Error | null };
}
