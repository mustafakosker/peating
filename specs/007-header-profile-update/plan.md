# Implementation Plan: Header Profile Update

**Branch**: `007-header-profile-update` | **Date**: 2026-03-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-header-profile-update/spec.md`

## Summary

Update the home screen header to display "Peating" as the app title instead of the "Good Morning" greeting, while maintaining the profile picture in the top left corner and preserving existing action buttons. This is a straightforward UI modification to the existing `HeaderBar` component.

## Technical Context

**Language/Version**: TypeScript 5.9 with React 19.1
**Primary Dependencies**: React Native 0.81.5, Expo SDK 54, @expo/vector-icons
**Storage**: N/A (no data persistence changes)
**Testing**: Manual visual testing (Jest available but no UI tests defined)
**Target Platform**: iOS/Android via Expo
**Project Type**: mobile-app
**Performance Goals**: Header renders within 100ms (existing performance maintained)
**Constraints**: Must match existing app typography and color scheme
**Scale/Scope**: Single component modification (HeaderBar.tsx)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is a template placeholder - no specific gates defined. Proceeding with standard best practices:

- [x] **Minimal Change**: Modifying existing component rather than creating new ones
- [x] **Backward Compatible**: Existing HeaderBar props remain functional
- [x] **No New Dependencies**: Using existing project dependencies
- [x] **Testable**: Visual changes can be verified manually

## Project Structure

### Documentation (this feature)

```text
specs/007-header-profile-update/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal - no data changes)
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── (tabs)/
│   └── index.tsx        # Home screen - uses HeaderBar
└── _layout.tsx

components/
├── HeaderBar.tsx        # PRIMARY CHANGE - update greeting to title
└── [other components]

constants/
└── Colors.ts            # Existing colors (no changes needed)
```

**Structure Decision**: Single component modification in existing structure. No new files or directories required.

## Complexity Tracking

No constitution violations. This is a minimal UI change:
- Single component modified
- No new dependencies
- No architectural changes
- Existing patterns preserved

## Implementation Approach

### Changes Required

1. **HeaderBar.tsx** - Update component to:
   - Replace `greeting` prop with `title` prop (or repurpose existing)
   - Change default text from "Good Morning" to "Peating"
   - Update styling for title (larger font, brand emphasis)
   - Keep profile picture on left, title next to it
   - Preserve action buttons on right

2. **app/(tabs)/index.tsx** - Update usage:
   - Remove `greeting="Good Morning"` prop
   - Pass new title prop or rely on default

### Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Prop naming | Rename `greeting` to `title` | Reflects new purpose; backward compatible if default set |
| Title styling | Increase font size to 24px, weight 600 | Match section titles in app for brand prominence |
| Layout | Keep profile picture left, title right of avatar | Maintains visual balance, familiar pattern |
