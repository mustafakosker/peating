# Tasks: PUFA and Ca:P Ratio Metric Cards

**Input**: Design documents from `/specs/005-pufa-cap-ratio-cards/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Tests**: Manual visual testing only (no automated tests requested)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile app**: `components/`, `app/(tabs)/` at repository root
- Paths use repository root as base

---

## Phase 1: Setup

**Purpose**: Verify existing patterns and design system components

- [x] T001 Verify NutritionCard component pattern exists in components/NutritionCard.tsx
- [x] T002 Verify Colors constants are available in constants/Colors.ts (accent200, accent300, primary)

**Checkpoint**: Ready for component implementation

---

## Phase 2: User Story 1 - View Ca:P Ratio Status (Priority: P1) 🎯 MVP

**Goal**: Display Ca:P ratio card with calcium/phosphorus values, computed ratio, and color-coded status indicator

**Independent Test**: Open home screen and verify Ca:P ratio card displays with gauge, mg values, and correct color coding based on ratio value

### Implementation for User Story 1

- [x] T003 [P] [US1] Create CaPRatioCard component file at components/CaPRatioCard.tsx
- [x] T004 [US1] Define CaPRatioCardProps type with calcium, phosphorus, and onPress in components/CaPRatioCard.tsx
- [x] T005 [US1] Implement getStatusColor function for ratio color coding (green ≥1:1, yellow 0.7-0.99, red <0.7) in components/CaPRatioCard.tsx
- [x] T006 [US1] Implement ratio calculation and formatting (X.X:1 format with toFixed(1)) in components/CaPRatioCard.tsx
- [x] T007 [US1] Add TouchableOpacity wrapper with activeOpacity for tap feedback in components/CaPRatioCard.tsx
- [x] T008 [US1] Add icon container with Ionicons nutrition-outline icon in components/CaPRatioCard.tsx
- [x] T009 [US1] Add ratio display with status indicator circle in components/CaPRatioCard.tsx
- [x] T010 [US1] Add calcium and phosphorus mg value display in components/CaPRatioCard.tsx
- [x] T011 [US1] Style component to match NutritionCard (173px height, 24px border radius, white background) in components/CaPRatioCard.tsx
- [x] T012 [US1] Handle edge case: display "N/A" when phosphorus is zero in components/CaPRatioCard.tsx
- [x] T013 [US1] Test Ca:P card with different ratio values to verify color coding (green/yellow/red)

**Checkpoint**: At this point, CaPRatioCard component is complete and can be tested independently

---

## Phase 3: User Story 2 - View PUFA Intake Status (Priority: P1)

**Goal**: Display PUFA intake card with progress bar showing grams consumed vs daily limit with color-coded status

**Independent Test**: Open home screen and verify PUFA card displays with progress bar, gram values, and correct color coding based on intake percentage

### Implementation for User Story 2

- [x] T014 [P] [US2] Create PUFACard component file at components/PUFACard.tsx
- [x] T015 [US2] Define PUFACardProps type with current, limit, and onPress in components/PUFACard.tsx
- [x] T016 [US2] Implement getStatusColor function for percentage color coding (green <80%, yellow 80-100%, red >100%) in components/PUFACard.tsx
- [x] T017 [US2] Implement percentage calculation and progress bar width capping at 100% in components/PUFACard.tsx
- [x] T018 [US2] Add TouchableOpacity wrapper with activeOpacity for tap feedback in components/PUFACard.tsx
- [x] T019 [US2] Add icon container with Ionicons water-outline icon in components/PUFACard.tsx
- [x] T020 [US2] Add progress bar with dynamic width and status color in components/PUFACard.tsx
- [x] T021 [US2] Add current/limit gram value display below progress bar in components/PUFACard.tsx
- [x] T022 [US2] Style component to match NutritionCard (173px height, 24px border radius, white background) in components/PUFACard.tsx
- [x] T023 [US2] Test PUFA card with different intake values to verify color coding (green/yellow/red)

**Checkpoint**: At this point, PUFACard component is complete and can be tested independently

---

## Phase 4: User Story 3 - Remove Calories Card and Integrate New Cards (Priority: P1)

**Goal**: Remove CaloriesCard from home screen and add new Ca:P and PUFA cards in a row above carbs/protein

**Independent Test**: Open home screen and verify CaloriesCard is removed, new cards are displayed in row above carbs/protein

### Implementation for User Story 3

- [x] T024 [US3] Remove CaloriesCard import from app/(tabs)/index.tsx
- [x] T025 [US3] Add CaPRatioCard import to app/(tabs)/index.tsx
- [x] T026 [US3] Add PUFACard import to app/(tabs)/index.tsx
- [x] T027 [US3] Remove CaloriesCard component usage from "Track Your Fuel" section in app/(tabs)/index.tsx
- [x] T028 [US3] Add new nutritionRow View with CaPRatioCard and PUFACard in "Track Your Fuel" section in app/(tabs)/index.tsx
- [x] T029 [US3] Pass hardcoded placeholder data to CaPRatioCard (calcium: 800, phosphorus: 700) in app/(tabs)/index.tsx
- [x] T030 [US3] Pass hardcoded placeholder data to PUFACard (current: 6, limit: 10) in app/(tabs)/index.tsx
- [x] T031 [US3] Verify layout: new cards row above existing carbs/protein row in app/(tabs)/index.tsx
- [x] T032 [US3] Verify CaloriesCard no longer appears on home screen

**Checkpoint**: At this point, all three user stories are complete - home screen has new layout

---

## Phase 5: Polish & Verification

**Purpose**: Final testing and edge case verification

- [x] T033 [P] Test tap feedback on both new cards (opacity change on press)
- [x] T034 [P] Test layout on different device sizes (no overflow or truncation)
- [x] T035 Verify all status color thresholds work correctly by modifying placeholder values
- [x] T036 Run quickstart.md verification checklist
- [x] T037 TypeScript compilation check (npx tsc --noEmit)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - verification only (already complete)
- **User Story 1 (Phase 2)**: Can start immediately - creates CaPRatioCard component
- **User Story 2 (Phase 3)**: Can run in parallel with US1 (different file)
- **User Story 3 (Phase 4)**: Depends on US1 and US2 completion (needs both cards)
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: CaPRatioCard - independent, no dependencies
- **User Story 2 (P1)**: PUFACard - independent, no dependencies
- **User Story 3 (P1)**: Home screen integration - depends on US1 and US2

### Within Each User Story

- Type definitions before implementation
- Core logic before styling
- Component complete before integration

### Parallel Opportunities

- T003 and T014 can run in parallel (different component files)
- T033 and T034 can run in parallel (different test scenarios)
- US1 and US2 can be implemented in parallel (different files)

---

## Parallel Example: User Story 1 & 2

```bash
# Launch both card components in parallel:
Task: "Create CaPRatioCard component file at components/CaPRatioCard.tsx"
Task: "Create PUFACard component file at components/PUFACard.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1. Complete Phase 1: Setup (verification - already done)
2. Complete Phase 2: User Story 1 (CaPRatioCard)
3. Complete Phase 3: User Story 2 (PUFACard) - can run in parallel
4. **STOP and VALIDATE**: Test both cards in isolation
5. Continue with US3 integration

