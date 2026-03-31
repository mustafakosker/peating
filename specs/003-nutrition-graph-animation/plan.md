# Implementation Plan: Nutrition Graph Animation

**Branch**: `003-nutrition-graph-animation` | **Date**: 2026-03-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-nutrition-graph-animation/spec.md`

## Summary

Animate the calories arc gauge and protein/carbs progress bars from 0 to their current values when the home screen is displayed or receives focus. Uses React Native's built-in Animated API with react-native-svg for SVG path animations.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19.1 / React Native 0.81
**Primary Dependencies**: react-native-svg (installed), React Native Animated API (built-in), expo-router
**Storage**: N/A (animation-only feature)
**Testing**: Manual visual testing, React Native Testing Library for unit tests
**Target Platform**: iOS and Android via Expo SDK 54
**Project Type**: Mobile app (Expo)
**Performance Goals**: 60fps animations, <100ms start delay
**Constraints**: 800-1200ms animation duration, smooth easing
**Scale/Scope**: 3 animated components on home screen

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] No new external dependencies required (using built-in Animated API)
- [x] Feature aligns with existing component architecture
- [x] No database or storage changes needed
- [x] Performance requirements are achievable with native animations

## Project Structure

### Documentation (this feature)

```text
specs/003-nutrition-graph-animation/
├── plan.md              # This file
├── research.md          # Phase 0 output - animation approach analysis
├── quickstart.md        # Phase 1 output - implementation guide
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
components/
├── CaloriesCard.tsx     # MODIFY: Add arc animation
├── NutritionCard.tsx    # MODIFY: Add progress bar animation
└── hooks/
    └── useAnimatedProgress.ts  # NEW: Shared animation hook

app/(tabs)/
└── index.tsx            # MODIFY: Add focus-based animation trigger
```

**Structure Decision**: Single project structure. Only modifying existing components and adding one shared hook for animation logic.

## Implementation Design

### Phase 1: Create Shared Animation Hook

Create `useAnimatedProgress` hook to encapsulate animation logic:

```typescript
// components/hooks/useAnimatedProgress.ts
import { useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import { useFocusEffect } from 'expo-router';

interface UseAnimatedProgressOptions {
  toValue: number;
  duration?: number;
}

export function useAnimatedProgress({
  toValue,
  duration = 1000
}: UseAnimatedProgressOptions) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      // Reset to 0 when screen focuses
      animatedValue.setValue(0);

      // Animate to target value
      Animated.timing(animatedValue, {
        toValue,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, [toValue, duration])
  );

  return animatedValue;
}
```

### Phase 2: Update CaloriesCard with Animation

Key changes to `CaloriesCard.tsx`:

1. Import `Animated` and create `AnimatedPath`
2. Use `useAnimatedProgress` hook
3. Interpolate animated value to strokeDashoffset
4. Animate the calories number display

```typescript
import { Animated } from 'react-native';
import { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

// In component:
const progress = ((totalCalories - caloriesLeft) / totalCalories) * 100;
const animatedProgress = useAnimatedProgress({ toValue: progress });

const animatedOffset = animatedProgress.interpolate({
  inputRange: [0, 100],
  outputRange: [circumference, circumference - (progress / 100) * circumference],
});

// For animated number display:
const displayedCalories = animatedProgress.interpolate({
  inputRange: [0, progress],
  outputRange: [totalCalories, caloriesLeft],
});
```

### Phase 3: Update NutritionCard with Animation

Key changes to `NutritionCard.tsx`:

1. Use `useAnimatedProgress` hook
2. Replace View with Animated.View for progress fill
3. Animate width from 0 to target percentage
4. Animate number display

```typescript
const progress = (current / total) * 100;
const animatedProgress = useAnimatedProgress({ toValue: progress });

const animatedWidth = animatedProgress.interpolate({
  inputRange: [0, progress],
  outputRange: ['0%', `${progress}%`],
});

// For animated number:
const displayedValue = animatedProgress.interpolate({
  inputRange: [0, progress],
  outputRange: [0, current],
});
```

### Focus Event Handling

The `useFocusEffect` from expo-router triggers when:
- User navigates to the home tab
- User returns from another screen
- App returns from background

This satisfies spec requirements FR-007 and SC-005.

## Animation Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Duration | 1000ms | Middle of 800-1200ms spec range |
| Easing | `Easing.out(Easing.cubic)` | Smooth deceleration per FR-004 |
| Start Value | 0 | Always animate from 0% |
| useNativeDriver | false | Required for layout/SVG animations |

## Edge Cases (from spec)

| Case | Handling |
|------|----------|
| Value is 0% | Animation runs but ends at 0 (no visual change) |
| Value exceeds 100% | Clamp visual to 100%, show actual number |
| Rapid navigation | `useFocusEffect` cleanup handles reset |

## Dependencies Analysis

| Dependency | Status | Notes |
|------------|--------|-------|
| react-native-svg | Installed | v15.12.1 - supports AnimatedPath |
| Animated API | Built-in | React Native core |
| expo-router | Installed | v6.0.23 - provides useFocusEffect |

**No new dependencies required.**

## Testing Strategy

### Visual Testing
- Open home screen, observe all 3 indicators animate
- Navigate away and back, verify replay
- Test with 0% and 100% values
- Test rapid navigation

### Unit Testing (optional)
- Test `useAnimatedProgress` hook with React Native Testing Library
- Verify animation starts on mount
- Verify cleanup on unmount

## Success Criteria Verification

| Criteria | How Verified |
|----------|--------------|
| SC-001: Start within 100ms | useFocusEffect triggers immediately |
| SC-002: 800-1200ms duration | Configured at 1000ms |
| SC-003: 60fps | Native Animated API handles this |
| SC-004: Engaging feel | Visual inspection |
| SC-005: Replay on return | useFocusEffect triggers on focus |

## Complexity Tracking

No constitution violations. Implementation is minimal:
- 1 new hook file (~30 lines)
- 2 component modifications (~20 lines each)
- No new dependencies
- No architectural changes
