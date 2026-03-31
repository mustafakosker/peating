# Feature Specification: Header Profile Update

**Feature Branch**: `007-header-profile-update`
**Created**: 2026-03-31
**Status**: Draft
**Input**: User description: "remove good morning from top Add Peating title there, use profile picture on top left corner"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View App Branding in Header (Priority: P1) MVP

Users see the app name "Peating" prominently displayed in the header when they open the home screen, creating consistent brand identity across the app.

**Why this priority**: The app title is the primary visual change requested and establishes brand identity. This is the core requirement.

**Independent Test**: Open the app home screen and verify "Peating" title is displayed in the header instead of "Good Morning".

**Acceptance Scenarios**:

1. **Given** the user opens the app, **When** the home screen loads, **Then** the header displays "Peating" as the title
2. **Given** the user is on the home screen, **When** they view the header, **Then** no greeting text (e.g., "Good Morning") is visible

---

### User Story 2 - Profile Picture in Header (Priority: P1)

Users see their profile picture displayed in the top left corner of the header, providing quick visual identification and access to profile features.

**Why this priority**: Profile picture placement is explicitly requested and maintains user personalization in the header.

**Independent Test**: Open the app and verify the profile picture (or placeholder) appears in the top left corner of the header.

**Acceptance Scenarios**:

1. **Given** the user has a profile picture set, **When** they view the home screen header, **Then** their profile picture is displayed in the top left corner
2. **Given** the user has no profile picture, **When** they view the home screen header, **Then** a default placeholder icon is displayed in the top left corner
3. **Given** the user is on any screen with the header, **When** they view the header, **Then** the profile picture position remains consistent in the top left

---

### Edge Cases

- What happens when the profile picture fails to load? Display placeholder icon.
- What happens if the "Peating" title is too long for certain screen sizes? Title should be styled to fit without truncation on standard mobile screens.
- What happens when the user scrolls? Header maintains its position and appearance.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display "Peating" as the header title instead of any greeting text
- **FR-002**: System MUST remove the "Good Morning" greeting from the header completely
- **FR-003**: System MUST display the user's profile picture in the top left corner of the header
- **FR-004**: System MUST display a placeholder icon when no profile picture is available
- **FR-005**: System MUST maintain existing header action buttons (notifications, diamond icon) on the right side
- **FR-006**: System MUST ensure the header layout is visually balanced with profile picture on left and title prominently displayed

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of home screen views display "Peating" title in the header
- **SC-002**: Profile picture or placeholder is visible in header on all supported device sizes
- **SC-003**: Header renders completely within 100ms of screen load
- **SC-004**: Users can identify the app brand immediately upon opening (title visible within first viewport)

## Assumptions

- Existing avatar/profile picture functionality in HeaderBar will be reused
- The "Peating" title styling should follow the existing app typography and color scheme
- No changes to the notification or diamond action buttons are required
- The layout change is limited to the home screen header (HeaderBar component)
- Profile picture tapping behavior (if any) remains unchanged from current implementation
