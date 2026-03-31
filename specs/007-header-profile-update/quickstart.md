# Quickstart: Header Profile Update

**Feature**: 007-header-profile-update
**Date**: 2026-03-31

## Overview

Update the home screen header to display "Peating" brand title instead of "Good Morning" greeting, maintaining profile picture on left.

## Prerequisites

- Expo development environment set up
- Project dependencies installed (`npm install`)

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `components/HeaderBar.tsx` | MODIFY | Update props and styling |
| `app/(tabs)/index.tsx` | MODIFY | Update HeaderBar usage |

## Implementation Steps

### Step 1: Update HeaderBar Component

1. Rename `greeting` prop to `title`
2. Change default value from `'Good Morning'` to `'Peating'`
3. Rename `greeting` style to `title` style
4. Update font size to 24px for brand prominence
5. Update font weight to 600

### Step 2: Update Home Screen

1. Remove `greeting="Good Morning"` prop from `<HeaderBar />`
2. Component will use default `title="Peating"`

## Verification Checklist

- [ ] App compiles without TypeScript errors (`npx tsc --noEmit`)
- [ ] Header displays "Peating" title on home screen
- [ ] Profile picture (or placeholder) visible on left
- [ ] "Good Morning" text no longer appears
- [ ] Action buttons (diamond, notifications) still visible on right
- [ ] Header layout is visually balanced
- [ ] Test on iOS simulator/device
- [ ] Test on Android emulator/device

## Running the App

```bash
# Start development server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android
```

## Expected Result

Header should display:
- Left: Profile picture (circular, with placeholder if no image)
- Center-left: "Peating" title text (24px, white, semi-bold)
- Right: Diamond and notification action buttons
