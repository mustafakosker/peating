# Implementation Plan: Supabase Backend Setup

**Branch**: `009-supabase-backend-setup` | **Date**: 2026-03-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-supabase-backend-setup/spec.md`

## Summary

Add Supabase as the backend-as-a-service provider with project restructuring to separate frontend (app/) and backend (api/) code. Includes database connectivity, user authentication, and API layer setup.

## Technical Context

**Language/Version**: TypeScript 5.9 with React Native 0.81.5
**Primary Dependencies**:
- Frontend: Expo SDK 54, expo-router, React 19.1
- Backend: Supabase (database, auth, storage)
- New: @supabase/supabase-js
**Storage**: Supabase PostgreSQL (cloud), AsyncStorage (local cache)
**Testing**: Manual testing + Supabase dashboard verification
**Target Platform**: iOS/Android via Expo
**Project Type**: mobile-app with backend-as-a-service
**Performance Goals**: Database queries < 2s, Auth flow < 5s
**Constraints**: Environment-based configuration required
**Scale/Scope**: Project reorganization + 4 new integrations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is a template placeholder - no specific gates defined. Proceeding with standard best practices:

- [x] **Reasonable Scope**: Project reorganization is foundational but achievable
- [x] **Single Provider**: Using Supabase for all backend needs (consistency)
- [x] **Security First**: Environment variables for secrets, no hardcoded credentials
- [x] **Backward Compatible**: Existing app functionality preserved

## Project Structure

### Documentation (this feature)

```text
specs/009-supabase-backend-setup/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root) - AFTER Reorganization

```text
peating/                     # Repository root
├── app/                     # FRONTEND (mobile app)
│   ├── (tabs)/              # Tab-based navigation screens
│   │   ├── _layout.tsx
│   │   ├── index.tsx        # Home screen
│   │   ├── scan.tsx         # Scan screen
│   │   ├── analysis.tsx     # Analysis screen
│   │   ├── diets.tsx        # Peaty Meals screen
│   │   └── settings.tsx     # Settings screen
│   ├── _layout.tsx          # Root layout
│   ├── +not-found.tsx       # 404 screen
│   ├── app.json             # Expo config
│   ├── babel.config.js      # Babel config
│   ├── tsconfig.json        # TypeScript config
│   ├── package.json         # Frontend dependencies
│   ├── components/          # React Native components
│   ├── constants/           # App constants (Colors, etc.)
│   ├── services/            # Frontend services
│   ├── types/               # TypeScript types
│   ├── lib/                 # NEW: Supabase client setup
│   │   └── supabase.ts      # Supabase client initialization
│   └── contexts/            # NEW: React contexts
│       └── AuthContext.tsx  # Authentication state
│
├── api/                     # BACKEND (Supabase Edge Functions)
│   ├── package.json         # Backend dependencies
│   ├── supabase/            # Supabase project files
│   │   ├── config.toml      # Supabase local config
│   │   ├── seed.sql         # Database seed data
│   │   └── migrations/      # Database migrations
│   └── functions/           # Edge Functions (future)
│
├── .env.local               # Local environment variables
├── .env.example             # Environment template
├── CLAUDE.md                # Agent context
└── specs/                   # Feature specifications
```

**Structure Decision**: Monorepo with `app/` for Expo mobile app and `api/` for Supabase backend configuration.

## Complexity Tracking

| Aspect | Complexity | Notes |
|--------|------------|-------|
| Project reorganization | Medium | Many files to move, paths to update |
| Supabase setup | Low | BaaS with good SDK |
| Authentication | Medium | Multiple flows (signup, signin, signout) |
| Environment config | Low | Standard .env pattern |

## Implementation Approach

### Phase 1: Project Reorganization (US1)

1. Create new folder structure (`app/`, `api/`)
2. Move existing mobile app files into `app/`
3. Update import paths throughout codebase
4. Update Expo configuration for new structure
5. Verify app still runs correctly

### Phase 2: Supabase Setup (US2, US4)

1. Create Supabase project (or use existing)
2. Install `@supabase/supabase-js` in `app/`
3. Create Supabase client initialization in `app/lib/supabase.ts`
4. Set up environment variables
5. Test database connectivity

### Phase 3: Authentication (US3)

1. Create AuthContext for authentication state
2. Implement sign up flow
3. Implement sign in flow
4. Implement sign out flow
5. Add protected route handling
6. Create basic auth UI components

### Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Monorepo structure | app/ + api/ in same repo | Simpler deployment, shared types |
| Auth provider | Supabase Auth | Integrated with database, email/password built-in |
| Client location | app/lib/supabase.ts | Standard pattern for Expo projects |
| State management | React Context | Simple, no additional dependencies |
| Local dev | Supabase cloud project | Easier setup than local Supabase |

## Dependencies

### New Dependencies (app/package.json)

```json
{
  "@supabase/supabase-js": "^2.x",
  "react-native-url-polyfill": "^2.x"
}
```

### Environment Variables

```
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Path updates break app | High | Run app after each major move |
| Supabase connection issues | Medium | Test with simple query first |
| Auth state persistence | Medium | Use secure storage for tokens |
| Environment variable exposure | High | Use EXPO_PUBLIC_ prefix only for public keys |
