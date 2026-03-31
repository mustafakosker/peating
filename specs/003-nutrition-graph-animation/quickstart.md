# Quickstart: Nutrition Graph Animation

**Feature Branch**: `003-nutrition-graph-animation`
**Created**: 2026-03-31
**Plan**: [plan.md](./plan.md)

## Overview

This feature adds smooth animations to the calories arc gauge and protein/carbs progress bars on the home screen. Animations trigger from 0 to current value on screen focus.

## Prerequisites

All dependencies are already installed:
- `react-native-svg` - For animated SVG paths
- `expo-router` - Provides `useFocusEffect` hook
- React Native `Animated` API - Built-in

## Implementation Steps

### Step 1: Create Animation Hook

Create new file `components/hooks/useAnimatedProgress.ts`:

```typescript
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
      animatedValue.setValue(0);

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

### Step 2: Update CaloriesCard

Modify `components/CaloriesCard.tsx`:

1. Add imports:
```typescript
import { Animated } from 'react-native';
import { useAnimatedProgress } from './hooks/useAnimatedProgress';
```

2. Create AnimatedPath outside component:
```typescript
const AnimatedPath = Animated.createAnimatedComponent(Path);
```

3. Inside component, use the hook:
```typescript
const progress = ((totalCalories - caloriesLeft) / totalCalories) * 100;
const animatedProgress = useAnimatedProgress({ toValue: progress });

const animatedOffset = animatedProgress.interpolate({
  inputRange: [0, progress],
  outputRange: [circumference, progressOffset],
});
```

4. Replace static Path with AnimatedPath:
```typescript
<AnimatedPath
  d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
  stroke={Colors.background}
  strokeWidth={strokeWidth}
  fill="none"
  strokeLinecap="round"
  strokeDasharray={`${circumference}`}
  strokeDashoffset={animatedOffset}
/>
```

5. For animated number display, use AnimatedText pattern or listener.

### Step 3: Update NutritionCard

Modify `components/NutritionCard.tsx`:

1. Add imports:
```typescript
import { Animated } from 'react-native';
import { useAnimatedProgress } from './hooks/useAnimatedProgress';
```

2. Inside component:
```typescript
const progress = (current / total) * 100;
const animatedProgress = useAnimatedProgress({ toValue: progress });

const animatedWidth = animatedProgress.interpolate({
  inputRange: [0, progress],
  outputRange: ['0%', `${progress}%`],
});
```

3. Replace progress fill View with Animated.View:
```typescript
<Animated.View
  style={[
    styles.progressFill,
    { width: animatedWidth }
  ]}
/>
```

## Verification

After implementation, verify:

1. **Initial Load**: Open home screen - all 3 indicators animate from 0 to current
2. **Tab Switch**: Navigate to another tab, return - animations replay
3. **Smooth Animation**: No stuttering, ~1 second duration
4. **0% Edge Case**: Test with current=0, verify no visual glitch
5. **100% Edge Case**: Test with current=total, verify fills completely

## Animation Parameters

| Parameter | Value |
|-----------|-------|
| Duration | 1000ms |
| Easing | Ease-out cubic |
| Trigger | Screen focus |
| Start | 0% |

## File Changes Summary

| File | Change |
|------|--------|
| `components/hooks/useAnimatedProgress.ts` | NEW |
| `components/CaloriesCard.tsx` | MODIFY |
| `components/NutritionCard.tsx` | MODIFY |

## Troubleshooting

**Animation not replaying on tab switch:**
- Verify `useFocusEffect` is imported from `expo-router`
- Check that hook is being called inside component

**SVG animation not working:**
- Ensure `AnimatedPath` is created with `Animated.createAnimatedComponent(Path)`
- Verify `useNativeDriver: false` is set

**Jerky animation:**
- Reduce number of re-renders during animation
- Use `Animated.Value` ref pattern (not state)
