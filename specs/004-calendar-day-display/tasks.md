# Tasks: Calendar Day Display Fix

**Input**: Design documents from `/specs/004-calendar-day-display/`
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

## Phase 1: Setup

**Purpose**: No setup required - modifying existing component

- [x] T001 Verify existing CalendarWeek component structure in components/CalendarWeek.tsx
- [x] T002 Confirm Colors.primary (#FF5A16) is available in constants/Colors.ts

**Checkpoint**: Ready for implementation

---

## Phase 2: User Story 1 - View Current Week with Today Highlighted (Priority: P1) 🎯 MVP

**Goal**: Display the current week with correct day-of-month numbers and highlight today with the primary color

**Independent Test**: Open home screen on any date and verify that:
1. The displayed week contains the correct days of the month (Mon-Sun)
2. Today's date is highlighted with orange (#FF5A16)
3. The correct day abbreviation matches each date number

### Implementation for User Story 1

- [x] T003 [US1] Update DayData type to use `isToday: boolean` instead of `isSelected` in components/CalendarWeek.tsx
- [x] T004 [US1] Create getCurrentWeekDates() function to calculate Monday-Sunday dates in components/CalendarWeek.tsx
- [x] T005 [US1] Replace static days array with dynamic getCurrentWeekDates() call in components/CalendarWeek.tsx
- [x] T006 [US1] Update styles to use Colors.primary for today's highlight circle in components/CalendarWeek.tsx
- [x] T007 [US1] Update day text styling to show today's day abbreviation in primary color in components/CalendarWeek.tsx
- [x] T008 [US1] Update isPast logic to compare dates correctly for past day styling in components/CalendarWeek.tsx
- [x] T009 [US1] Test month boundary: verify March 31 shows correct week with April dates

**Checkpoint**: At this point, User Story 1 should be fully functional - dynamic dates with today highlighted

---

## Phase 3: User Story 2 - Uniform Horizontal Alignment (Priority: P1)

**Goal**: Ensure all day columns are aligned at the same horizontal level regardless of which day is today

**Independent Test**: View the calendar and verify all day labels and date numbers are vertically aligned across all columns

### Implementation for User Story 2

- [x] T010 [US2] Remove selectedDayContainer style that causes misalignment in components/CalendarWeek.tsx
- [x] T011 [US2] Add fixed-size dateWrapper style (32x32) for all dates in components/CalendarWeek.tsx
- [x] T012 [US2] Update container alignItems from 'flex-start' to 'center' in components/CalendarWeek.tsx
- [x] T013 [US2] Add minWidth to dayContainer for consistent column widths in components/CalendarWeek.tsx
- [x] T014 [US2] Remove conditional rendering (ternary) - use same structure for all days in components/CalendarWeek.tsx
- [x] T015 [US2] Verify single and double-digit dates align properly (test with dates 1-9 and 10-31)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - dynamic dates, today highlighted, all aligned

---

## Phase 4: Polish & Verification

**Purpose**: Final testing and edge case verification

- [x] T016 [P] Test on different dates by changing device date settings
- [x] T017 [P] Test week starting on Sunday edge case (should calculate Monday correctly)
- [x] T018 Verify 60fps rendering performance with no visual jank
- [x] T019 Run quickstart.md verification checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - verification only
- **User Story 1 (Phase 2)**: Depends on Setup completion
- **User Story 2 (Phase 3)**: Can run in parallel with US1 (same file but different concerns)
- **Polish (Phase 4)**: Depends on both user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Dynamic date calculation and today highlight
- **User Story 2 (P1)**: Alignment fix - technically independent but same file

**Note**: Both user stories are P1 and modify the same file (CalendarWeek.tsx). Recommended to implement sequentially to avoid conflicts.

### Within Each User Story

- Type changes before function implementations
- Logic changes before style changes
- Core implementation before edge case handling

### Parallel Opportunities

- T016 and T017 can run in parallel (different test scenarios)
- Setup tasks T001 and T002 can verify in parallel (already complete)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verification)
2. Complete Phase 2: User Story 1 (dynamic dates + today highlight)
3. **STOP and VALIDATE**: Test dynamic dates work correctly
4. Demo if ready

### Full Feature

1. Complete Setup → Verification done
2. Complete User Story 1 → Dynamic dates with highlight
3. Complete User Story 2 → Perfect alignment
4. Polish phase → Edge cases handled

### Single Developer Strategy

Recommended execution order:
1. T001 → T002 (Setup verification - already done)
2. T003 → T004 → T005 (Type + function + integration)
3. T006 → T007 → T008 (Styling updates)
4. T009 (US1 verification)
5. T010 → T011 → T012 → T013 → T014 (Alignment fixes)
6. T015 (US2 verification)
7. T016 → T017 → T018 → T019 (Polish)

---

## Files Changed Summary

| File | Change Type |
|------|-------------|
| `components/CalendarWeek.tsx` | MODIFY |

---

## Notes

- No new dependencies required - uses built-in JavaScript Date API
- Single file modification keeps changes localized
- Both user stories are P1 - implement together as MVP
- Device date is source of truth (no timezone handling needed)
- Week starts Monday, ends Sunday (ISO format)
- Total tasks: 19
- Setup tasks: 2 (already complete from research)
- User Story 1 tasks: 7
- User Story 2 tasks: 6
- Polish tasks: 4
- Parallel opportunities: 2 pairs (T001/T002, T016/T017)
