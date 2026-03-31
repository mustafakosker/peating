# Implementation Plan: Peaty Meals Tab Redesign

**Branch**: `008-peaty-meals-tab` | **Date**: 2026-03-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-peaty-meals-tab/spec.md`

## Summary

Rebrand the Diets tab to "Peaty Meals" with updated sub-tabs ("Recommended" and "Favorite" instead of "All Diets" and "My Diets"), remove the promotional banner, and update the section title. This is a pure UI relabeling change with no data model or backend modifications.

## Technical Context

**Language/Version**: TypeScript 5.9 with React 19.1
**Primary Dependencies**: React Native 0.81.5, Expo SDK 54, @expo/vector-icons
**Storage**: N/A (no data persistence changes)
**Testing**: Manual visual testing (no automated tests defined)
**Target Platform**: iOS/Android via Expo
**Project Type**: mobile-app
**Performance Goals**: Existing performance maintained (no functional changes)
**Constraints**: Must match existing app typography and color scheme
**Scale/Scope**: Single screen modification (diets.tsx)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is a template placeholder - no specific gates defined. Proceeding with standard best practices:

- [x] **Minimal Change**: Modifying existing screen rather than creating new ones
- [x] **No New Dependencies**: Using existing project dependencies
- [x] **No Data Model Changes**: Pure UI text/label updates
- [x] **Testable**: Visual changes can be verified manually

## Project Structure

### Documentation (this feature)

```text
specs/008-peaty-meals-tab/
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
│   └── diets.tsx        # PRIMARY CHANGE - rename labels, remove banner
└── _layout.tsx

components/
├── TabSwitcher.tsx      # Existing component (no changes)
├── DietCard.tsx         # Existing component (no changes)
└── [other components]

constants/
└── Colors.ts            # Existing colors (no changes needed)
```

**Structure Decision**: Single screen modification in existing structure. No new files or directories required.

## Complexity Tracking

No constitution violations. This is a minimal UI change:
- Single file modified (diets.tsx)
- No new dependencies
- No architectural changes
- Existing patterns preserved

## Implementation Approach

### Changes Required

1. **diets.tsx** - Update screen to:
   - Change header title from "Diets" to "Peaty Meals"
   - Change TabSwitcher tabs from `['All Diets', 'My Diets']` to `['Recommended', 'Favorite']`
   - Remove the banner View (lines 69-74 and related styles)
   - Change section title from "Diets" to "Meals"
   - Remove unused banner styles from StyleSheet

### Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Header title | "Peaty Meals" | Aligns with app branding (Peating) |
| Tab labels | "Recommended" / "Favorite" | More descriptive than "All Diets" / "My Diets" |
| Banner removal | Complete removal | Cleaner UI, focus on meal content |
| Section title | "Meals" | Consistent with new branding |
| Data arrays | Keep DIETS/MY_DIETS names | Internal implementation detail, no user impact |
