# Data Model: Supabase Backend Setup

**Feature Branch**: `009-supabase-backend-setup`
**Created**: 2026-03-31
**Phase**: 1 (Design)

## Data Model Overview

This feature introduces Supabase as the backend database. The initial data model focuses on user authentication and profile management.

## Entities

### User (Supabase Built-in)

Managed by Supabase Auth (`auth.users` table).

| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key (auto-generated) |
| email | string | User's email address |
| encrypted_password | string | Hashed password (managed by Supabase) |
| email_confirmed_at | timestamp | Email verification timestamp |
| created_at | timestamp | Account creation time |
| updated_at | timestamp | Last update time |

**Notes**: This table is managed by Supabase Auth. Do not modify directly.

### Profile

Extends user with app-specific data (`public.profiles` table).

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | uuid | PK, FK to auth.users | Links to auth user |
| display_name | string | nullable, max 100 chars | User's display name |
| avatar_url | string | nullable, valid URL | Profile picture URL |
| created_at | timestamp | default now() | Profile creation time |
| updated_at | timestamp | default now() | Last profile update |

**Relationships**:
- One-to-one with `auth.users` (cascade delete)

**Row Level Security (RLS)**:
- SELECT: Users can read their own profile
- UPDATE: Users can update their own profile
- INSERT: Triggered automatically on user signup

## Database Migrations

### Migration 001: Create Profiles Table

```sql
-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create trigger for new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create trigger for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();
```

## TypeScript Types

```typescript
// types/database.ts

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
    };
  };
}
```

## State Management

### Authentication State

```typescript
// contexts/AuthContext.tsx

interface AuthState {
  user: User | null;           // Supabase auth user
  session: Session | null;     // Supabase session
  profile: Profile | null;     // App profile data
  loading: boolean;            // Initial load state
}

interface AuthContextValue extends AuthState {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}
```

## Data Flow

```
┌─────────────────┐
│   Mobile App    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Supabase Client │────▶│  Supabase Auth  │
└────────┬────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│   PostgreSQL    │◀───▶│    RLS Rules    │
└─────────────────┘     └─────────────────┘
```

## Future Considerations

The following tables will be added in future features:

- `vitals` - User health metrics (temperature, pulse)
- `meals` - Meal logging data
- `meal_items` - Individual food items in meals
- `favorites` - User's favorite meals

These are documented here for reference but not implemented in this feature.
