# Implementation Plan: PUFA and Ca:P Ratio Metric Cards

**Branch**: `005-pufa-cap-ratio-cards` | **Date**: 2026-03-31 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-pufa-cap-ratio-cards/spec.md`

## Summary

Add two new metric summary cards (Ca:P ratio and PUFA intake) to the home screen dashboard, remove the existing CaloriesCard, and position the new cards in a row above the carbs and protein cards. Cards will use hardcoded placeholder data, match the existing design system, and provide tap feedback.

## Technical Context

**Language/Version**: TypeScript 5.x with React Native 0.81
**Primary Dependencies**: React Native (View, Text, TouchableOpacity, StyleSheet), @expo/vector-icons (Ionicons), expo-router
**Storage**: N/A (hardcoded placeholder data)
**Testing**: Manual visual testing
**Target Platform**: iOS and Android via Expo
**Project Type**: Mobile app
**Performance Goals**: 60fps rendering
**Constraints**: Match existing design system, cards must be tappable
**Scale/Scope**: 2 new components, 1 modified screen

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ No new dependencies added (reusing existing Ionicons, TouchableOpacity)
- ✅ Simple component structure (no over-engineering)
- ✅ Uses existing color palette
- ✅ Follows existing NutritionCard patterns

## Project Structure

### Documentation (this feature)

```text
specs/005-pufa-cap-ratio-cards/
├── plan.md              # This file
├── research.md          # Component design decisions
├── quickstart.md        # Implementation guide with code
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (repository root)

```text
components/
├── CaPRatioCard.tsx     # NEW - Ca:P ratio metric card
├── PUFACard.tsx         # NEW - PUFA intake metric card
├── NutritionCard.tsx    # REFERENCE - design pattern
└── CaloriesCard.tsx     # REFERENCE ONLY - removed from home screen

app/(tabs)/
└── index.tsx            # MODIFY - remove CaloriesCard, add new cards
```

**Structure Decision**: Mobile app with components at repository root. Two new card components following existing NutritionCard pattern.

## Implementation Details

### New Components

**CaPRatioCard** (`components/CaPRatioCard.tsx`):
- Props: `calcium` (mg), `phosphorus` (mg), `onPress`
- Displays: ratio value (X.X:1), individual mg values, status indicator
- Color coding: green (≥1:1), yellow (0.7-0.99), red (<0.7)
- Styling: white background, 173px height, rounded corners

**PUFACard** (`components/PUFACard.tsx`):
- Props: `current` (grams), `limit` (grams), `onPress`
- Displays: progress bar, current/limit values
- Color coding: green (<80%), yellow (80-100%), red (>100%)
- Styling: white background, 173px height, progress bar

### Color Mapping

| Status | Color | Existing Constant |
|--------|-------|-------------------|
| Green (optimal) | #45C588 | Colors.accent300 |
| Yellow (warning) | #F5F378 | Colors.accent200 |
| Red (alert) | #FF5A16 | Colors.primary |

### Home Screen Changes

1. Remove `CaloriesCard` import and component usage
2. Add imports for `CaPRatioCard` and `PUFACard`
3. Add new row with both cards above carbs/protein row
4. Keep "Track Your Fuel" section title

### Placeholder Data

| Card | Values | Status |
|------|--------|--------|
| Ca:P Ratio | Ca: 800mg, P: 700mg, Ratio: 1.1:1 | Green |
| PUFA | Current: 6g, Limit: 10g (60%) | Green |

## Complexity Tracking

No constitution violations. Straightforward component additions following existing patterns.

## Files Changed Summary

| File | Change Type | Description |
|------|-------------|-------------|
| `components/CaPRatioCard.tsx` | CREATE | Ca:P ratio card with gauge visualization |
| `components/PUFACard.tsx` | CREATE | PUFA intake card with progress bar |
| `app/(tabs)/index.tsx` | MODIFY | Remove CaloriesCard, add new cards in row |

## Dependencies

None. Uses existing dependencies:
- React Native core components
- @expo/vector-icons (Ionicons)
- Existing Colors constants

## Testing Strategy

1. **Visual Testing**: Open home screen, verify card layout and appearance
2. **Color Coding**: Modify placeholder values to test all status colors
3. **Tap Feedback**: Tap cards, verify visual feedback (opacity change)
4. **Layout**: Test on different screen sizes, verify no overflow
5. **CaloriesCard Removal**: Confirm CaloriesCard no longer appears
