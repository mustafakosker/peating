# Tasks: Camera and Gallery Integration

**Input**: Design documents from `/specs/006-camera-gallery-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Manual visual testing only (no automated tests requested)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile app**: `app/(tabs)/`, `components/`, `services/`, `types/` at repository root
- Paths use repository root as base

---

## Phase 1: Setup

**Purpose**: Install dependencies and create foundational infrastructure

- [x] T001 Install expo-camera, expo-image-picker, expo-file-system dependencies via `npx expo install expo-camera expo-image-picker expo-file-system`
- [x] T002 [P] Create types/camera.ts with CapturedImage, ImageSource, and CameraError type definitions
- [x] T003 [P] Create services/imageStorage.ts with ensureImageDirectory, saveImage, and generateUUID functions

**Checkpoint**: Dependencies installed, types and storage service ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared components needed by multiple user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create components/PermissionDenied.tsx with type prop for camera/gallery, icon, title, message, and Open Settings button
- [x] T005 Style PermissionDenied component (container, iconContainer, title, message, button styles) in components/PermissionDenied.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Capture Food Photo with Camera (Priority: P1) 🎯 MVP

**Goal**: Users can capture food photos using device camera with live preview and persist images to app storage

**Independent Test**: Open scan screen, grant camera permission, verify live preview displays, tap capture button, verify photo is taken and displayed in frame

### Implementation for User Story 1

- [x] T006 [US1] Import expo-camera (CameraView, useCameraPermissions) in app/(tabs)/scan.tsx
- [x] T007 [US1] Add cameraPermission state using useCameraPermissions hook in app/(tabs)/scan.tsx
- [x] T008 [US1] Add cameraRef using useRef<CameraView> in app/(tabs)/scan.tsx
- [x] T009 [US1] Add cameraReady state for camera initialization tracking in app/(tabs)/scan.tsx
- [x] T010 [US1] Add capturedImage state of type CapturedImage | null in app/(tabs)/scan.tsx
- [x] T011 [US1] Import PermissionDenied component and saveImage service in app/(tabs)/scan.tsx
- [x] T012 [US1] Implement handleCapture function using cameraRef.takePictureAsync and saveImage in app/(tabs)/scan.tsx
- [x] T013 [US1] Replace placeholder Image with CameraView component showing live preview in app/(tabs)/scan.tsx
- [x] T014 [US1] Add renderCameraContent function to conditionally show camera, captured image, or PermissionDenied in app/(tabs)/scan.tsx
- [x] T015 [US1] Add useEffect to request camera permission on component mount in app/(tabs)/scan.tsx
- [x] T016 [US1] Wire capture button onPress to handleCapture function in app/(tabs)/scan.tsx
- [x] T017 [US1] Add previewContainer and camera styles in app/(tabs)/scan.tsx
- [ ] T018 [US1] Test camera permission prompt appears on first access
- [ ] T019 [US1] Test live camera preview displays when permission granted
- [ ] T020 [US1] Test capture button takes photo and displays in frame
- [ ] T021 [US1] Test PermissionDenied shows with Open Settings button when permission denied

**Checkpoint**: At this point, User Story 1 should be fully functional - camera capture works independently

---

## Phase 4: User Story 2 - Select Food Photo from Gallery (Priority: P1)

**Goal**: Users can select existing photos from device gallery and persist them to app storage

**Independent Test**: Select Gallery mode, grant photo library permission, choose a photo from gallery, verify selected image displays in frame

### Implementation for User Story 2

- [x] T022 [US2] Import expo-image-picker (launchImageLibraryAsync, useMediaLibraryPermissions) in app/(tabs)/scan.tsx
- [x] T023 [US2] Add mediaLibraryPermission state using useMediaLibraryPermissions hook in app/(tabs)/scan.tsx
- [x] T024 [US2] Implement handlePickImage function to open gallery picker and save selected image in app/(tabs)/scan.tsx
- [x] T025 [US2] Add permission check and request in handlePickImage before opening picker in app/(tabs)/scan.tsx
- [x] T026 [US2] Handle gallery picker cancellation (return previous state) in app/(tabs)/scan.tsx
- [x] T027 [US2] Update renderCameraContent to show selected gallery image in scanning frame in app/(tabs)/scan.tsx
- [x] T028 [US2] Wire capture button to handlePickImage when in gallery mode in app/(tabs)/scan.tsx
- [ ] T029 [US2] Test gallery picker opens when Gallery mode selected
- [ ] T030 [US2] Test selected photo displays in frame
- [ ] T031 [US2] Test cancellation returns to previous state without changes

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Switch Between Scan Modes (Priority: P2)

**Goal**: Users can seamlessly switch between camera, barcode, and gallery modes with UI updates

**Independent Test**: Tap each mode button, verify header title updates, verify appropriate content displays for each mode, verify captured image persists across mode switches

### Implementation for User Story 3

- [x] T032 [US3] Implement handleModeChange function to update activeMode state in app/(tabs)/scan.tsx
- [x] T033 [US3] Update handleModeChange to trigger handlePickImage when switching to gallery mode in app/(tabs)/scan.tsx
- [x] T034 [US3] Add dynamic headerTitle based on activeMode (AI Camera, AI Barcode, Gallery) in app/(tabs)/scan.tsx
- [x] T035 [US3] Ensure capturedImage state persists when switching between modes in app/(tabs)/scan.tsx
- [x] T036 [US3] Update mode button onPress handlers to use handleModeChange in app/(tabs)/scan.tsx
- [ ] T037 [US3] Test mode switching updates header title correctly
- [ ] T038 [US3] Test captured/selected image persists across mode transitions
- [ ] T039 [US3] Test barcode mode shows placeholder (out of scope for this feature)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Verification

**Purpose**: Final testing and edge case verification

- [ ] T040 [P] Test camera permission denied state shows PermissionDenied with Open Settings link
- [ ] T041 [P] Test gallery permission denied state shows appropriate message
- [ ] T042 [P] Verify images persist to app storage directory (food-images/)
- [ ] T043 Test on physical device for full camera functionality
- [ ] T044 Run quickstart.md verification checklist
- [x] T045 TypeScript compilation check (npx tsc --noEmit)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **User Story 2 (Phase 4)**: Depends on Foundational phase completion (can run parallel with US1)
- **User Story 3 (Phase 5)**: Depends on US1 and US2 completion (needs both camera and gallery working)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent - camera capture functionality
- **User Story 2 (P1)**: Independent - can run in parallel with US1 (different functions/logic)
- **User Story 3 (P2)**: Depends on US1 and US2 - mode switching requires both to be functional

### Within Each User Story

- Imports and state setup before handlers
- Handler implementation before UI integration
- UI integration before testing
- Testing validates story completeness

### Parallel Opportunities

- T002 and T003 can run in parallel (different files)
- T004 and T005 are sequential (same file)
- US1 and US2 can be implemented in parallel after Foundational phase
- T040, T041, T042 can run in parallel (different test scenarios)

---

## Parallel Example: Setup Phase

```bash
# Launch types and service creation in parallel:
Task: "Create types/camera.ts with CapturedImage, ImageSource, and CameraError type definitions"
Task: "Create services/imageStorage.ts with ensureImageDirectory, saveImage, and generateUUID functions"
```

---

## Parallel Example: User Stories 1 & 2

```bash
# After Foundational phase, both user stories can start in parallel:
# Developer A: User Story 1 (Camera capture)
Task: "Import expo-camera (CameraView, useCameraPermissions) in app/(tabs)/scan.tsx"

