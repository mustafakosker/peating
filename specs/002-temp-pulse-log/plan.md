# Implementation Plan: Temp & Pulse Log

**Branch**: `002-temp-pulse-log` | **Date**: 2026-03-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-temp-pulse-log/spec.md`

## Summary

Add a Temp & Pulse vital signs section to the home page, positioned above the calories tracker. The section displays today's most recent temperature and pulse readings with trend indicators (up/down/stable). Users tap the section to open a bottom sheet for adding new readings. All data is stored locally using AsyncStorage.

## Technical Context

**Language/Version**: TypeScript 5.9, React Native 0.81 with Expo SDK 54
**Primary Dependencies**: @react-native-async-storage/async-storage, @gorhom/bottom-sheet, react-native-reanimated
**Storage**: AsyncStorage (local key-value persistence)
**Testing**: Jest (configured via `npm test`)
**Target Platform**: iOS and Android (Expo managed workflow)
**Project Type**: Mobile app
**Performance Goals**: Vitals display within 1 second of home screen load
**Constraints**: Offline-capable, local-only storage (no cloud sync)
**Scale/Scope**: Single user per device, today's readings only (no history view)

## Constitution Check

*No project constitution is defined. Proceeding with standard React Native/Expo conventions.*

## Project Structure

### Documentation (this feature)

```text
specs/002-temp-pulse-log/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 - Technical research
├── data-model.md        # Phase 1 - Data model design
├── quickstart.md        # Phase 1 - Implementation guide
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (repository root)

```text
app/
├── (tabs)/
│   └── index.tsx        # MODIFY: Add VitalsCard above CaloriesCard
└── _layout.tsx          # MODIFY: Add GestureHandlerRootView wrapper

components/
├── VitalsCard.tsx       # NEW: Main vitals display component
├── AddVitalSheet.tsx    # NEW: Bottom sheet for adding readings
└── index.ts             # MODIFY: Export new components

services/
└── vitalsService.ts     # NEW: Storage and business logic

types/
└── vitals.ts            # NEW: TypeScript interfaces
```

**Structure Decision**: Follows existing Expo Router structure with components in `/components`, services in new `/services` directory, and types in new `/types` directory.

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @react-native-async-storage/async-storage | ^2.1.0 | Local data persistence |
| @gorhom/bottom-sheet | ^5.1.0 | Bottom sheet UI component |
| react-native-reanimated | ^3.16.0 | Animation library (bottom-sheet dependency) |
| react-native-gesture-handler | ^2.22.0 | Gesture handling (bottom-sheet dependency) |

## Component Design

### VitalsCard

**Purpose**: Display today's temperature and pulse readings with trend indicators

**Props**:
```typescript
interface VitalsCardProps {
  temperature: number | null;
  tempUnit: 'F' | 'C';
  tempTrend: TrendDirection;
  pulse: number | null;
  pulseTrend: TrendDirection;
  onPress: () => void;
}
```

**Visual Layout**:
```
┌──────────────────────────────────────┐
│  [Temp Icon]  98.6°F  [↑]           │
│  [Heart Icon]   72 BPM  [→]         │
│                          Tap to add  │
└──────────────────────────────────────┘
```

### AddVitalSheet

**Purpose**: Bottom sheet form for entering new readings

**Sections**:
1. Temperature input (numeric, with unit toggle F/C)
2. Pulse input (numeric, BPM)
3. Save and Cancel buttons

**Validation**:
- Temperature: 95-108°F or 35-42°C
- Pulse: 30-220 BPM

## Implementation Phases

### Phase 1: Foundation (Dependencies & Types)

1. Install dependencies
2. Configure babel for Reanimated
3. Create `types/vitals.ts`
4. Create `services/vitalsService.ts` with storage operations

### Phase 2: UI Components

1. Create `components/VitalsCard.tsx`
2. Create `components/AddVitalSheet.tsx`
3. Export from `components/index.ts`

### Phase 3: Integration

1. Wrap app with GestureHandlerRootView in `app/_layout.tsx`
2. Add VitalsCard to `app/(tabs)/index.tsx`
3. Wire up bottom sheet presentation
4. Connect to vitalsService for data persistence

### Phase 4: Polish & Testing

1. Handle empty state (no readings)
2. Implement trend calculation
3. Add validation error display
4. Test all acceptance scenarios from spec

## Acceptance Criteria Mapping

| Requirement | Implementation |
|-------------|----------------|
| FR-001: Vitals section above calories | VitalsCard placed before CaloriesCard in index.tsx |
| FR-002: Most recent temperature | vitalsService.getLatestByType('temperature') |
| FR-003: Most recent pulse | vitalsService.getLatestByType('pulse') |
| FR-004: Tap to add via bottom sheet | AddVitalSheet with @gorhom/bottom-sheet |
| FR-005: Temperature validation | validateTemperature() in vitalsService |
| FR-006: Pulse validation | validatePulse() in vitalsService |
| FR-007: Trend indicator | calculateTrend() with 2% tolerance |
| FR-008: Persist with timestamps | AsyncStorage with ISO timestamps |
| FR-009: Placeholder when no readings | VitalsCard empty state rendering |
| FR-010: Cancel without saving | AddVitalSheet close/cancel action |
| FR-011: Local storage only | AsyncStorage with no network calls |

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Reanimated conflicts | Use compatible versions, clear cache after install |
| Bottom sheet gesture conflicts | Wrap only necessary screens, test on both platforms |
| AsyncStorage data loss | Document as v1 limitation, future scope for backup |

## Next Steps

After plan approval, run `/speckit.tasks` to generate the task breakdown for implementation.
