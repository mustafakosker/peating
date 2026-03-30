# Tasks: Temp & Pulse Log

**Input**: Design documents from `/specs/002-temp-pulse-log/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not explicitly requested in spec - test tasks omitted.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths included in descriptions

## Path Conventions

- **Mobile app (Expo)**: `app/`, `components/`, `services/`, `types/`
- Based on plan.md structure for this React Native/Expo project

---

## Phase 1: Setup (Dependencies & Configuration)

**Purpose**: Install dependencies and configure project for bottom sheet and storage

- [x] T001 Install dependencies: @react-native-async-storage/async-storage @gorhom/bottom-sheet react-native-reanimated react-native-gesture-handler
- [x] T002 Add react-native-reanimated/plugin to babel.config.js
- [x] T003 Create types directory at types/
- [x] T004 Create services directory at services/

---

## Phase 2: Foundational (Core Types & Storage)

**Purpose**: Create shared types and storage service that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 [P] Create VitalReading and TrendDirection types in types/vitals.ts
- [x] T006 [P] Add GestureHandlerRootView wrapper in app/_layout.tsx
- [x] T007 Create vitalsService with saveReading and getReadings functions in services/vitalsService.ts
- [x] T008 Add getTodaysReadings and getLatestByType functions to services/vitalsService.ts
- [x] T009 Add validateTemperature and validatePulse functions to services/vitalsService.ts

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - View Today's Vitals at a Glance (Priority: P1)

**Goal**: Display current temperature and pulse readings on home page above calories section

**Independent Test**: Open home page and verify temperature and pulse readings displayed prominently above CaloriesCard section

### Implementation for User Story 1

- [x] T010 [P] [US1] Create VitalsCard component skeleton in components/VitalsCard.tsx
- [x] T011 [US1] Implement VitalsCard display layout with temperature and pulse rows in components/VitalsCard.tsx
- [x] T012 [US1] Add empty state (placeholder values) rendering to VitalsCard when no readings exist in components/VitalsCard.tsx
- [x] T013 [US1] Export VitalsCard from components/index.ts
- [x] T014 [US1] Import and add VitalsCard above CaloriesCard section in app/(tabs)/index.tsx
- [x] T015 [US1] Connect VitalsCard to vitalsService.getLatestByType for live data in app/(tabs)/index.tsx

**Checkpoint**: User Story 1 complete - vitals display visible on home page with placeholder or real values

---

## Phase 4: User Story 2 - Add New Vital Reading (Priority: P1)

**Goal**: Allow users to add temperature and pulse readings via bottom sheet

**Independent Test**: Tap VitalsCard, enter values in bottom sheet, submit, verify new reading appears on home page

### Implementation for User Story 2

- [x] T016 [P] [US2] Create AddVitalSheet component skeleton with bottom sheet setup in components/AddVitalSheet.tsx
- [x] T017 [US2] Add temperature input field with unit toggle (F/C) to AddVitalSheet in components/AddVitalSheet.tsx
- [x] T018 [US2] Add pulse input field (BPM) to AddVitalSheet in components/AddVitalSheet.tsx
- [x] T019 [US2] Add validation error display for invalid values in components/AddVitalSheet.tsx
- [x] T020 [US2] Add Save and Cancel buttons with handlers in components/AddVitalSheet.tsx
- [x] T021 [US2] Connect AddVitalSheet to vitalsService.saveReading in components/AddVitalSheet.tsx
- [x] T022 [US2] Export AddVitalSheet from components/index.ts
- [x] T023 [US2] Add bottom sheet ref and presentation logic to home screen in app/(tabs)/index.tsx
- [x] T024 [US2] Wire VitalsCard onPress to open AddVitalSheet in app/(tabs)/index.tsx
- [x] T025 [US2] Refresh VitalsCard data after successful save in app/(tabs)/index.tsx

**Checkpoint**: User Story 2 complete - users can add readings and see them appear immediately

---

## Phase 5: User Story 3 - View Trend Indicator (Priority: P2)

**Goal**: Show trend arrows (up/down/stable) next to vitals when 2+ readings exist

**Independent Test**: Record 2+ readings, verify trend indicator appears and reflects direction of change

### Implementation for User Story 3

- [x] T026 [US3] Add calculateTrend function with 2% tolerance to services/vitalsService.ts
- [x] T027 [US3] Add getTrendForType function to services/vitalsService.ts
- [x] T028 [US3] Add trend indicator icons (up/down/stable arrows) to VitalsCard in components/VitalsCard.tsx
- [x] T029 [US3] Connect trend indicators to vitalsService.getTrendForType in app/(tabs)/index.tsx
- [x] T030 [US3] Handle "none" trend state (single reading, no indicator shown) in components/VitalsCard.tsx

**Checkpoint**: User Story 3 complete - trend indicators visible when sufficient data exists

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and edge case handling

- [x] T031 Add temperature unit preference detection based on device locale in services/vitalsService.ts
- [x] T032 Add "Tap to add" hint text to VitalsCard empty state in components/VitalsCard.tsx
- [x] T033 Verify all readings persist after app restart
- [x] T034 Run quickstart.md testing checklist to verify all acceptance scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational - view vitals display
- **User Story 2 (Phase 4)**: Depends on Foundational - can run in parallel with US1 if desired
- **User Story 3 (Phase 5)**: Depends on US1 (VitalsCard exists) and US2 (readings can be added)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational - No dependencies on other stories
- **User Story 2 (P1)**: After Foundational - Integrates with US1 (VitalsCard tappable) but can be developed in parallel
- **User Story 3 (P2)**: After US1 + US2 - Requires both display and input capabilities

### Within Each User Story

- Components before integration
- Service layer before UI connection
- Core implementation before polish

### Parallel Opportunities

**Phase 2 (Foundational)**:
- T005 and T006 can run in parallel (different files)

**Phase 3 (User Story 1)**:
- T010 can run immediately once Foundational completes

**Phase 4 (User Story 2)**:
- T016 can start once Foundational completes (parallel with US1 if desired)

---

## Parallel Example: Foundational Phase

```bash
# These can run in parallel (different files):
Task T005: "Create VitalReading and TrendDirection types in types/vitals.ts"
Task T006: "Add GestureHandlerRootView wrapper in app/_layout.tsx"
```

## Parallel Example: Early User Story Work

```bash
# After Foundational completes, US1 and US2 skeleton work can start together:
Task T010: "Create VitalsCard component skeleton in components/VitalsCard.tsx"
Task T016: "Create AddVitalSheet component skeleton in components/AddVitalSheet.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 + 2)

1. Complete Phase 1: Setup (dependencies)
2. Complete Phase 2: Foundational (types, storage service)
3. Complete Phase 3: User Story 1 (view vitals)
4. Complete Phase 4: User Story 2 (add readings)
5. **STOP and VALIDATE**: Can view and add vitals - core feature works
6. Deploy/demo MVP

### Incremental Delivery

1. Setup + Foundational → Infrastructure ready
2. User Story 1 → View vitals (display only with placeholders)
3. User Story 2 → Add readings (full input functionality)
4. User Story 3 → Trend indicators (enhanced context)
5. Polish → Locale detection, final touches

---

## Summary

| Metric | Value |
|--------|-------|
| Total Tasks | 34 |
| Setup Tasks | 4 |
| Foundational Tasks | 5 |
| User Story 1 Tasks | 6 |
| User Story 2 Tasks | 10 |
| User Story 3 Tasks | 5 |
| Polish Tasks | 4 |
| Parallelizable Tasks | 5 |

**MVP Scope**: User Stories 1 + 2 (view and add vitals)

**Notes**:
- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