# Developer B: User Story 2 (Gallery selection)
# Note: Working on different functions/sections of same file
Task: "Import expo-image-picker (launchImageLibraryAsync, useMediaLibraryPermissions) in app/(tabs)/scan.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (creates PermissionDenied component)
3. Complete Phase 3: User Story 1 (camera capture)
4. **STOP and VALIDATE**: Test camera capture independently on physical device
5. Deploy/demo if ready

### Full Feature

1. Complete Setup + Foundational → Foundation ready
2. Complete US1 (camera) + US2 (gallery) in parallel → Both input methods work
3. Complete US3 (mode switching) → Full mode navigation
4. Polish phase → Final verification

### Single Developer Strategy

Recommended execution order:
1. T001 → T002 → T003 (Setup)
2. T004 → T005 (Foundational)
3. T006 → T007 → ... → T021 (User Story 1)
4. T022 → T023 → ... → T031 (User Story 2)
5. T032 → T033 → ... → T039 (User Story 3)
6. T040 → T041 → ... → T045 (Polish)

---

## Files Changed Summary

| File | Change Type |
|------|-------------|
| `types/camera.ts` | CREATE |
| `services/imageStorage.ts` | CREATE |
| `components/PermissionDenied.tsx` | CREATE |
| `app/(tabs)/scan.tsx` | MODIFY |

---

## Notes

- Physical device recommended for camera testing (simulator has limited support)
- Barcode mode remains placeholder (out of scope)
- Images persist to `${documentDirectory}food-images/` directory
- expo-linking (already installed) handles Open Settings navigation
- No automated tests - manual visual testing only
- Total tasks: 45
- Setup tasks: 3
- Foundational tasks: 2
- User Story 1 tasks: 16 (camera capture)
- User Story 2 tasks: 10 (gallery selection)
- User Story 3 tasks: 8 (mode switching)
- Polish tasks: 6
