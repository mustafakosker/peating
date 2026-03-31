# Research: Supabase Backend Setup

**Feature Branch**: `009-supabase-backend-setup`
**Created**: 2026-03-31
**Phase**: 0 (Discovery)

## Project Reorganization Research

### Current Structure Analysis

**Current Layout**:
```
peating/
├── app/           # Expo Router pages (already exists)
├── components/    # React Native components
├── constants/     # Colors, etc.
├── services/      # Business logic services
├── types/         # TypeScript types
├── package.json   # Single package
└── ...config files
```

**Challenge**: The `app/` folder already exists and contains Expo Router pages. Need to restructure without breaking existing navigation.

### Decision: Monorepo with Workspace Structure

**Decision**: Keep frontend at root level, create `api/` for backend

**Rationale**:
- Expo Router requires `app/` folder at specific location relative to package.json
- Moving all files would break Expo's file-based routing
- Simpler approach: add `api/` folder for Supabase config, keep frontend structure
- This matches the user's request for separation without breaking Expo conventions

**Updated Structure**:
```
peating/
├── app/           # Expo Router pages (unchanged location)
├── components/    # React Native components
├── constants/     # Colors, etc.
├── services/      # Business logic services
├── types/         # TypeScript types
├── lib/           # NEW: Supabase client
├── contexts/      # NEW: React contexts
├── api/           # NEW: Backend configuration
│   └── supabase/  # Supabase project files
├── package.json   # Frontend dependencies
└── .env.local     # Environment variables
```

**Alternatives Considered**:
1. Full monorepo with workspaces - Too complex for BaaS setup
2. Separate repositories - Overhead not justified
3. Current structure + api/ folder - **Selected** (minimal disruption)

## Supabase Integration Research

### Supabase Client for React Native

**Decision**: Use `@supabase/supabase-js` v2 with AsyncStorage adapter

**Rationale**:
- Official SDK with React Native support
- Built-in auth persistence with AsyncStorage
- Real-time subscriptions for future features
- TypeScript support out of the box

**Required Packages**:
```json
{
  "@supabase/supabase-js": "^2.45.0",
  "react-native-url-polyfill": "^2.0.0"
}
```

**Client Setup Pattern**:
```typescript
// lib/supabase.ts
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

### Authentication Pattern

**Decision**: React Context for auth state management

**Rationale**:
- No additional state management library needed
- Simple provider pattern works well with Expo Router
- Easy to wrap protected routes

**Auth Context Pattern**:
```typescript
// contexts/AuthContext.tsx
- Provides: user, session, signUp, signIn, signOut
- Auto-initializes session from storage
- Listens to auth state changes
```

## Environment Configuration

### Decision: Expo Environment Variables

**Decision**: Use `EXPO_PUBLIC_` prefix for public keys

**Rationale**:
- Expo's built-in env variable support
- Works in both development and production
- Clear distinction between public (anon key) and private keys

**Required Variables**:
```
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

**Security Note**:
- Anon key is safe to expose (RLS protects data)
- Service role key should NEVER be in frontend code
- All sensitive operations go through Supabase RLS or Edge Functions

## Database Schema Considerations

### Initial Tables (for auth feature)

Supabase provides `auth.users` automatically. For app-specific user data:

```sql
-- profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
```

## Research Conclusions

1. **Project Structure**: Add `api/` folder, keep frontend at root (Expo convention)
2. **Supabase Client**: Standard `@supabase/supabase-js` with AsyncStorage
3. **Auth Management**: React Context pattern
4. **Environment**: Expo's `EXPO_PUBLIC_` variables
5. **Database**: Use Supabase's built-in auth, extend with profiles table

All NEEDS CLARIFICATION items resolved. Ready for Phase 1 design.
