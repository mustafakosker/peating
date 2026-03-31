# Quickstart: PUFA and Ca:P Ratio Metric Cards

**Feature**: 005-pufa-cap-ratio-cards
**Date**: 2026-03-31

## Overview

Add two new metric summary cards (Ca:P ratio and PUFA intake) to the home screen, remove the CaloriesCard, and position the new cards above the existing carbs and protein cards.

## Prerequisites

- Expo development environment set up
- Project dependencies installed (`npm install`)

## Quick Implementation

### 1. Create CaPRatioCard Component

Create `components/CaPRatioCard.tsx`:

```typescript
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type CaPRatioCardProps = {
  calcium: number;
  phosphorus: number;
  onPress?: () => void;
};

function getStatusColor(ratio: number): string {
  if (ratio >= 1.0) return Colors.accent300; // Green
  if (ratio >= 0.7) return Colors.accent200; // Yellow
  return Colors.primary; // Red
}

export function CaPRatioCard({ calcium, phosphorus, onPress }: CaPRatioCardProps) {
  const ratio = phosphorus > 0 ? calcium / phosphorus : 0;
  const ratioDisplay = phosphorus > 0 ? ratio.toFixed(1) : 'N/A';
  const statusColor = getStatusColor(ratio);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="nutrition-outline" size={24} color={Colors.background} />
      </View>

      <Text style={styles.title}>Ca:P Ratio</Text>

      <View style={styles.ratioContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
        <Text style={styles.ratioText}>{ratioDisplay}:1</Text>
      </View>

      <View style={styles.valuesContainer}>
        <Text style={styles.valueText}>Ca: {calcium}mg</Text>
        <Text style={styles.valueText}>P: {phosphorus}mg</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    height: 173,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.background,
  },
  ratioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  ratioText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.background,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueText: {
    fontSize: 13,
    color: Colors.gray300,
  },
});
```

### 2. Create PUFACard Component

Create `components/PUFACard.tsx`:

```typescript
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type PUFACardProps = {
  current: number;
  limit: number;
  onPress?: () => void;
};

function getStatusColor(percentage: number): string {
  if (percentage < 80) return Colors.accent300; // Green
  if (percentage <= 100) return Colors.accent200; // Yellow
  return Colors.primary; // Red
}

export function PUFACard({ current, limit, onPress }: PUFACardProps) {
  const percentage = (current / limit) * 100;
  const displayPercentage = Math.min(percentage, 100);
  const statusColor = getStatusColor(percentage);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="water-outline" size={24} color={Colors.background} />
      </View>

      <Text style={styles.title}>PUFA</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${displayPercentage}%`, backgroundColor: statusColor }
            ]}
          />
        </View>
        <View style={styles.valuesContainer}>
          <Text style={styles.valueText}>{current}g</Text>
          <Text style={styles.valueText}>{limit}g</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    height: 173,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.background,
  },
  progressContainer: {
    gap: 6,
  },
  progressBackground: {
    height: 6,
    backgroundColor: 'rgba(18, 18, 18, 0.1)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 5,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueText: {
    fontSize: 13,
    color: Colors.gray300,
  },
});
```

### 3. Update Home Screen

Modify `app/(tabs)/index.tsx`:

```typescript
// Remove CaloriesCard import
// import { CaloriesCard } from '../../components/CaloriesCard';

// Add new imports
import { CaPRatioCard } from '../../components/CaPRatioCard';
import { PUFACard } from '../../components/PUFACard';

// In the render, replace CaloriesCard section with:
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

## Verification Checklist

- [x] CaloriesCard is removed from home screen
- [x] Ca:P Ratio card displays with calcium/phosphorus values and computed ratio
- [x] Ca:P status indicator shows correct color (green ≥1:1, yellow 0.7-0.99, red <0.7)
- [x] PUFA card displays with current/limit values and progress bar
- [x] PUFA progress bar shows correct color (green <80%, yellow 80-100%, red >100%)
- [x] Both cards are tappable with visual feedback
- [x] Cards are positioned in a row above carbs/protein cards
- [x] Layout renders correctly on all device sizes

## Running the App

```bash
npx expo start
```

## Testing Status Colors

To test different status colors, modify the placeholder data:

**Ca:P Ratio**:
- Green: `calcium={1000} phosphorus={800}` (ratio: 1.25)
- Yellow: `calcium={700} phosphorus={800}` (ratio: 0.88)
- Red: `calcium={500} phosphorus={800}` (ratio: 0.63)

**PUFA**:
- Green: `current={5} limit={10}` (50%)
- Yellow: `current={9} limit={10}` (90%)
- Red: `current={12} limit={10}` (120%)
