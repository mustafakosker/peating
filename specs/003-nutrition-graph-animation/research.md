# Research: Nutrition Graph Animation

**Feature Branch**: `003-nutrition-graph-animation`
**Created**: 2026-03-31
**Spec**: [spec.md](./spec.md)

## Current Implementation Analysis

### CaloriesCard Component (`components/CaloriesCard.tsx`)

**Visual Type**: Semi-circular arc gauge using `react-native-svg`

**How Progress Works**:
- Uses SVG `Path` element with `strokeDasharray` and `strokeDashoffset`
- `circumference = radius * Math.PI` (half circle)
- `progressOffset = circumference - (progress / 100) * circumference`
- Progress arc fills from left to right as offset decreases

**Animation Target**:
- Animate `strokeDashoffset` from `circumference` (0% progress) to `progressOffset` (current %)
- Animate displayed `caloriesLeft` number from `totalCalories` down to actual value

**Current Static Values**:
```typescript
const progress = ((totalCalories - caloriesLeft) / totalCalories) * 100;
const progressOffset = circumference - (progress / 100) * circumference;
```

### NutritionCard Component (`components/NutritionCard.tsx`)

**Visual Type**: Linear progress bar using View with percentage width

**How Progress Works**:
- `progress = (current / total) * 100`
- Progress fill uses inline style: `{ width: \`${progress}%\` }`

**Animation Target**:
- Animate width from `0%` to `${progress}%`
- Animate displayed `current` number from `0` to actual value

**Current Static Values**:
```typescript
const progress = (current / total) * 100;
<View style={[styles.progressFill, { width: `${progress}%` }]} />
```

## Animation Approach Options

### Option 1: React Native Animated API (Recommended)

**Pros**:
- Built into React Native, no additional dependencies
- Runs on native thread for 60fps performance
- Well-documented, stable API
- Supports easing functions natively

**Implementation Pattern**:
```typescript
const animatedValue = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 1000,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: false, // Required for layout animations
  }).start();
}, []);
```

**Note**: `useNativeDriver: false` is required because:
- Width animations cannot use native driver
- SVG strokeDashoffset requires JS thread

### Option 2: React Native Reanimated

**Pros**:
- More powerful worklet-based animations
- Better performance for complex animations

**Cons**:
- Previously caused bundling issues in this project
- Overkill for this simple use case
- Additional dependency complexity

**Decision**: Not recommended due to previous compatibility issues.

### Option 3: requestAnimationFrame Loop

**Pros**:
- Full control over animation timing
- No dependencies

**Cons**:
- Manual implementation of easing
- More code to maintain
- Not as optimized as Animated API

**Decision**: Not recommended - Animated API is better.

## Recommended Approach

Use **React Native Animated API** with the following strategy:

### For CaloriesCard (SVG Arc)
1. Create `Animated.Value` starting at 0
2. Animate to 1 over 1000ms with ease-out curve
3. Use `interpolate` to map 0-1 to strokeDashoffset range
4. Use `AnimatedPath` from react-native-svg for animated stroke
5. Animate numeric display using same animated value

### For NutritionCard (Progress Bar)
1. Create `Animated.Value` starting at 0
2. Animate to target progress percentage
3. Use `Animated.View` for the progress fill
4. Animate numeric display in sync

### Screen Focus Re-trigger
Use `useFocusEffect` from `@react-navigation/native` (already available via expo-router) to:
1. Reset animation value to 0
2. Trigger animation on each focus event

## Animation Specifications (from spec.md)

| Parameter | Value |
|-----------|-------|
| Duration | 800-1200ms (use 1000ms) |
| Easing | Ease-out cubic (smooth deceleration) |
| Start Trigger | Screen focus event |
| Start Delay | <100ms from screen visible |
| Frame Rate Target | 60fps |

## Dependencies

### Required (already installed)
- `react-native-svg` - For animated SVG paths

### May Need
- `@react-navigation/native` hooks - Check if `useFocusEffect` available through expo-router

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| SVG animation performance | Low | Use Animated API with interpolation |
| useFocusEffect unavailable | Low | Can use expo-router's own focus hooks |
| Number animation jank | Low | Use Math.round for display values |

## Proof of Concept Validation

Animation of SVG strokeDashoffset is proven to work with React Native Animated:
- `react-native-svg` exports `Animated` versions of components
- `Animated.createAnimatedComponent` can wrap SVG elements

```typescript
import Animated from 'react-native';
import { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
```

## Conclusion

The implementation is straightforward using React Native's built-in Animated API:

1. **No new dependencies required** - uses existing react-native-svg and Animated
2. **Proven pattern** - SVG strokeDashoffset animation is well-documented
3. **Performance safe** - Simple interpolation-based animations
4. **Focus re-trigger** - Use expo-router or react-navigation focus hooks