### Full Feature

1. Complete US1 + US2 in parallel → Both cards ready
2. Complete US3 → Home screen integration
3. Polish phase → Final verification

### Single Developer Strategy

Recommended execution order:
1. T001 → T002 (Setup verification - done)
2. T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 (CaPRatioCard)
3. T014 → T015 → T016 → T017 → T018 → T019 → T020 → T021 → T022 → T023 (PUFACard)
4. T024 → T025 → T026 → T027 → T028 → T029 → T030 → T031 → T032 (Integration)
5. T033 → T034 → T035 → T036 → T037 (Polish)

---

## Files Changed Summary

| File | Change Type |
|------|-------------|
| `components/CaPRatioCard.tsx` | CREATE |
| `components/PUFACard.tsx` | CREATE |
| `app/(tabs)/index.tsx` | MODIFY |

---

## Notes

- No new dependencies required
- Uses existing Ionicons and Colors constants
- Cards follow NutritionCard design pattern (173px height, rounded corners, icons)
- Hardcoded placeholder data for now (no backend integration)
- Total tasks: 37
- Setup tasks: 2 (already verified)
- User Story 1 tasks: 11 (CaPRatioCard)
- User Story 2 tasks: 10 (PUFACard)
- User Story 3 tasks: 9 (Integration)
- Polish tasks: 5
- Parallel opportunities: US1 and US2 can run in parallel (different files)
