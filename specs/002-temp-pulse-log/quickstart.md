# Quickstart: Temp & Pulse Log

**Feature**: 002-temp-pulse-log
**Date**: 2026-03-30

## Prerequisites

1. Ensure you're on the correct branch:
   ```bash
   git checkout 002-temp-pulse-log
   ```

2. Install new dependencies:
   ```bash
   npm install @react-native-async-storage/async-storage @gorhom/bottom-sheet react-native-reanimated
   ```

3. Add Reanimated babel plugin to `babel.config.js`:
   ```javascript
   module.exports = function(api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       plugins: ['react-native-reanimated/plugin'],
     };
   };
   ```

4. Clear cache and restart:
   ```bash
   npx expo start --clear
   ```

## Files to Create

### Types

**`types/vitals.ts`**
```typescript
export interface VitalReading {
  id: string;
  type: 'temperature' | 'pulse';
  value: number;
  unit: 'F' | 'C' | 'BPM';
  timestamp: string;
}

export type TrendDirection = 'up' | 'down' | 'stable' | 'none';
```

### Service Layer

**`services/vitalsService.ts`**
- `saveReading(reading: Omit<VitalReading, 'id' | 'timestamp'>): Promise<VitalReading>`
- `getReadings(): Promise<VitalReading[]>`
- `getTodaysReadings(): Promise<VitalReading[]>`
- `getLatestByType(type: 'temperature' | 'pulse'): Promise<VitalReading | null>`
- `getTrendForType(type: 'temperature' | 'pulse'): Promise<TrendDirection>`

### Components

**`components/VitalsCard.tsx`**
- Displays temperature and pulse readings
- Shows trend indicators (up/down/stable arrows)
- Placeholder state when no readings exist
- Tappable to open AddVitalSheet

**`components/AddVitalSheet.tsx`**
- Bottom sheet with temperature and pulse inputs
- Validation feedback
- Save and cancel actions

## Files to Modify

### Home Screen

**`app/(tabs)/index.tsx`**
- Import VitalsCard component
- Add VitalsCard above CaloriesCard in the content section
- Import and setup GestureHandlerRootView (required for bottom sheet)

### Root Layout

**`app/_layout.tsx`**
- Wrap with GestureHandlerRootView if not already present

## Implementation Order

1. Install dependencies and configure babel
2. Create types (`types/vitals.ts`)
3. Create vitals service (`services/vitalsService.ts`)
4. Create VitalsCard component
5. Create AddVitalSheet component
6. Integrate into home screen
7. Test all acceptance scenarios

## Testing Checklist

- [ ] View empty state (no readings)
- [ ] Add temperature reading
- [ ] Add pulse reading
- [ ] View most recent readings displayed
- [ ] Verify trend indicator after 2+ readings
- [ ] Validate input boundaries (out of range values)
- [ ] Cancel input without saving
- [ ] Readings persist after app restart
