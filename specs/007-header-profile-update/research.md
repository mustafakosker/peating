# Research: Header Profile Update

**Feature**: 007-header-profile-update
**Date**: 2026-03-31

## Summary

This is a minimal UI change with no unknowns requiring research. All technical decisions are straightforward modifications to existing code.

## Decisions

### 1. Component Modification Approach

**Decision**: Modify existing `HeaderBar` component in place

**Rationale**:
- Component already has the required structure (avatar, text, action buttons)
- No need to create new components
- Maintains consistency with existing codebase patterns

**Alternatives considered**:
- Create new `BrandedHeaderBar` component → Rejected (unnecessary complexity)
- Remove `HeaderBar` and inline in home screen → Rejected (breaks reusability)

### 2. Prop API Changes

**Decision**: Replace `greeting` prop with `title` prop, default to "Peating"

**Rationale**:
- Clearer semantic meaning for app branding
- Single prop change, minimal API surface change
- Default value ensures no breaking changes for callers

**Alternatives considered**:
- Keep `greeting` prop but change default → Rejected (semantically incorrect)
- Add both `greeting` and `title` props → Rejected (unnecessary complexity)

### 3. Typography for Brand Title

**Decision**: Use 24px font size, 600 weight (matching section titles)

**Rationale**:
- Consistent with existing `sectionTitle` style in the app
- Creates visual hierarchy with app name prominent
- Uses existing `Colors.white` for consistency

**Alternatives considered**:
- Use different/larger size → Rejected (would look out of place)
- Add custom brand color → Rejected (spec says follow existing color scheme)

### 4. Profile Picture Position

**Decision**: Keep existing position (left side of header, unchanged)

**Rationale**:
- Current HeaderBar already has avatar on left
- Spec confirms "profile picture on top left corner" - already implemented
- No layout changes needed for avatar position

**Alternatives considered**:
- Move avatar after title → Rejected (spec explicitly says "top left corner")

## No Further Research Required

All technical decisions resolved. Ready for Phase 1 design artifacts.
