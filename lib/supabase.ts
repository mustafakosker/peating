import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Custom storage that works with SSR
const createStorage = () => {
  // Server-side or during SSR - use memory storage
  if (typeof window === 'undefined') {
    const memoryStorage: Record<string, string> = {};
    return {
      getItem: (key: string) => Promise.resolve(memoryStorage[key] ?? null),
      setItem: (key: string, value: string) => {
        memoryStorage[key] = value;
        return Promise.resolve();
      },
      removeItem: (key: string) => {
        delete memoryStorage[key];
        return Promise.resolve();
      },
    };
  }

  // Client-side - use AsyncStorage
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  return AsyncStorage;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: createStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
