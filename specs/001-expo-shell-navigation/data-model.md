# Data Model: Expo Shell App with Bottom Tab Navigation

**Date**: 2026-03-30
**Feature**: 001-expo-shell-navigation

## Overview

This is a shell/skeleton application with no data persistence requirements. The data model is intentionally minimal, documenting only the navigation-related structures.

---

## Entities

### Tab Configuration

Represents the configuration for each tab in the bottom navigation.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Route name (e.g., "index", "food-log", "settings") |
| title | string | Display title shown in header and tab |
| icon | string | Ionicons icon name |
| iconFocused | string | Ionicons icon name when tab is active |

**Instances**:

| name | title | icon | iconFocused |
|------|-------|------|-------------|
| index | Home | home-outline | home |
| food-log | Food Log | restaurant-outline | restaurant |
| settings | Settings | settings-outline | settings |

---

## State

### Navigation State (managed by expo-router)

| Property | Type | Description |
|----------|------|-------------|
| activeTab | string | Currently selected tab route name |
| history | string[] | Stack of visited tabs (for back navigation) |

**Note**: Navigation state is managed internally by expo-router and persists across app lifecycle automatically.

---

## Relationships

```
App
└── TabNavigator
    ├── HomeScreen (index)
    ├── FoodLogScreen (food-log)
    └── SettingsScreen (settings)
```

---

## Data Flow

1. **App Launch** → TabNavigator initializes with `index` (Home) as active tab
2. **Tab Press** → expo-router updates activeTab, renders corresponding screen
3. **Background/Resume** → expo-router restores previous activeTab state

---

## Future Extensions

When actual features are implemented, the following entities may be added:

| Feature | Potential Entities |
|---------|-------------------|
| Food Log | FoodEntry, Meal, NutritionInfo |
| Settings | UserPreferences, AppSettings |
| Home | Dashboard widgets, Summary data |

These are documented here for planning purposes only and are **out of scope** for the current shell app implementation.
