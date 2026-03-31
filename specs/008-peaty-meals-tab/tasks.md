# Tasks: Peaty Meals Tab Redesign

**Input**: Design documents from `/specs/008-peaty-meals-tab/`
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

**Purpose**: No setup required - modifying existing screen

This feature modifies an existing screen with no new dependencies or configuration. Skip directly to implementation.

---

## Phase 2: User Story 1 - View Peaty Meals Tab (Priority: P1) MVP

**Goal**: Display "Peaty Meals" as the header title instead of "Diets"

**Independent Test**: Open the app, navigate to the meals tab, and verify the header displays "Peaty Meals" instead of "Diets"

### Implementation for User Story 1

- [x] T001 [US1] Change header title from "Diets" to "Peaty Meals" on line 61 in app/(tabs)/diets.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional - "Peaty Meals" displays as header title

---

## Phase 3: User Story 2 - Browse Recommended Meals (Priority: P1)

**Goal**: First sub-tab labeled "Recommended" instead of "All Diets"

**Independent Test**: Open the meals tab and verify the first sub-tab is labeled "Recommended" and displays meal cards when selected

### Implementation for User Story 2

- [x] T002 [US2] Change first tab label from "All Diets" to "Recommended" in TabSwitcher tabs array on line 64 in app/(tabs)/diets.tsx

**Checkpoint**: At this point, User Story 2 should be functional - "Recommended" tab displays correctly

---

## Phase 4: User Story 3 - View Favorite Meals (Priority: P1)

**Goal**: Second sub-tab labeled "Favorite" instead of "My Diets"

**Independent Test**: Select the "Favorite" sub-tab and verify it displays the user's saved meal plans

### Implementation for User Story 3

- [x] T003 [US3] Change second tab label from "My Diets" to "Favorite" in TabSwitcher tabs array on line 64 in app/(tabs)/diets.tsx

**Checkpoint**: At this point, User Story 3 should be functional - "Favorite" tab displays correctly

---

## Phase 5: User Story 4 - Clean Layout Without Banner (Priority: P2)

**Goal**: Remove the promotional "Explore Diet Plans" banner from the top of the screen

**Independent Test**: Open the Peaty Meals tab and verify no promotional banner is displayed at the top

### Implementation for User Story 4

- [x] T004 [US4] Remove the banner View block (lines 69-74) in app/(tabs)/diets.tsx
- [x] T005 [US4] Remove unused banner styles (banner, bannerTitle, bannerSubtitle) from StyleSheet in app/(tabs)/diets.tsx

**Checkpoint**: At this point, User Story 4 should be functional - no banner visible, cleaner layout

---

## Phase 6: Polish & Verification

**Purpose**: Update section title and final testing

- [x] T006 Change section title from "Diets" to "Meals" on line 77 in app/(tabs)/diets.tsx
- [x] T007 Run TypeScript compilation check (`npx tsc --noEmit`)
- [x] T008 Verify header displays "Peaty Meals" title on meals tab
- [x] T009 Verify "Recommended" tab is first and selected by default
- [x] T010 Verify "Favorite" tab is second option
- [x] T011 Verify no "Explore Diet Plans" banner is visible
- [x] T012 Verify section title shows "Meals" not "Diets"
- [x] T013 Verify tab switching between Recommended and Favorite still works
- [x] T014 Run quickstart.md verification checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Skipped - no setup required
- **User Story 1 (Phase 2)**: Can start immediately - header title change
- **User Story 2 (Phase 3)**: Can start immediately - first tab label (same line as US3)
- **User Story 3 (Phase 4)**: Must run after US2 (same line modification)
- **User Story 4 (Phase 5)**: Can start immediately - banner removal
- **Polish (Phase 6)**: Depends on US1-US4 completion

### User Story Dependencies

- **User Story 1 (P1)**: Independent - header title change
- **User Story 2 (P1)**: Independent - tab label change (first position)
- **User Story 3 (P1)**: Dependent on US2 - same line edit
- **User Story 4 (P2)**: Independent - banner removal

### Parallel Opportunities

T001, T004 can run in parallel (different lines/sections)
T002 and T003 modify same line - must be sequential
T005 depends on T004 (removing styles for removed element)

---

## Implementation Strategy

### MVP (User Story 1)

1. Complete T001 (header title change)
2. **VALIDATE**: Visual test - header shows "Peaty Meals"
3. Done - minimal viable change

### Single Developer Order

Recommended execution (all in same file):
1. T001 (header title)
2. T002 + T003 (tab labels - single edit)
3. T004 (remove banner JSX)
4. T005 (remove banner styles)
5. T006 (section title)
6. T007 → T014 (verification)

---

## Files Changed Summary

| File | Change Type |
|------|-------------|
| `app/(tabs)/diets.tsx` | MODIFY |

---

## Notes

- This is a minimal UI change (1 file modified)
- No new dependencies required
- No automated tests - manual visual verification
- All changes are text/label updates except banner removal
- Total tasks: 14
- Implementation tasks: 6
- Verification tasks: 8
