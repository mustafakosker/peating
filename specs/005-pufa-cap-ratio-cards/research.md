# Research: PUFA and Ca:P Ratio Metric Cards

**Feature**: 005-pufa-cap-ratio-cards
**Date**: 2026-03-31

## Current Implementation Analysis

### Existing Components

**NutritionCard** (`components/NutritionCard.tsx`):
- Uses progress bar visualization
- Colored backgrounds (accent200 for carbs, accent300 for protein)
- 44px icon container with semi-transparent background
- Animated progress using `useAnimatedProgress` hook
- 173px fixed height, flex: 1 for side-by-side layout
- Shows current/total values with progress bar

**CaloriesCard** (`components/CaloriesCard.tsx`):
- Uses SVG half-circle gauge visualization
- accent100 (purple) background
- Animated arc using `AnimatedPath`
- Shows calories left with gauge scale 0-100
- Will be removed from home screen

**Home Screen Layout** (`app/(tabs)/index.tsx`):
- CaloriesCard in "Track Your Fuel" section
- NutritionCards (carbs/protein) in `nutritionRow` with `flexDirection: 'row'`
- `gap: 12` between cards in row

## Technical Approach

### Ca:P Ratio Card Design

**Visualization**: Simplified gauge or circular indicator (not full SVG arc like CaloriesCard for simplicity)
- Display ratio value prominently (e.g., "1.2:1")
- Show calcium mg and phosphorus mg values
- Color-coded status indicator

**Color Coding Logic**:
```typescript
function getCaPRatioStatus(ratio: number): 'green' | 'yellow' | 'red' {
  if (ratio >= 1.0) return 'green';    // Optimal
  if (ratio >= 0.7) return 'yellow';   // Suboptimal
  return 'red';                         // Poor
}
```

**Status Colors** (to be added to Colors.ts):
- `statusGreen: '#45C588'` (reuse accent300)
- `statusYellow: '#F5F378'` (reuse accent200)
- `statusRed: '#FF5A16'` (reuse primary)

### PUFA Card Design

**Visualization**: Progress bar similar to NutritionCard
- Shows grams consumed vs daily limit
- Color-coded progress bar based on percentage

**Color Coding Logic**:
```typescript
function getPUFAStatus(percentage: number): 'green' | 'yellow' | 'red' {
  if (percentage < 80) return 'green';   // Under limit
  if (percentage <= 100) return 'yellow'; // Approaching limit
  return 'red';                           // Over limit
}
```

### Component Structure

**CaPRatioCard** (new component):
```typescript
type CaPRatioCardProps = {
  calcium: number;      // mg
  phosphorus: number;   // mg
  onPress?: () => void;
};
```

**PUFACard** (new component):
```typescript
type PUFACardProps = {
  current: number;      // grams
  limit: number;        // grams
  onPress?: () => void;
};
```

### Placeholder Data

**Ca:P Ratio Card**:
- Calcium: 800mg
- Phosphorus: 700mg
- Computed ratio: 1.1:1 (green status)

**PUFA Card**:
- Current: 6g
- Limit: 10g
- Percentage: 60% (green status)

### Layout Changes

**Home Screen Modification**:
1. Remove `CaloriesCard` import and usage
2. Add new row for Ca:P and PUFA cards above carbs/protein
3. Use same `nutritionRow` style for consistency

```tsx
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Track Your Fuel</Text>
  <View style={styles.nutritionRow}>
    <CaPRatioCard calcium={800} phosphorus={700} />
    <PUFACard current={6} limit={10} />
  </View>
</View>

<View style={styles.nutritionRow}>
  <NutritionCard type="carbs" current={140} total={200} />
  <NutritionCard type="protein" current={60} total={120} />
</View>
```

## Dependencies

- No new dependencies required
- Reuse existing `TouchableOpacity` for tap handling
- Reuse existing animation hook if needed
- May add `Ionicons` icons for cards

## Files to Create/Modify

| File | Change Type | Description |
|------|-------------|-------------|
| `components/CaPRatioCard.tsx` | CREATE | Ca:P ratio metric card |
| `components/PUFACard.tsx` | CREATE | PUFA intake metric card |
| `constants/Colors.ts` | MODIFY | Add status colors if needed |
| `app/(tabs)/index.tsx` | MODIFY | Remove CaloriesCard, add new cards |

## Edge Cases Handled

1. **Zero phosphorus**: Display "N/A" for ratio, show calcium only
2. **Very long decimals**: Round ratio to 1 decimal place with `toFixed(1)`
3. **Over 100% PUFA**: Cap progress bar visually, show actual value in text

## Design Decisions

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| Reuse existing color palette | Consistency with design system | Create new status colors (rejected - unnecessary complexity) |
| Simple colored circle for Ca:P status | Faster implementation, clear status | Full SVG gauge (rejected - too complex for simple ratio) |
| Progress bar for PUFA | Matches existing NutritionCard pattern | Circular gauge (rejected - inconsistent) |
| TouchableOpacity for tap | Standard React Native approach | Pressable (either works, TO is simpler) |
