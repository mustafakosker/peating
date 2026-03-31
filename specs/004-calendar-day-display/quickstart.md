# Quickstart: Calendar Day Display Fix

**Feature**: 004-calendar-day-display
**Date**: 2026-03-31

## Overview

Fix the CalendarWeek component to display dynamic dates based on the current week, highlight today with the primary color, and ensure all day columns are horizontally aligned.

## Prerequisites

- Expo development environment set up
- Project dependencies installed (`npm install`)

## Quick Implementation

### 1. Update CalendarWeek Component

Replace the contents of `components/CalendarWeek.tsx`:

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

type DayData = {
  day: string;
  date: number;
  isToday: boolean;
  isPast: boolean;
};

function getCurrentWeekDates(): DayData[] {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Calculate Monday of current week
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const days: DayData[] = [];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const isToday = date.toDateString() === today.toDateString();
    const isPast = date < today && !isToday;

    days.push({
      day: dayNames[i],
      date: date.getDate(),
      isToday,
      isPast,
    });
  }

  return days;
}

export function CalendarWeek() {
  const days = getCurrentWeekDates();

  return (
    <View style={styles.container}>
      {days.map((item) => (
        <View key={item.day} style={styles.dayContainer}>
          <Text
            style={[
              styles.dayText,
              item.isPast && styles.pastText,
              !item.isPast && !item.isToday && styles.futureText,
              item.isToday && styles.todayText,
            ]}
          >
            {item.day}
          </Text>
          <View style={[styles.dateWrapper, item.isToday && styles.todayCircle]}>
            <Text
              style={[
                styles.dateText,
                item.isPast && styles.pastText,
                !item.isPast && !item.isToday && styles.futureText,
                item.isToday && styles.todayDateText,
              ]}
            >
              {item.date}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
    minWidth: 36,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  dateWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
  },
  pastText: {
    color: Colors.gray300,
  },
  futureText: {
    color: Colors.background,
  },
  todayText: {
    color: Colors.primary,
  },
  todayCircle: {
    backgroundColor: Colors.primary,
  },
  todayDateText: {
    color: Colors.white,
    fontWeight: '600',
  },
});
```

## Verification Checklist

- [x] Calendar displays current week (Monday through Sunday)
- [x] Today's date is highlighted with primary color (#FF5A16)
- [x] All day columns are vertically aligned
- [x] Past days appear muted (gray)
- [x] Future days appear in normal color
- [x] Month boundaries display correctly (test on month-end dates)
- [x] Single and double-digit dates align properly

## Running the App

```bash
npx expo start
```

## Testing

1. Open the home screen
2. Verify the displayed week matches the current week
3. Verify today's date has the orange (#FF5A16) highlight
4. Visually confirm all day columns are at the same horizontal level
