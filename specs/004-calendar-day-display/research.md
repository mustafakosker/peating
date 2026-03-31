# Research: Calendar Day Display Fix

**Feature**: 004-calendar-day-display
**Date**: 2026-03-31

## Current Implementation Analysis

### CalendarWeek Component (`components/CalendarWeek.tsx`)

**Current State**:
- Uses hardcoded static array of dates (lines 11-19)
- Dates are fixed: Mon 8, Tue 9, Wed 10, Thu 11, Fri 12, Sat 13, Sun 14
- `isSelected` is hardcoded to Thursday (date 11)
- No dynamic date calculation

**Alignment Issue**:
- `selectedDayContainer` style adds extra padding (`paddingVertical: 8`, `paddingHorizontal: 8`) causing vertical misalignment
- Selected day has `gap: 13` vs non-selected `gap: 16`
- Container uses `alignItems: 'flex-start'` which doesn't enforce uniform alignment

### Color Constants (`constants/Colors.ts`)

- Primary color: `#FF5A16` (orange) - to be used for today's highlight
- Background: `#121212` (dark)
- `accent100`: `#DDC0FF` (purple) - currently used for selected day background

## Technical Approach

### Date Calculation Strategy

Use JavaScript's native Date API:

```typescript
function getCurrentWeekDates(): DayData[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

  // Calculate Monday of current week
  // If today is Sunday (0), go back 6 days; otherwise go back (dayOfWeek - 1) days
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const days: DayData[] = [];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const isToday = date.toDateString() === today.toDateString();
    const isPast = date < today && !isToday;

    days.push({
      day: dayNames[i],
      date: date.getDate(),
      isToday,
      isPast,
    });
  }

  return days;
}
```

### Alignment Fix Strategy

1. Remove conditional padding from selected day container
2. Use uniform structure for all days:
   - Fixed height containers for day labels and date numbers
   - Today's highlight as a colored circle behind the date (not changing container size)
3. Use `alignItems: 'center'` on parent container

### Styling Changes

**Today Highlight**:
- Use `Colors.primary` (#FF5A16) for the highlight circle
- Apply to the date circle, not the entire day container
- Keep text white for contrast

**Past Days**:
- Use `Colors.gray300` (#474747) for muted appearance

**Future Days**:
- Use `Colors.gray300` (#474747) as currently implemented

## Dependencies

- No new dependencies required
- Uses React Native's built-in components
- Uses JavaScript's native Date API

## Edge Cases

1. **Month Boundaries**: `getDate()` handles this automatically - returns correct day of month
2. **Single vs Double Digit Dates**: Both should display with same alignment (handled by fixed-width containers)
3. **Year Boundaries**: Date API handles year transitions automatically

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Timezone issues | Use local device time only, no timezone conversion |
| Date calculation errors at boundaries | Test on month-end dates |
| Layout shift on different screen sizes | Use fixed dimensions for alignment-critical elements |

## Files to Modify

| File | Change |
|------|--------|
| `components/CalendarWeek.tsx` | Replace static dates with dynamic calculation, fix alignment |

## Verification Plan

1. Open app on different dates to verify correct week display
2. Test month boundary (e.g., March 31 showing April 1-6)
3. Visual inspection of alignment across all 7 days
4. Test on multiple device sizes
