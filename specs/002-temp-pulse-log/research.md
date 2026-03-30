# Technical Research: Temp & Pulse Log

**Feature**: 002-temp-pulse-log
**Date**: 2026-03-30
**Phase**: 0 - Research

## Executive Summary

This feature adds a Temp & Pulse vital signs display section to the home page, positioned above the calories tracker. Users can view their most recent readings with trend indicators and add new readings via a bottom sheet interface.

## Codebase Analysis

### Existing Architecture

The app follows Expo Router conventions with a tab-based navigation structure:

```text
app/
├── (tabs)/
│   ├── _layout.tsx      # Tab navigator configuration
│   ├── index.tsx        # Home screen (target for vitals section)
│   ├── analysis.tsx     # Analytics screen
│   ├── scan.tsx         # AI camera screen
│   ├── diets.tsx        # Diet plans screen
│   └── settings.tsx     # Settings screen
├── profile.tsx          # Profile edit screen
└── _layout.tsx          # Root stack navigator

components/
├── CaloriesCard.tsx     # Calories display card (similar pattern for VitalsCard)
├── NutritionCard.tsx    # Nutrition metrics card
├── FormInput.tsx        # Reusable form input component
├── FormDropdown.tsx     # Reusable dropdown component
└── ...                  # Other UI components
```

### Relevant Patterns

1. **Card Components**: `CaloriesCard` and `NutritionCard` demonstrate the established card pattern with:
   - Dark background (`Colors.gray500` or `Colors.gray400`)
   - Rounded corners (24px radius)
   - White text with hierarchical sizing
   - Icon integration via `@expo/vector-icons`

2. **Form Components**: `FormInput` and `FormDropdown` can be reused for the bottom sheet input form

3. **Color System**: Uses `constants/Colors.ts` with defined palette

### Storage Technology Decision

**Recommendation: AsyncStorage**

Since the specification requires local-only storage with no cloud sync, `@react-native-async-storage/async-storage` is the appropriate choice:

- Lightweight, persistent key-value storage
- No external dependencies or database setup
- Sufficient for simple vital readings data structure
- Works offline by default
- Already commonly used in Expo projects

**Alternative Considered**: expo-sqlite
- Overkill for simple key-value readings with timestamps
- Would add unnecessary complexity for v1 scope

## Technical Decisions

### Data Storage Format

Store readings in AsyncStorage with a JSON structure:
- Key: `vitals_readings`
- Value: Array of reading objects with timestamp, type, value, unit

### Trend Calculation

Compare the two most recent readings within 24 hours:
- UP: Latest > Previous
- DOWN: Latest < Previous
- STABLE: Within 2% tolerance

### Temperature Unit

Default based on device locale:
- US locale: Fahrenheit
- Other locales: Celsius

## Dependencies Required

| Dependency | Version | Purpose |
|------------|---------|---------|
| @react-native-async-storage/async-storage | ^2.x | Local data persistence |
| @gorhom/bottom-sheet | ^5.x | Bottom sheet component |
| react-native-reanimated | ^3.x | Required by bottom-sheet |

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Bottom sheet library compatibility | Low | Medium | Use @gorhom/bottom-sheet which is well-maintained for Expo |
| Trend calculation edge cases | Low | Low | Clear 24-hour window and 2% tolerance rules |
| AsyncStorage data loss | Low | Medium | Document that cloud backup is future scope |

## Implementation Complexity

**Estimated effort**: Low-Medium

- VitalsCard component: Low (follows existing card patterns)
- Bottom sheet input form: Low (reuses FormInput pattern)
- Storage service: Low (simple AsyncStorage operations)
- Trend calculation: Low (straightforward comparison logic)
- Integration with home screen: Low (insert section above CaloriesCard)
