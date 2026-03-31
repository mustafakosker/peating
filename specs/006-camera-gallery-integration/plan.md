# Implementation Plan: Camera and Gallery Integration

**Branch**: `006-camera-gallery-integration` | **Date**: 2026-03-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-camera-gallery-integration/spec.md`

## Summary

Replace the placeholder image in the food scanning page with real camera preview using `expo-camera` and gallery integration using `expo-image-picker`. Users can capture food photos or select existing images, which are persisted to app storage for use by the food recognition feature.

## Technical Context

**Language/Version**: TypeScript 5.9 with React 19.1 / React Native 0.81
**Primary Dependencies**: expo-camera, expo-image-picker, expo-file-system, expo-linking (existing)
**Storage**: expo-file-system (document directory for captured images)
**Testing**: Manual visual testing on physical device (camera requires real hardware)
**Target Platform**: iOS 15+, Android (Expo SDK 54 managed workflow)
**Project Type**: Mobile app (React Native + Expo)
**Performance Goals**: Camera preview within 1 second, photo capture within 3 seconds
**Constraints**: Expo managed workflow (no native code ejection), offline-capable image storage
**Scale/Scope**: Single screen modification (scan.tsx), 2 new components, 1 service, 1 type file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is template-only (not customized for this project). No specific gates to evaluate.

**Post-Design Check**: ✅ Pass - Implementation follows existing project patterns, uses first-party Expo libraries, and maintains managed workflow compatibility.

## Project Structure

### Documentation (this feature)

```text
specs/006-camera-gallery-integration/
├── plan.md              # This file
├── research.md          # Phase 0 output - library selection decisions
├── data-model.md        # Phase 1 output - entity definitions
├── quickstart.md        # Phase 1 output - implementation guide
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
app/
└── (tabs)/
    └── scan.tsx           # MODIFY - integrate camera and gallery

components/
├── ScanModeButton.tsx     # EXISTING - no changes
└── PermissionDenied.tsx   # CREATE - permission denied UI

services/
└── imageStorage.ts        # CREATE - image persistence service

types/
└── camera.ts              # CREATE - type definitions
```

**Structure Decision**: Single mobile app structure following existing Expo Router conventions. New files added to existing component, service, and type directories at repository root level.

## Complexity Tracking

No complexity violations. Implementation uses:
- First-party Expo libraries (no native modules)
- Single screen modification
- Minimal new components (1 UI component, 1 service)
- Standard React patterns (hooks, refs)

## New Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| expo-camera | ~16.x | Camera preview and photo capture |
| expo-image-picker | ~16.x | Gallery image selection |
| expo-file-system | ~19.x | Persistent image storage |

**Installation**: `npx expo install expo-camera expo-image-picker expo-file-system`

## Files Changed Summary

| File | Change Type | Description |
|------|-------------|-------------|
| `types/camera.ts` | CREATE | Type definitions for CapturedImage, CameraError |
| `services/imageStorage.ts` | CREATE | Image persistence with expo-file-system |
| `components/PermissionDenied.tsx` | CREATE | Permission denied UI with settings link |
| `app/(tabs)/scan.tsx` | MODIFY | Integrate real camera and gallery |

## Implementation Notes

1. **Camera Library**: Using `expo-camera` CameraView component with ref-based capture
2. **Gallery Picker**: Using `expo-image-picker` launchImageLibraryAsync
3. **Permissions**: Built-in hooks from expo-camera and expo-image-picker
4. **Image Storage**: Copy captured/selected images to `${documentDirectory}food-images/`
5. **Mode Switching**: Preserve capturedImage state across mode transitions
6. **Barcode Mode**: Placeholder only (out of scope for this feature)

## Next Steps

Run `/speckit.tasks` to generate the implementation task list.
