# Feature Specification: PUFA and Ca:P Ratio Metric Cards

**Feature Branch**: `005-pufa-cap-ratio-cards`
**Created**: 2026-03-31
**Status**: Draft
**Input**: User description: "Add two metric summary cards to the home/dashboard screen: a Ca:P ratio card showing a daily calcium-to-phosphorus ratio with a gauge targeting ≥1:1 (green/yellow/red color coding, showing actual mg values and computed ratio), and a daily PUFA intake card showing grams consumed vs a configurable daily limit as a progress bar (green under limit, yellow approaching, red over). Use hardcoded placeholder data for now. Cards should match the existing design system, be tappable, and sit at the top of the carbs and protein cards. Also remove the calories card from the home page."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Ca:P Ratio Status (Priority: P1)

As a health-conscious user viewing the home screen, I want to see my daily calcium-to-phosphorus ratio displayed in a clear gauge format with color-coded status, so that I can quickly assess whether my mineral balance is optimal (≥1:1 ratio).

**Why this priority**: The Ca:P ratio is a specific health metric the user requested with detailed visualization requirements (gauge, ratio display, color coding). This is the more complex card of the two.

**Independent Test**: Can be fully tested by opening the home screen and verifying that the Ca:P ratio card displays with the gauge visualization, actual mg values for both minerals, the computed ratio, and appropriate color coding based on the ratio value.

**Acceptance Scenarios**:

1. **Given** the user opens the home screen, **When** the Ca:P ratio card loads, **Then** the card displays the daily calcium intake in mg, phosphorus intake in mg, and the computed ratio (e.g., "1.2:1")
2. **Given** the Ca:P ratio is 1.0 or higher, **When** viewing the card, **Then** the gauge displays in green indicating optimal status
3. **Given** the Ca:P ratio is between 0.7 and 0.99, **When** viewing the card, **Then** the gauge displays in yellow indicating suboptimal status
4. **Given** the Ca:P ratio is below 0.7, **When** viewing the card, **Then** the gauge displays in red indicating poor status
5. **Given** the user taps the Ca:P ratio card, **When** the tap is registered, **Then** the card provides visual feedback (future navigation can be added)

---

### User Story 2 - View PUFA Intake Status (Priority: P1)

As a health-conscious user viewing the home screen, I want to see my daily PUFA (polyunsaturated fatty acid) intake displayed as a progress bar against my configurable daily limit, so that I can quickly assess whether I'm staying within my target intake.

**Why this priority**: The PUFA intake card uses a simpler progress bar visualization similar to existing carbs/protein cards, making it faster to implement while providing equal user value.

**Independent Test**: Can be fully tested by opening the home screen and verifying that the PUFA card displays with a progress bar showing grams consumed vs daily limit, with appropriate color coding based on intake level.

**Acceptance Scenarios**:

1. **Given** the user opens the home screen, **When** the PUFA card loads, **Then** the card displays current PUFA intake in grams and the daily limit in grams
2. **Given** PUFA intake is under 80% of the daily limit, **When** viewing the card, **Then** the progress bar displays in green indicating safe level
3. **Given** PUFA intake is between 80% and 100% of the daily limit, **When** viewing the card, **Then** the progress bar displays in yellow indicating approaching limit
4. **Given** PUFA intake exceeds the daily limit, **When** viewing the card, **Then** the progress bar displays in red indicating over limit
5. **Given** the user taps the PUFA card, **When** the tap is registered, **Then** the card provides visual feedback (future navigation can be added)

---

### User Story 3 - Remove Calories Card from Home Screen (Priority: P1)

As a user, I want the calories card removed from the home screen, so that the layout focuses on the metrics that matter most to me (PUFA and Ca:P ratio).

**Why this priority**: This is a prerequisite for the new layout - the calories card must be removed to make space for the new metric cards.

**Independent Test**: Can be fully tested by opening the home screen and verifying that the CaloriesCard component is no longer visible in the "Track Your Fuel" section.

**Acceptance Scenarios**:

1. **Given** the user opens the home screen, **When** scrolling through the content, **Then** no calories/calorie card is visible
2. **Given** the home screen layout, **When** viewing the "Track Your Fuel" section, **Then** only the PUFA and Ca:P ratio cards are displayed at the top, followed by carbs and protein cards

---

### Out of Scope (v1)

- Dynamic data from food logging (hardcoded placeholder data only)
- Settings screen for configuring PUFA daily limit
- Navigation when cards are tapped (placeholder for future)
- Historical tracking or trend visualization
- Integration with food scanning/logging features

### Edge Cases

- What happens when ratio values result in very long decimal numbers? Display should round to 1 decimal place (e.g., "1.2:1")
- What happens when phosphorus is zero? Display "N/A" or show calcium only with an appropriate indicator
- What happens when PUFA exceeds 200% of limit? Progress bar should cap visually at 100% but show actual value

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a Ca:P ratio card showing calcium mg, phosphorus mg, and computed ratio
- **FR-002**: System MUST display a gauge/indicator on the Ca:P card with green (≥1:1), yellow (0.7-0.99), red (<0.7) color coding
- **FR-003**: System MUST display a PUFA intake card showing grams consumed and daily limit
- **FR-004**: System MUST display a progress bar on the PUFA card with green (<80%), yellow (80-100%), red (>100%) color coding
- **FR-005**: System MUST remove the CaloriesCard from the home screen layout
- **FR-006**: System MUST position the Ca:P and PUFA cards in a row above the existing carbs and protein cards
- **FR-007**: Both new cards MUST match the existing design system (similar styling to NutritionCard)
- **FR-008**: Both new cards MUST be tappable with visual press feedback
- **FR-009**: System MUST use hardcoded placeholder data for all displayed values
- **FR-010**: Ca:P ratio MUST be displayed in the format "X.X:1" with one decimal place

### Key Entities

- **Ca:P Ratio Card Data**: Calcium intake (mg), Phosphorus intake (mg), computed ratio, status color
- **PUFA Card Data**: Current intake (grams), daily limit (grams), percentage consumed, status color

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Home screen displays both new metric cards correctly positioned above carbs/protein row
- **SC-002**: CaloriesCard is no longer visible on the home screen
- **SC-003**: Ca:P ratio card shows gauge with correct color based on ratio value (green ≥1:1, yellow 0.7-0.99, red <0.7)
- **SC-004**: PUFA card shows progress bar with correct color based on intake level (green <80%, yellow 80-100%, red >100%)
- **SC-005**: Both cards respond to tap with visual feedback
- **SC-006**: Cards render correctly on all supported device sizes without layout overflow
- **SC-007**: Cards match the visual style of existing NutritionCard components (rounded corners, icons, typography)

## Assumptions

- Hardcoded placeholder data will be used (no backend integration required)
- The configurable PUFA daily limit will use a reasonable default (e.g., 10g) for now
- Cards will follow the existing design system with similar styling to NutritionCard (colored backgrounds, icons, progress indicators)
- The "Track Your Fuel" section title will be kept even after removing the calories card
- Both cards will be displayed side-by-side in a row, similar to carbs/protein layout
- Tap functionality will provide visual feedback but no navigation (placeholder for future features)
- Color values will use the existing color palette where possible, with new semantic colors (status-green, status-yellow, status-red) added if needed
