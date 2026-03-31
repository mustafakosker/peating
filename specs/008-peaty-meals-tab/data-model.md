# Data Model: Peaty Meals Tab Redesign

**Feature Branch**: `008-peaty-meals-tab`
**Created**: 2026-03-31
**Phase**: 1 (Design)

## Data Model Overview

**No data model changes required.**

This feature is a pure UI relabeling change. The underlying data structures, state management, and component props remain unchanged.

## Current Data Structures (Unchanged)

### Diet Item Type (inferred from usage)

```typescript
interface DietItem {
  id: string;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
}
```

### Data Arrays

```typescript
const DIETS: DietItem[] = [...];    // "Recommended" meals (tab 0)
const MY_DIETS: DietItem[] = [...]; // "Favorite" meals (tab 1)
```

**Note**: Internal array names remain `DIETS` and `MY_DIETS` - only user-facing labels change.

## State (Unchanged)

```typescript
const [activeTab, setActiveTab] = useState(0);
```

- `activeTab === 0`: Shows DIETS array (now labeled "Recommended")
- `activeTab === 1`: Shows MY_DIETS array (now labeled "Favorite")

## What Changes

| Element | From | To |
|---------|------|-----|
| Header title | "Diets" | "Peaty Meals" |
| Tab 0 label | "All Diets" | "Recommended" |
| Tab 1 label | "My Diets" | "Favorite" |
| Section title | "Diets" | "Meals" |
| Banner | Present | Removed |

## What Does NOT Change

- Diet/meal item structure
- Data arrays and their contents
- Tab switching logic
- DietCard component interface
- Navigation routing
- Screen name in file system
