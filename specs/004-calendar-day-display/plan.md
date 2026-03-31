# Implementation Plan: Calendar Day Display Fix

**Branch**: `004-calendar-day-display` | **Date**: 2026-03-31 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-calendar-day-display/spec.md`

## Summary

Fix the CalendarWeek component to dynamically calculate and display the current week's dates (Monday-Sunday), highlight today with the primary color (#FF5A16), and ensure uniform horizontal alignment across all day columns by removing conditional padding.

## Technical Context

**Language/Version**: TypeScript 5.x with React Native 0.81
**Primary Dependencies**: React Native (Animated, View, Text, StyleSheet), expo-router
**Storage**: N/A (no persistence required)
**Testing**: Manual visual testing
**Target Platform**: iOS and Android via Expo
**Project Type**: Mobile app
**Performance Goals**: 60fps rendering, instant date calculation
**Constraints**: No external date libraries, use native Date API
**Scale/Scope**: Single component modification

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ No new dependencies added
- ✅ Single file modification
- ✅ Uses existing color constants
- ✅ No architectural changes

## Project Structure

### Documentation (this feature)

```text
specs/004-calendar-day-display/
├── plan.md              # This file
├── research.md          # Date calculation approach
├── quickstart.md        # Implementation guide
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (repository root)

```text
components/
└── CalendarWeek.tsx     # MODIFY - add dynamic dates, fix alignment

constants/
└── Colors.ts            # REFERENCE - use Colors.primary for highlight
```

**Structure Decision**: Single component modification with no new files required.

## Implementation Details

### Current Issues

1. **Static Dates**: Hardcoded array `[8, 9, 10, 11, 12, 13, 14]` instead of dynamic calculation
2. **Misalignment**: Selected day has different padding causing vertical offset
3. **Wrong Highlight**: Uses purple (`accent100`) instead of primary orange

### Solution

1. **Dynamic Date Calculation**:
   - Calculate Monday of current week using `Date.getDay()` and offset
   - Generate 7 dates from Monday to Sunday
   - Compare each date to today for `isToday` flag
   - Compare to today for `isPast` flag

2. **Alignment Fix**:
   - Remove conditional `selectedDayContainer` padding
   - Use fixed-size `dateWrapper` (32x32) for all dates
   - Apply today highlight as background color on wrapper
   - Use `alignItems: 'center'` on parent container

3. **Today Highlight**:
   - Use `Colors.primary` (#FF5A16) for today's circle background
   - White text on the orange circle for contrast
   - Orange text for day abbreviation (Mon, Tue, etc.)

### Key Code Changes

**Type Update**:
```typescript
type DayData = {
  day: string;
  date: number;
  isToday: boolean;  // renamed from isSelected
  isPast: boolean;
};
```

**Date Calculation Function**:
```typescript
function getCurrentWeekDates(): DayData[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

  // Monday offset: if Sunday (0), go back 6 days
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  // Generate 7 days starting from Monday
  // ...
}
```

**Style Changes**:
- Remove `selectedDayContainer` (causes misalignment)
- Add `dateWrapper` with fixed 32x32 dimensions
- Add `todayCircle` with `backgroundColor: Colors.primary`
- Change `alignItems: 'flex-start'` to `alignItems: 'center'`

## Complexity Tracking

No constitution violations. Single file change with minimal complexity.

## Files Changed Summary

| File | Change Type | Description |
|------|-------------|-------------|
| `components/CalendarWeek.tsx` | MODIFY | Add dynamic dates, fix alignment, update highlight color |

## Dependencies

None. Uses built-in JavaScript Date API and React Native components.

## Testing Strategy

1. **Date Accuracy**: Open app on different days, verify correct week
2. **Month Boundary**: Test on March 31 (shows April 1-6)
3. **Alignment**: Visual inspection that all 7 columns align
4. **Highlight**: Verify today has orange (#FF5A16) circle
5. **Past/Future**: Verify muted vs normal text colors
