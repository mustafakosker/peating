# Tasks: Nutrition Graph Animation

**Input**: Design documents from `/specs/003-nutrition-graph-animation/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Tests**: Manual visual testing only (no automated tests requested)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `components/`, `app/` at repository root
- Paths use repository root as base

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create shared animation hook that both user stories depend on

- [x] T001 Create hooks directory at components/hooks/
- [x] T002 Create useAnimatedProgress hook in components/hooks/useAnimatedProgress.ts with Animated.Value, useFocusEffect, and Easing.out(Easing.cubic) configuration

**Checkpoint**: Animation hook ready - user story implementation can now begin

---

## Phase 2: User Story 1 - View Animated Nutrition Progress (Priority: P1) 🎯 MVP

**Goal**: Animate calories, protein, and carbs indicators from 0 to current values when home screen loads

**Independent Test**: Open home screen and observe all three nutrition indicators (calories, protein, carbs) animate from 0 to their current values within ~1 second

### Implementation for User Story 1

- [x] T003 [P] [US1] Add Animated import and create AnimatedPath component in components/CaloriesCard.tsx
- [x] T004 [P] [US1] Add Animated import and useAnimatedProgress hook import in components/NutritionCard.tsx
- [x] T005 [US1] Implement animated strokeDashoffset using interpolate() in components/CaloriesCard.tsx (depends on T003)
- [x] T006 [US1] Add animated calories number display using addListener pattern in components/CaloriesCard.tsx (depends on T005)
- [x] T007 [US1] Replace progress fill View with Animated.View and animated width in components/NutritionCard.tsx (depends on T004)
- [x] T008 [US1] Add animated current value number display in components/NutritionCard.tsx (depends on T007)
- [x] T009 [US1] Verify all three animations start simultaneously and complete within 800-1200ms

**Checkpoint**: At this point, User Story 1 should be fully functional - all three indicators animate on initial home screen load

---

## Phase 3: User Story 2 - Re-trigger Animation on Screen Focus (Priority: P2)

**Goal**: Replay nutrition animations when user returns to home screen from another tab or app background

**Independent Test**: Navigate away from home to another tab, return to home, and observe animations replay from 0 to current values

### Implementation for User Story 2

- [x] T010 [US2] Verify useFocusEffect in useAnimatedProgress hook resets animation value to 0 on focus in components/hooks/useAnimatedProgress.ts
- [x] T011 [US2] Test navigation: switch to another tab, return to home, confirm animations replay
- [x] T012 [US2] Test app background: background the app, return, confirm animations replay
- [x] T013 [US2] Test rapid navigation: quickly switch tabs back and forth, confirm no visual glitches

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - animations play on load and replay on focus

---

## Phase 4: Polish & Edge Cases

**Purpose**: Handle edge cases and verify all success criteria

- [x] T014 [P] Test 0% edge case: set a nutrition value to 0, verify animation runs without visual glitch
- [x] T015 [P] Test 100% edge case: set nutrition values equal to totals, verify bars fill completely
- [x] T016 Verify animation duration is 1000ms and uses ease-out cubic easing (visually smooth deceleration)
- [x] T017 Verify 60fps performance on device with no stuttering
- [x] T018 Run quickstart.md verification checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup (T001-T002) completion
- **User Story 2 (Phase 3)**: Depends on User Story 1 completion (needs animations working first)
- **Polish (Phase 4)**: Depends on both user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup phase - Core animation implementation
- **User Story 2 (P2)**: Depends on US1 - Tests focus re-trigger behavior

### Within Each User Story

- CaloriesCard and NutritionCard can be updated in parallel (different files)
- SVG arc animation before number display animation
- Progress bar width before number display

### Parallel Opportunities

- T003 and T004 can run in parallel (different component files)
- T014 and T015 can run in parallel (different test scenarios)

---

## Parallel Example: User Story 1

```bash
# Launch CaloriesCard and NutritionCard updates together:
Task: "Add Animated import and create AnimatedPath component in components/CaloriesCard.tsx"
Task: "Add Animated import and useAnimatedProgress hook import in components/NutritionCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (create hook)
2. Complete Phase 2: User Story 1 (animate all 3 indicators)
3. **STOP and VALIDATE**: Test animations on home screen load
4. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup → Hook ready
2. Add User Story 1 → Test independently → Basic animations work (MVP!)
3. Add User Story 2 → Test focus re-trigger → Full feature complete
4. Polish phase → Edge cases handled

### Single Developer Strategy

Recommended execution order:
1. T001 → T002 (Setup)
2. T003 → T005 → T006 (CaloriesCard complete)
3. T004 → T007 → T008 (NutritionCard complete)
4. T009 (Verify US1)
5. T010 → T011 → T012 → T013 (US2)
6. T014-T018 (Polish)

---

## Files Changed Summary

| File | Change Type |
|------|-------------|
| `components/hooks/useAnimatedProgress.ts` | NEW |
| `components/CaloriesCard.tsx` | MODIFY |
| `components/NutritionCard.tsx` | MODIFY |

---

## Notes

- No new dependencies required - uses built-in React Native Animated API
- `useNativeDriver: false` is required for width and SVG animations
- Animation duration: 1000ms (within 800-1200ms spec range)
- Easing: Ease-out cubic for smooth deceleration
- useFocusEffect from expo-router handles screen focus detection
- Total tasks: 18
- Estimated parallelizable: 4 tasks (T003/T004, T014/T015)
