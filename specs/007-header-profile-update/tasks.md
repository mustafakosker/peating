# Tasks: Header Profile Update

**Input**: Design documents from `/specs/007-header-profile-update/`
**Prerequisites**: plan.md, spec.md, data-model.md, quickstart.md

**Tests**: Manual visual testing only (no automated tests requested)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile app**: `app/(tabs)/`, `components/` at repository root
- Paths use repository root as base

---

## Phase 1: Setup

**Purpose**: No setup required - modifying existing component

This feature modifies an existing component with no new dependencies or configuration. Skip directly to implementation.

---

## Phase 2: User Story 1 - View App Branding in Header (Priority: P1) 🎯 MVP

**Goal**: Display "Peating" as the header title instead of "Good Morning" greeting

**Independent Test**: Open the app home screen and verify "Peating" title is displayed in the header instead of "Good Morning"

### Implementation for User Story 1

- [x] T001 [US1] Rename `greeting` prop to `title` in HeaderBarProps type in components/HeaderBar.tsx
- [x] T002 [US1] Change default prop value from `'Good Morning'` to `'Peating'` in components/HeaderBar.tsx
- [x] T003 [US1] Rename `greeting` variable usage to `title` in HeaderBar component JSX in components/HeaderBar.tsx
- [x] T004 [US1] Rename `greeting` style to `title` style in StyleSheet in components/HeaderBar.tsx
- [x] T005 [US1] Update title style fontSize to 24 and fontWeight to '600' in components/HeaderBar.tsx
- [x] T006 [US1] Remove `greeting="Good Morning"` prop from HeaderBar usage in app/(tabs)/index.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional - "Peating" displays as header title

---

## Phase 3: User Story 2 - Profile Picture in Header (Priority: P1)

**Goal**: Profile picture remains visible in the top left corner of the header

**Independent Test**: Open the app and verify the profile picture (or placeholder) appears in the top left corner of the header

### Implementation for User Story 2

- [x] T007 [US2] Verify avatar container remains first element in userInfo View in components/HeaderBar.tsx
- [x] T008 [US2] Verify placeholder icon displays when no avatarUrl provided in components/HeaderBar.tsx

**Checkpoint**: At this point, both User Stories should work - title shows "Peating" and profile picture is on left

---

## Phase 4: Polish & Verification

**Purpose**: Final testing and validation

- [x] T009 Run TypeScript compilation check (`npx tsc --noEmit`)
- [x] T010 Verify header displays "Peating" title on home screen
- [x] T011 Verify profile picture (or placeholder) visible on left
- [x] T012 Verify "Good Morning" text no longer appears
- [x] T013 Verify action buttons (diamond, notifications) still visible on right
- [x] T014 Run quickstart.md verification checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Skipped - no setup required
- **User Story 1 (Phase 2)**: Can start immediately - primary implementation
- **User Story 2 (Phase 3)**: Verification only - avatar already exists
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Independent - title change
- **User Story 2 (P1)**: Verification only - existing functionality confirmed working

### Within User Story 1

- T001-T005 modify same file sequentially (not parallelizable)
- T006 modifies different file (can run after T001-T005)

---

## Implementation Strategy

### MVP (User Story 1)

1. Complete T001-T005 (HeaderBar.tsx changes)
2. Complete T006 (index.tsx cleanup)
3. **VALIDATE**: Run `npx tsc --noEmit` and visual test
4. Done - single component update

### Single Developer Order

Recommended execution:
1. T001 → T002 → T003 → T004 → T005 (HeaderBar.tsx - sequential)
2. T006 (index.tsx)
3. T007 → T008 (US2 verification)
4. T009 → T014 (Final verification)

---

## Files Changed Summary

| File | Change Type |
|------|-------------|
| `components/HeaderBar.tsx` | MODIFY |
| `app/(tabs)/index.tsx` | MODIFY |

---

## Notes

- This is a minimal UI change (2 files modified)
- No new dependencies required
- No automated tests - manual visual verification
- Profile picture functionality already exists (US2 is verification only)
- Total tasks: 14
- Implementation tasks: 8
- Verification tasks: 6
