# Quickstart: Supabase Backend Setup

**Feature Branch**: `009-supabase-backend-setup`
**Created**: 2026-03-31

## Overview

Add Supabase backend to the Peating app with user authentication and database connectivity.

## Prerequisites

1. **Supabase Account**: Create account at [supabase.com](https://supabase.com)
2. **Supabase Project**: Create a new project and note:
   - Project URL (`https://xxx.supabase.co`)
   - Anon/Public key (starts with `eyJ...`)

## Setup Steps

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js react-native-url-polyfill
```

### 2. Create Environment File

Create `.env.local` in project root:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Create Supabase Client

Create `lib/supabase.ts`:

```typescript
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### 4. Run Database Migration

In Supabase Dashboard > SQL Editor, run the migration from `data-model.md`.

### 5. Test Connection

```typescript
// Quick test in any component
import { supabase } from '../lib/supabase';

const testConnection = async () => {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  console.log('Connection test:', { data, error });
};
```

## Verification Checklist

After implementation, verify:

- [ ] Environment variables are set correctly
- [ ] `npm install` completes without errors
- [ ] App starts without Supabase connection errors
- [ ] Can sign up a new user
- [ ] Can sign in with existing user
- [ ] Can sign out
- [ ] Session persists after app restart
- [ ] Profile is created automatically on signup
- [ ] RLS policies work (can only see own profile)

## Quick Test Commands

```bash
# Start the app
npx expo start

# Check TypeScript
npx tsc --noEmit

# Verify env vars are loaded (in app)
console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
```

## Troubleshooting

### "Network request failed"
- Check SUPABASE_URL is correct
- Ensure device/emulator has internet access

### "Invalid API key"
- Verify SUPABASE_ANON_KEY is the anon/public key (not service role)
- Check for extra whitespace in .env.local

### "Permission denied"
- RLS is enabled - ensure policies are created
- Check auth.uid() matches the profile id

### Session not persisting
- Ensure AsyncStorage is properly imported
- Check storage option in createClient

## File Changes Summary

| File | Change Type |
|------|-------------|
| `package.json` | MODIFY (add dependencies) |
| `.env.local` | CREATE |
| `.env.example` | CREATE |
| `lib/supabase.ts` | CREATE |
| `contexts/AuthContext.tsx` | CREATE |
| `types/database.ts` | CREATE |
| `api/supabase/migrations/001_profiles.sql` | CREATE |

## Rollback

To remove Supabase integration:

```bash
# Remove dependencies
npm uninstall @supabase/supabase-js react-native-url-polyfill

# Delete created files
rm -rf lib/supabase.ts contexts/AuthContext.tsx types/database.ts
rm .env.local

# In Supabase Dashboard
# - Drop profiles table
# - Delete project (if no longer needed)
```
