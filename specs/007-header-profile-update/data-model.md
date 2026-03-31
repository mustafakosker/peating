# Data Model: Header Profile Update

**Feature**: 007-header-profile-update
**Date**: 2026-03-31

## Summary

This feature involves no data model changes. It is a purely visual/UI modification to the existing `HeaderBar` component.

## Entities

No new entities introduced.

## Component Props (Interface Changes)

### HeaderBar Props

**Before**:
```typescript
type HeaderBarProps = {
  greeting?: string;  // Default: 'Good Morning'
  avatarUrl?: string;
};
```

**After**:
```typescript
type HeaderBarProps = {
  title?: string;     // Default: 'Peating'
  avatarUrl?: string;
};
```

### Change Details

| Field | Change | Notes |
|-------|--------|-------|
| `greeting` | Renamed to `title` | Semantic change reflecting brand title vs greeting |
| `avatarUrl` | Unchanged | Profile picture URL remains same |

## State Management

No state changes. The header displays static content based on props.

## Data Flow

```
HomeScreen (index.tsx)
    └── HeaderBar (title="Peating", avatarUrl=undefined)
            ├── Avatar (placeholder or image)
            ├── Title ("Peating")
            └── Action buttons (unchanged)
```

## Validation Rules

- `title`: Optional string, defaults to "Peating" if not provided
- `avatarUrl`: Optional string, displays placeholder icon if not provided or fails to load
