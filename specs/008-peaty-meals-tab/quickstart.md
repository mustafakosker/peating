# Quickstart: Peaty Meals Tab Redesign

**Feature Branch**: `008-peaty-meals-tab`
**Created**: 2026-03-31

## Overview

Rebrand the Diets tab to "Peaty Meals" with updated sub-tab labels and remove the promotional banner.

## Changes Summary

| Change | Location | Details |
|--------|----------|---------|
| Header title | Line 61 | "Diets" → "Peaty Meals" |
| Tab labels | Line 64 | `['All Diets', 'My Diets']` → `['Recommended', 'Favorite']` |
| Banner removal | Lines 69-74 | Remove entire `<View style={styles.banner}>` block |
| Section title | Line 77 | "Diets" → "Meals" |
| Unused styles | Lines 117-135 | Remove `banner`, `bannerTitle`, `bannerSubtitle` styles |

## File Modified

- `app/(tabs)/diets.tsx`

## Verification Checklist

After implementation, verify:

- [ ] Header shows "Peaty Meals" instead of "Diets"
- [ ] First tab shows "Recommended" instead of "All Diets"
- [ ] Second tab shows "Favorite" instead of "My Diets"
- [ ] No banner visible at top of screen
- [ ] Section title shows "Meals" instead of "Diets"
- [ ] Tab switching still works correctly
- [ ] Meal cards display properly in both tabs
- [ ] TypeScript compilation passes (`npx tsc --noEmit`)

## Quick Test

1. Run `npx expo start`
2. Navigate to the meals tab (formerly diets tab)
3. Verify all label changes
4. Switch between Recommended and Favorite tabs
5. Confirm no banner is visible

## Rollback

If issues occur, revert changes to `app/(tabs)/diets.tsx`:
```bash
git checkout app/(tabs)/diets.tsx
```
