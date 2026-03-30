# Feature Specification: Temp & Pulse Log

**Feature Branch**: `002-temp-pulse-log`
**Created**: 2026-03-30
**Status**: Draft
**Input**: User description: "i want to add Temp & Pulse log — today's readings with a small trend indicator, tap to add a new reading to home page on top of calories section"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Today's Vitals at a Glance (Priority: P1)

As a health-conscious user, I want to see my current temperature and pulse readings on the home page so I can quickly monitor my vital signs without navigating to a separate screen.

**Why this priority**: This is the core value proposition - users need to see their vitals immediately upon opening the app. Without this, the feature has no value.

**Independent Test**: Can be fully tested by opening the home page and verifying that temperature and pulse readings are displayed prominently above the calories section.

**Acceptance Scenarios**:

1. **Given** the user has recorded vitals today, **When** they open the home page, **Then** they see their most recent temperature and pulse readings displayed in a dedicated section above the calories tracker
2. **Given** the user has no vitals recorded today, **When** they open the home page, **Then** they see placeholder values (e.g., "-- °F" and "-- BPM") with a prompt to add their first reading
3. **Given** the user has multiple readings today, **When** they view the home page, **Then** they see the most recent reading for each vital

---

### User Story 2 - Add New Vital Reading (Priority: P1)

As a user tracking my health, I want to quickly add a new temperature or pulse reading by tapping on the vitals section so I can log my measurements without friction.

**Why this priority**: Input capability is equally critical as viewing - users must be able to record their vitals for the feature to be functional.

**Independent Test**: Can be fully tested by tapping the vitals section, entering values, and confirming the new reading appears.

**Acceptance Scenarios**:

1. **Given** the user is on the home page, **When** they tap the Temp & Pulse section, **Then** a bottom sheet slides up allowing them to enter temperature and/or pulse values
2. **Given** the user is entering a new reading, **When** they submit valid values, **Then** the reading is saved and the home page updates to show the new values
3. **Given** the user is entering a reading, **When** they enter an invalid value (e.g., temperature of 200°F), **Then** they see a validation error and cannot submit until corrected
4. **Given** the user starts adding a reading, **When** they decide to cancel, **Then** they can dismiss the input without saving

---

### User Story 3 - View Trend Indicator (Priority: P2)

As a user monitoring my health over time, I want to see a small trend indicator next to my vitals so I can quickly understand if my readings are stable, increasing, or decreasing compared to recent history.

**Why this priority**: Trend indicators add context and value but are not essential for basic functionality - users can still track vitals without them.

**Independent Test**: Can be tested by recording multiple readings over time and verifying the trend indicator reflects the direction of change.

**Acceptance Scenarios**:

1. **Given** the user has 2 or more readings in the past 24 hours, **When** they view the home page, **Then** a trend indicator (up arrow, down arrow, or stable line) appears next to each vital
2. **Given** the latest reading is higher than the previous reading, **When** viewing the trend indicator, **Then** an upward arrow is displayed
3. **Given** the latest reading is lower than the previous reading, **When** viewing the trend indicator, **Then** a downward arrow is displayed
4. **Given** the latest reading is within 2% of the previous reading, **When** viewing the trend indicator, **Then** a stable/neutral indicator is displayed
5. **Given** the user has only one reading, **When** viewing the home page, **Then** no trend indicator is shown (insufficient data)

---

### Out of Scope (v1)

- Historical readings view / history screen
- Cloud sync or backup
- Wearable/device integration

### Edge Cases

- What happens when the user has readings from previous days but none from today? Display "No readings today" with option to add
- How does the system handle extremely old data? Trend calculations only consider readings from the past 24 hours
- What if the user enters the same value multiple times? Each entry is recorded with timestamp; trend shows no change
- How are readings handled across midnight? "Today" resets at midnight local time; previous day's readings no longer count as "today"

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a Temp & Pulse section on the home page positioned above the calories section
- **FR-002**: System MUST show the most recent temperature reading for today with appropriate unit (°F or °C based on user preference)
- **FR-003**: System MUST show the most recent pulse/heart rate reading for today in BPM (beats per minute)
- **FR-004**: System MUST allow users to add a new reading by tapping on the Temp & Pulse section (opens bottom sheet)
- **FR-005**: System MUST validate temperature input is within reasonable human range (95°F - 108°F / 35°C - 42°C)
- **FR-006**: System MUST validate pulse input is within reasonable human range (30 - 220 BPM)
- **FR-007**: System MUST display a trend indicator showing direction of change when 2+ readings exist within 24 hours
- **FR-008**: System MUST persist all readings with timestamps for historical tracking
- **FR-009**: System MUST display placeholder values when no readings exist for today
- **FR-010**: System MUST allow users to cancel the add reading action without saving
- **FR-011**: System MUST store all vital readings locally on the device (no network required)

### Key Entities

- **Vital Reading**: Represents a single measurement; contains type (temperature/pulse), value, unit, timestamp, and user reference
- **Trend Data**: Derived from comparing the most recent reading to the previous reading; indicates up/down/stable direction

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view their current vitals within 1 second of opening the home page
- **SC-002**: Users can add a new vital reading in under 15 seconds from tap to confirmation
- **SC-003**: Trend indicators accurately reflect the direction of change for 100% of valid reading pairs
- **SC-004**: 95% of users successfully add their first vital reading without errors or confusion
- **SC-005**: The vitals section is visually distinct and noticed by users within 3 seconds of viewing the home page

## Clarifications

### Session 2026-03-30

- Q: What is the data storage strategy for vital readings? → A: Local-only storage (device)
- Q: How should the input interface appear when adding a reading? → A: Bottom sheet (slides up from bottom)
- Q: Should users be able to view their past readings beyond today? → A: No history view (today only, v1 scope)

## Assumptions

- All vital readings are stored locally on the device only (no cloud sync or backup in v1)
- Users are familiar with taking their own temperature and pulse measurements
- Temperature unit preference (°F or °C) will default to Fahrenheit for US locale, Celsius otherwise
- Readings are entered manually by the user (no device/wearable integration in this version)
- The existing home page layout can accommodate a new section above the calories tracker
- No historical view of past readings in v1; users only see today's most recent values (history screen is a future enhancement)
- Single user per device - no multi-user support required for vitals
