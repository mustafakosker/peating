# Research: Peaty Meals Tab Redesign

**Feature Branch**: `008-peaty-meals-tab`
**Created**: 2026-03-31
**Phase**: 0 (Discovery)

## Current State Analysis

### Existing diets.tsx Structure

**File**: `app/(tabs)/diets.tsx` (148 lines)

**Current UI Elements**:
- Header title: "Diets" (line 61)
- Tab labels: `['All Diets', 'My Diets']` (line 64)
- Banner: "Explore Diet Plans" with subtitle (lines 69-74)
- Section title: "Diets" (line 77)

**Data Arrays** (mock data):
- `DIETS`: 3 items for "All Diets" tab
- `MY_DIETS`: 1 item for "My Diets" tab

**Components Used**:
- `TabSwitcher` - handles tab switching UI
- `DietCard` - displays individual diet/meal cards
- `SafeAreaView`, `ScrollView` - layout components

### Styles to Modify/Remove

Current banner styles (lines 117-135):
```typescript
banner: { ... }
bannerTitle: { ... }
bannerSubtitle: { ... }
```

These styles will be removed as they're only used by the banner.

## Technical Findings

### No Dependencies to Update
- All changes are local to `diets.tsx`
- No shared state or context affected
- No navigation changes required

### Component Compatibility
- `TabSwitcher` accepts any string array for tabs - no changes needed
- `DietCard` is unaffected - displays same data

### Naming Decision
- Internal data arrays (`DIETS`, `MY_DIETS`) can remain unchanged
- Only user-facing labels need updates

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Typo in new labels | Low | Low | Visual review |
| Missed text reference | Low | Low | Search codebase for "Diets" |
| Style orphaning | None | None | Remove banner styles when removing banner |

## Research Conclusion

This is a straightforward UI relabeling task:
- Single file modification
- No architectural changes
- No new dependencies
- Existing patterns preserved

Ready to proceed to implementation planning.
