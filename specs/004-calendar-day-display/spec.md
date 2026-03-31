# Feature Specification: Calendar Day Display Fix

**Feature Branch**: `004-calendar-day-display`
**Created**: 2026-03-31
**Status**: Draft
**Input**: User description: "i want top calendar to show correct day of month with primary color highlights today. all days should be aligned horizontally at the same level"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Current Week with Today Highlighted (Priority: P1)

As a user viewing the home screen, I want to see the current week's calendar with the correct days of the month displayed dynamically, with today visually highlighted using the primary color, so that I can quickly identify the current date and track my nutrition progress in context.

**Why this priority**: This is the core feature request - displaying accurate, real-time date information is essential for a calendar component to be functional and useful.

**Independent Test**: Can be fully tested by opening the home screen on any date and verifying that:
1. The displayed week contains the correct days of the month
2. Today's date is highlighted with the primary color
3. The correct day abbreviation (Mon, Tue, etc.) matches each date number

**Acceptance Scenarios**:

1. **Given** the user opens the home screen, **When** the calendar week loads, **Then** the calendar displays the current week with correct day-of-month numbers
2. **Given** it is Monday March 31st, **When** viewing the calendar, **Then** Monday shows "31" and the week continues with April 1, 2, 3, 4, 5, 6
3. **Given** the current date is visible in the week view, **When** observing the calendar, **Then** today's date is highlighted with the primary color (#FF5A16)
4. **Given** the user views the calendar on different days, **When** the date changes, **Then** the highlight moves to reflect the new current day

---

### User Story 2 - Uniform Horizontal Alignment (Priority: P1)

As a user viewing the calendar week, I want all day columns to be aligned at the same horizontal level regardless of which day is selected, so that the calendar appears visually consistent and professional.

**Why this priority**: Visual alignment is explicitly requested and directly impacts the user experience and app polish.

**Independent Test**: Can be tested by viewing the calendar and verifying all day labels and date numbers are vertically aligned across all columns.

**Acceptance Scenarios**:

1. **Given** the calendar displays the week, **When** comparing any two day columns, **Then** the day abbreviations (Mon, Tue, etc.) are at the same vertical position
2. **Given** the calendar displays the week, **When** comparing any two day columns, **Then** the date numbers are at the same vertical position
3. **Given** today is highlighted, **When** observing the highlighted day versus non-highlighted days, **Then** the highlight styling does not cause vertical misalignment

---

### Out of Scope (v1)

- Week navigation (previous/next week buttons)
- Date selection (tapping to select a specific date)
- Month/year display
- Integration with nutrition data for specific dates

### Edge Cases

- What happens at month boundaries? The calendar should correctly show dates spanning two months (e.g., March 30, 31, April 1, 2, 3, 4, 5)
- What happens on the first day of the week? The week should start on Monday and end on Sunday
- How does the calendar handle single-digit vs double-digit dates? Both should be displayed consistently without layout shifts

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the current week (Monday through Sunday) with accurate day-of-month numbers
- **FR-002**: System MUST dynamically calculate dates based on the device's current date
- **FR-003**: System MUST highlight today's date using the primary color (#FF5A16)
- **FR-004**: System MUST display correct day abbreviations (Mon, Tue, Wed, Thu, Fri, Sat, Sun) matching their corresponding dates
- **FR-005**: System MUST align all day columns horizontally at the same level (day labels aligned, date numbers aligned)
- **FR-006**: System MUST handle month boundaries correctly when the week spans two months
- **FR-007**: Past days (before today) MUST be visually distinguished from future days with appropriate styling
- **FR-008**: Today's highlight MUST NOT affect the vertical alignment of the calendar row

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Calendar displays the correct current date 100% of the time when the app is opened
- **SC-002**: All 7 day columns are vertically aligned with less than 1 pixel variance
- **SC-003**: Today's date is immediately identifiable by its primary color highlight
- **SC-004**: Month boundary transitions display correctly (verified by testing on last/first days of months)
- **SC-005**: Calendar renders correctly on all supported device sizes without layout overflow or truncation

## Assumptions

- The week starts on Monday and ends on Sunday (ISO week format)
- The device's system date/time is used as the source of truth for the current date
- The existing CalendarWeek component structure will be enhanced rather than replaced
- Primary color (#FF5A16) is already defined in the app's color constants
- No timezone conversion is required - local device time is used
