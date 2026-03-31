# Tasks: Supabase Backend Setup

**Input**: Design documents from `/specs/009-supabase-backend-setup/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Tests**: Manual testing + Supabase dashboard verification (no automated tests requested)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile app**: Root level (`lib/`, `contexts/`, `types/`)
- **Backend**: `api/supabase/`
- Paths use repository root as base

---

## Phase 1: Setup

**Purpose**: Install dependencies and create environment configuration

- [x] T001 Install @supabase/supabase-js and react-native-url-polyfill dependencies via npm
- [x] T002 [P] Create .env.example file with EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY placeholders at project root
- [x] T003 [P] Create .env.local file with actual Supabase credentials at project root (user must provide values)
- [x] T004 Add .env.local to .gitignore if not already present

---

## Phase 2: Foundational - Supabase Client (Blocking)

**Purpose**: Create the Supabase client that all other features depend on

- [x] T005 Create lib/ directory at project root
- [x] T006 Create Supabase client initialization in lib/supabase.ts with AsyncStorage auth persistence
- [x] T007 Create types/database.ts with Profile interface and Database type definitions
- [x] T008 Verify Supabase client connects successfully (test in app)

**Checkpoint**: Supabase client is initialized and can connect to the backend

---

## Phase 3: User Story 1 - Project Structure Reorganization (Priority: P1) MVP

**Goal**: Create api/ folder for backend configuration files

**Independent Test**: Verify api/supabase/ folder exists with config files, and app still runs correctly

### Implementation for User Story 1

- [x] T009 [US1] Create api/ directory at project root
- [x] T010 [US1] Create api/supabase/ directory for Supabase project files
- [x] T011 [US1] Create api/supabase/config.toml with basic Supabase local configuration
- [x] T012 [US1] Create api/supabase/migrations/ directory for database migrations
- [x] T013 [US1] Create api/supabase/migrations/001_profiles.sql with profiles table and RLS policies from data-model.md
- [x] T014 [US1] Verify app still runs correctly after structure changes (`npx expo start`)

**Checkpoint**: Project structure has api/ folder, app functions normally

---

## Phase 4: User Story 2 - Backend Database Connection (Priority: P1)

**Goal**: Establish database connectivity with profiles table

**Independent Test**: Create a test profile record and retrieve it from Supabase

### Implementation for User Story 2

- [x] T015 [US2] Run profiles migration in Supabase Dashboard SQL Editor (from api/supabase/migrations/001_profiles.sql)
- [x] T016 [US2] Test database connection by querying profiles table from lib/supabase.ts client
- [x] T017 [US2] Verify RLS policies work (can only see own profile data)

**Checkpoint**: Database connection works, profiles table exists with RLS

---

## Phase 5: User Story 3 - User Authentication Foundation (Priority: P1)

**Goal**: Implement complete authentication flow (signup, signin, signout)

**Independent Test**: Sign up a new user, sign out, sign back in, verify session persists

### Implementation for User Story 3

- [x] T018 [US3] Create contexts/ directory at project root
- [x] T019 [US3] Create contexts/AuthContext.tsx with AuthProvider and useAuth hook
- [x] T020 [US3] Implement signUp function in AuthContext using supabase.auth.signUp()
- [x] T021 [US3] Implement signIn function in AuthContext using supabase.auth.signInWithPassword()
- [x] T022 [US3] Implement signOut function in AuthContext using supabase.auth.signOut()
- [x] T023 [US3] Add auth state listener (onAuthStateChange) to track session changes
- [x] T024 [US3] Add session initialization on app load from AsyncStorage
- [x] T025 [US3] Wrap app with AuthProvider in app/_layout.tsx
- [x] T026 [US3] Test full auth flow: signup → signout → signin → verify session

**Checkpoint**: Complete authentication flow works with session persistence

---

## Phase 6: User Story 4 - API Layer Setup (Priority: P2)

**Goal**: Establish patterns for authenticated API calls

**Independent Test**: Make an authenticated API call from mobile app and verify response

### Implementation for User Story 4

- [x] T027 [US4] Create lib/api.ts with helper functions for authenticated Supabase queries
- [x] T028 [US4] Add fetchProfile function to retrieve current user's profile
- [x] T029 [US4] Add updateProfile function to update current user's profile
- [x] T030 [US4] Test API layer with profile fetch after authentication

**Checkpoint**: API layer works for authenticated operations

---

## Phase 7: Polish & Verification

**Purpose**: Final testing and documentation

- [x] T031 Run TypeScript compilation check (`npx tsc --noEmit`)
- [x] T032 Verify all environment variables are documented in .env.example
- [x] T033 Verify app starts without errors (`npx expo start`)
- [x] T034 Test complete flow: signup → view profile → signout → signin
- [x] T035 Run quickstart.md verification checklist

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational - Supabase Client) ← BLOCKING
    ↓
Phase 3 (US1 - Project Structure) ─┐
    ↓                              │
Phase 4 (US2 - Database) ──────────┤ (can run in parallel after Phase 2)
    ↓                              │
Phase 5 (US3 - Authentication) ────┘
    ↓
Phase 6 (US4 - API Layer) ← depends on US3
    ↓
Phase 7 (Polish)
```

### User Story Dependencies

- **User Story 1 (P1)**: Independent after Phase 2
- **User Story 2 (P1)**: Independent after Phase 2
- **User Story 3 (P1)**: Independent after Phase 2
- **User Story 4 (P2)**: Depends on US3 (needs authentication)

### Parallel Opportunities

Within Phase 1:
- T002 and T003 can run in parallel (different files)

Within Phase 3:
- T009-T012 are sequential (directory creation order)

After Phase 2 completes:
- US1, US2, US3 can run in parallel (different concerns)

---

## Implementation Strategy

### MVP (User Story 1-3)

1. Complete Phase 1 (Setup) - install dependencies, create env files
2. Complete Phase 2 (Foundational) - Supabase client
3. Complete Phase 3 (US1) - api/ folder structure
4. Complete Phase 4 (US2) - database migration
5. Complete Phase 5 (US3) - authentication
6. **VALIDATE**: Run full auth flow test
7. MVP Done - backend connected with auth working

### Single Developer Order

Recommended execution:
1. T001 → T004 (Setup)
2. T005 → T008 (Supabase client)
3. T009 → T014 (Project structure)
4. T015 → T017 (Database)
5. T018 → T026 (Authentication)
6. T027 → T030 (API layer)
7. T031 → T035 (Verification)

---

## Files Changed Summary

| File | Change Type |
|------|-------------|
| `package.json` | MODIFY |
| `.env.example` | CREATE |
| `.env.local` | CREATE |
| `.gitignore` | MODIFY |
| `lib/supabase.ts` | CREATE |
| `types/database.ts` | CREATE |
| `api/supabase/config.toml` | CREATE |
| `api/supabase/migrations/001_profiles.sql` | CREATE |
| `contexts/AuthContext.tsx` | CREATE |
| `lib/api.ts` | CREATE |
| `app/_layout.tsx` | MODIFY |

---

## Notes

- This feature adds significant new infrastructure (7 new files, 2 new directories)
- Supabase project must be created manually in Supabase Dashboard
- User must provide actual Supabase credentials for .env.local
- Database migration runs in Supabase Dashboard (not automated)
- Total tasks: 35
- Implementation tasks: 30
- Verification tasks: 5
