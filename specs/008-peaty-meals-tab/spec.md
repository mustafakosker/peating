# Feature Specification: Peaty Meals Tab Redesign

**Feature Branch**: `008-peaty-meals-tab`
**Created**: 2026-03-31
**Status**: Draft
**Input**: User description: "diets tab becomes Peaty Meals, and sub tabs becomes Recommended and Favorite no explore diet plans banner at top"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Peaty Meals Tab (Priority: P1) MVP

Users navigate to the meals section and see "Peaty Meals" as the tab title instead of "Diets", providing clearer branding aligned with the app name.

**Why this priority**: The header title change is the primary visual rebrand and establishes the new naming convention for the feature.

**Independent Test**: Open the app, navigate to the meals tab, and verify the header displays "Peaty Meals" instead of "Diets".

**Acceptance Scenarios**:

1. **Given** the user opens the app, **When** they navigate to the meals tab, **Then** the header displays "Peaty Meals" as the title
2. **Given** the user is on the meals tab, **When** they view the header, **Then** no text containing "Diets" is visible in the header

---

### User Story 2 - Browse Recommended Meals (Priority: P1)

Users can view a curated list of recommended meal plans by selecting the "Recommended" sub-tab, which replaces the previous "All Diets" tab.

**Why this priority**: The Recommended tab is the default view and primary discovery method for meal plans.

**Independent Test**: Open the meals tab and verify the first sub-tab is labeled "Recommended" and displays meal cards when selected.

**Acceptance Scenarios**:

1. **Given** the user is on the Peaty Meals tab, **When** they view the sub-tabs, **Then** they see "Recommended" as the first tab option
2. **Given** the user selects the "Recommended" tab, **When** the content loads, **Then** they see a list of recommended meal plans
3. **Given** the user is on the Peaty Meals tab, **When** it loads initially, **Then** the "Recommended" tab is selected by default

---

### User Story 3 - View Favorite Meals (Priority: P1)

Users can view their saved/favorite meal plans by selecting the "Favorite" sub-tab, which replaces the previous "My Diets" tab.

**Why this priority**: Users need to access their personalized collection of saved meals.

**Independent Test**: Select the "Favorite" sub-tab and verify it displays the user's saved meal plans.

**Acceptance Scenarios**:

1. **Given** the user is on the Peaty Meals tab, **When** they view the sub-tabs, **Then** they see "Favorite" as the second tab option
2. **Given** the user selects the "Favorite" tab, **When** the content loads, **Then** they see their saved/favorite meal plans
3. **Given** the user has no favorite meals saved, **When** they view the Favorite tab, **Then** they see an appropriate empty state

---

### User Story 4 - Clean Layout Without Banner (Priority: P2)

Users see a cleaner, more focused layout with the promotional "Explore Diet Plans" banner removed from the top of the screen.

**Why this priority**: Removing the banner simplifies the UI and puts focus on the meal content.

**Independent Test**: Open the Peaty Meals tab and verify no promotional banner is displayed at the top.

**Acceptance Scenarios**:

1. **Given** the user navigates to the Peaty Meals tab, **When** the screen loads, **Then** no "Explore Diet Plans" banner is visible
2. **Given** the user is on the Peaty Meals tab, **When** they view the content area, **Then** the meal list appears directly below the tab switcher

---

### Edge Cases

- What happens when the Recommended list is empty? Display appropriate empty state message.
- What happens when the Favorite list is empty? Display message encouraging user to save meals.
- What happens when meal images fail to load? Display placeholder image.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display "Peaty Meals" as the header title instead of "Diets"
- **FR-002**: System MUST display "Recommended" as the first sub-tab label instead of "All Diets"
- **FR-003**: System MUST display "Favorite" as the second sub-tab label instead of "My Diets"
- **FR-004**: System MUST remove the "Explore Diet Plans" banner from the top of the screen
- **FR-005**: System MUST show the "Recommended" tab as selected by default when the screen loads
- **FR-006**: System MUST preserve the existing meal card display functionality
- **FR-007**: System MUST update the section title from "Diets" to "Meals" in the content area

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of views display "Peaty Meals" header title instead of "Diets"
- **SC-002**: Tab switcher displays exactly two options: "Recommended" and "Favorite"
- **SC-003**: No "Explore Diet Plans" banner is visible on the screen
- **SC-004**: Users can switch between Recommended and Favorite tabs within 1 tap
- **SC-005**: Screen loads and displays content within existing performance standards

## Assumptions

- Existing meal/diet card component will be reused without modification
- The underlying data structure for meals remains unchanged (only UI labels change)
- Tab switching behavior remains the same (only labels change)
- Existing meal data will be used for both Recommended and Favorite tabs
- No new data sources or backend changes are required
- The change is limited to the diets.tsx screen and related components
