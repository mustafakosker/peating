# Research: Expo Shell App with Bottom Tab Navigation

**Date**: 2026-03-30
**Feature**: 001-expo-shell-navigation

## Research Summary

This document consolidates research findings for implementing a bottom tab navigation shell app using Expo.

---

## 1. Navigation Library Selection

**Decision**: expo-router with Tabs layout

**Rationale**:
- expo-router is the official Expo recommendation for navigation (supersedes React Navigation direct usage)
- File-based routing reduces boilerplate and provides automatic deep linking
- Built-in TypeScript support with type-safe routes
- The `(tabs)` folder convention creates bottom tab navigation automatically
- Supports tab bar customization through the `_layout.tsx` file

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|--------------|
| React Navigation (direct) | expo-router wraps it and adds file-based routing benefits |
| React Native Navigation (Wix) | Requires native code modifications, not compatible with Expo managed workflow |
| Custom navigation | Unnecessary complexity for standard tab navigation |

---

## 2. Project Initialization Approach

**Decision**: `npx create-expo-app` with tabs template

**Rationale**:
- Official Expo template includes proper TypeScript configuration
- Pre-configured with expo-router and tabs example
- Includes recommended folder structure
- Sets up testing infrastructure with Jest

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|--------------|
| Blank template | Would require manual setup of router, tabs, and TypeScript |
| Manual npm init | Missing Expo-specific configurations and metro bundler setup |

---

## 3. Icon Library

**Decision**: @expo/vector-icons (Ionicons set)

**Rationale**:
- Bundled with Expo, no additional installation needed
- Ionicons provides home, document/list, and settings icons that match spec requirements
- Cross-platform consistency between iOS and Android
- Large icon set for future feature expansion

**Icon Mapping**:
| Tab | Icon Name (Ionicons) |
|-----|---------------------|
| Home | `home` / `home-outline` |
| Food Log | `restaurant` / `restaurant-outline` or `list` / `list-outline` |
| Settings | `settings` / `settings-outline` |

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|--------------|
| Custom SVG icons | Additional complexity, no benefit for standard icons |
| react-native-vector-icons | Not pre-bundled with Expo, requires config |
| SF Symbols / Material Icons only | Platform-specific, Ionicons provides unified experience |

---

## 4. Tab Bar Styling Strategy

**Decision**: Use expo-router's tabBarOptions with platform-adaptive styling

**Rationale**:
- Default styling follows platform conventions (iOS/Android)
- Active/inactive colors configurable in `_layout.tsx`
- Supports both icon tinting and label styling
- No custom component needed for basic requirements

**Implementation Approach**:
```
Tab bar configuration in (tabs)/_layout.tsx:
- tabBarActiveTintColor: Primary brand color
- tabBarInactiveTintColor: Muted gray
- headerShown: true (show screen title)
```

---

## 5. Screen Structure

**Decision**: Minimal placeholder screens with centered title

**Rationale**:
- Shell app only needs to demonstrate navigation works
- Each screen displays its name prominently
- Consistent layout across all three screens
- Easy to extend with actual content later

**Screen Components**:
| Screen | File | Content |
|--------|------|---------|
| Home | `app/(tabs)/index.tsx` | Centered "Home" title, default tab |
| Food Log | `app/(tabs)/food-log.tsx` | Centered "Food Log" title |
| Settings | `app/(tabs)/settings.tsx` | Centered "Settings" title |

---

## 6. Testing Strategy

**Decision**: Jest + React Native Testing Library

**Rationale**:
- Expo includes Jest configuration out of the box
- React Native Testing Library provides component testing utilities
- Can test navigation state and screen rendering
- Supports snapshot testing for UI consistency

**Test Coverage Plan**:
1. Each screen renders without crashing
2. Screen displays correct title
3. Tab navigation changes active screen
4. Active tab indicator updates correctly

---

## 7. State Persistence (Navigation)

**Decision**: Rely on expo-router's default behavior

**Rationale**:
- expo-router preserves navigation state during app lifecycle
- Navigation state survives background/foreground transitions
- No additional configuration needed for FR-007 (state preservation)

---

## 8. Orientation Support

**Decision**: Support both portrait and landscape via app.json

**Rationale**:
- Matches assumption in spec
- Tab bar adapts automatically to orientation changes
- Expo handles safe area insets for different orientations

**Configuration**:
```json
{
  "expo": {
    "orientation": "default"
  }
}
```

---

## Open Questions Resolved

| Original Question | Resolution |
|-------------------|------------|
| Which navigation library? | expo-router (official Expo recommendation) |
| Icon set for tabs? | Ionicons via @expo/vector-icons |
| Active tab indicator style? | Platform default with tint color customization |
| Screen layout? | Centered title placeholder for shell app |

---

## Dependencies Summary

| Package | Purpose | Version Strategy |
|---------|---------|-----------------|
| expo | Core Expo SDK | Latest stable |
| expo-router | File-based navigation | Bundled with expo |
| @expo/vector-icons | Tab bar icons | Bundled with expo |
| react-native | Runtime | Managed by Expo |
| typescript | Type safety | ^5.0 |
| jest | Testing | Bundled with expo |
| @testing-library/react-native | Component testing | Latest |
