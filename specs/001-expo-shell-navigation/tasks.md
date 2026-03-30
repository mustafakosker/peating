# Tasks: Expo Shell App with Bottom Tab Navigation

**Input**: Design documents from `/specs/001-expo-shell-navigation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Not explicitly requested - tests omitted from task list.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile app (Expo Router)**: `app/` for screens, `components/` for shared components
- Root configuration files: `app.json`, `package.json`, `tsconfig.json`

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create Expo project with tabs template and configure development environment

- [x] T001 Initialize Expo project with tabs template using `npx create-expo-app peating --template tabs`
- [x] T002 Verify project structure matches plan.md layout (app/, components/, assets/)
- [x] T003 [P] Update app.json with app name "Peating" and orientation "default" for portrait/landscape support
- [x] T004 [P] Verify TypeScript configuration in tsconfig.json

---

## Phase 2: Foundational (Tab Navigator Structure)

**Purpose**: Configure the tab navigator with three tabs - MUST complete before implementing individual screens

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Configure root layout in app/_layout.tsx with expo-router Stack
- [x] T006 Configure tab navigator layout in app/(tabs)/_layout.tsx with three tabs: Home (index), Food Log (food-log), Settings (settings)
- [x] T007 Configure tab icons using Ionicons: home/home-outline, restaurant/restaurant-outline, settings/settings-outline in app/(tabs)/_layout.tsx
- [x] T008 Configure tab bar colors: active tint color and inactive tint color in app/(tabs)/_layout.tsx

**Checkpoint**: Tab navigator configured - all three tabs visible with icons, tapping tabs switches screens (even if screens are empty)

---

## Phase 3: User Story 1 - Navigate Between Main Sections (Priority: P1) 🎯 MVP

**Goal**: Users can tap any tab icon and navigate to the corresponding screen

**Independent Test**: Launch app, tap each tab (Home, Food Log, Settings), verify navigation switches screens. Home should be default on launch.

### Implementation for User Story 1

- [x] T009 [P] [US1] Create Home screen component in app/(tabs)/index.tsx with basic View wrapper
- [x] T010 [P] [US1] Create Food Log screen component in app/(tabs)/food-log.tsx with basic View wrapper
- [x] T011 [P] [US1] Create Settings screen component in app/(tabs)/settings.tsx with basic View wrapper
- [x] T012 [US1] Verify Home screen is displayed by default when app launches (index.tsx is default route)
- [x] T013 [US1] Verify tab bar remains visible on all three screens in app/(tabs)/_layout.tsx
- [x] T014 [US1] Test navigation between all three tabs functions correctly

**Checkpoint**: User Story 1 complete - can navigate between all three screens via tab bar, Home is default

---

## Phase 4: User Story 2 - Visual Tab Indicator (Priority: P2)

**Goal**: Active tab is visually highlighted so users always know which screen they're on

**Independent Test**: Navigate to each tab and verify the active tab icon/label has distinct visual styling (filled icon, tinted color) compared to inactive tabs (outlined icon, muted color).

### Implementation for User Story 2

- [x] T015 [US2] Configure focused/unfocused icon states in app/(tabs)/_layout.tsx using Ionicons filled vs outline variants
- [x] T016 [US2] Verify active tab has filled icon (home, restaurant, settings) and inactive tabs have outline icons (home-outline, restaurant-outline, settings-outline)
- [x] T017 [US2] Verify tab label text color changes between active (tinted) and inactive (muted) states

**Checkpoint**: User Story 2 complete - active tab is always visually distinguishable from inactive tabs

---

## Phase 5: User Story 3 - Placeholder Screen Content (Priority: P3)

**Goal**: Each screen displays a clear title so users can confirm they're on the correct screen

**Independent Test**: Navigate to each screen and verify a large, centered title ("Home", "Food Log", "Settings") is visible.

### Implementation for User Story 3

- [x] T018 [P] [US3] Add centered title text "Home" with styles in app/(tabs)/index.tsx
- [x] T019 [P] [US3] Add centered title text "Food Log" with styles in app/(tabs)/food-log.tsx
- [x] T020 [P] [US3] Add centered title text "Settings" with styles in app/(tabs)/settings.tsx
- [x] T021 [US3] Create shared styles (StyleSheet) for screen container and title in each screen file
- [x] T022 [US3] Verify header bar shows screen title in navigation header (configured via tab options)

**Checkpoint**: User Story 3 complete - all screens display clear, visible titles

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T023 Test rapid tab switching (no lag or glitches)
- [x] T024 Test device rotation (tab bar remains visible in landscape)
- [x] T025 Test app background/resume (navigation state preserved)
- [x] T026 Verify app launches within 3 seconds on device/simulator
- [x] T027 Run quickstart.md validation checklist
- [x] T028 Remove any unused template code from create-expo-app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories must proceed in order: US1 → US2 → US3 (each builds on previous)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - creates basic screen shells
- **User Story 2 (P2)**: Depends on US1 - requires screens to exist to show active state
- **User Story 3 (P3)**: Depends on US1 - requires screens to exist to add content

### Within Each User Story

- Screen components can be created in parallel [P] since they're different files
- Integration/verification tasks depend on component tasks completing first

### Parallel Opportunities

**Phase 1 (Setup)**:
```bash
# Can run in parallel:
T003: Update app.json
T004: Verify tsconfig.json
```

**Phase 3 (User Story 1)**:
```bash
# Can run in parallel (different files):
T009: Create Home screen in app/(tabs)/index.tsx
T010: Create Food Log screen in app/(tabs)/food-log.tsx
T011: Create Settings screen in app/(tabs)/settings.tsx
```

**Phase 5 (User Story 3)**:
```bash
# Can run in parallel (different files):
T018: Add title to Home screen
T019: Add title to Food Log screen
T020: Add title to Settings screen
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T008)
3. Complete Phase 3: User Story 1 (T009-T014)
4. **STOP and VALIDATE**: App has working tab navigation with 3 screens
5. Deploy/demo if ready - this is a functional shell app!

### Incremental Delivery

1. Setup + Foundational → Tab structure ready
2. Add User Story 1 → Navigation works → **MVP Complete**
3. Add User Story 2 → Visual polish with active states
4. Add User Story 3 → Screen content visible
5. Polish → Production ready

### Single Developer Flow

Recommended execution order for solo development:

1. T001 → T002 (project creation)
2. T003, T004 in parallel (config files)
3. T005 → T006 → T007 → T008 (tab navigator, sequential)
4. T009, T010, T011 in parallel (create all screens)
5. T012 → T013 → T014 (verify navigation)
6. T015 → T016 → T017 (active tab styling)
7. T018, T019, T020 in parallel (add titles)
8. T021 → T022 (styles and headers)
9. T023-T028 (polish and validation)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- This is a shell app - screens intentionally have minimal content
- expo-router handles navigation state persistence automatically (FR-007)
