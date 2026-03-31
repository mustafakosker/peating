# Research: Camera and Gallery Integration

**Feature**: 006-camera-gallery-integration
**Date**: 2026-03-31

## Camera Library Selection

### Decision: expo-camera

**Rationale**:
- First-party Expo library with excellent integration with the existing Expo SDK 54 project
- Provides both camera permissions and live preview functionality
- Supports photo capture with configurable quality settings
- Well-documented with TypeScript support
- Actively maintained by Expo team

**Alternatives Considered**:
- `react-native-camera`: Deprecated in favor of `react-native-vision-camera`
- `react-native-vision-camera`: Powerful but requires ejected Expo or development build; overkill for basic photo capture
- Native modules: Would require ejecting from Expo managed workflow

**Installation**: `npx expo install expo-camera`

## Image Picker Selection

### Decision: expo-image-picker

**Rationale**:
- First-party Expo library designed for gallery access
- Handles both photo library permissions and image selection
- Returns image URI that can be used with React Native Image component
- Supports configuration for image quality and aspect ratio
- Integrates seamlessly with expo-camera for consistent image handling

**Alternatives Considered**:
- `react-native-image-picker`: Requires native linking; not ideal for Expo managed workflow
- Custom gallery implementation: Unnecessary complexity

**Installation**: `npx expo install expo-image-picker`

## Image Storage Strategy

### Decision: expo-file-system with app document directory

**Rationale**:
- First-party Expo library for file operations
- Provides persistent storage in app's document directory
- Images survive app restarts
- Can be accessed by future food recognition feature
- Supports copying images from camera/gallery to app storage

**Storage Location**: `${FileSystem.documentDirectory}food-images/`

**Alternatives Considered**:
- AsyncStorage: Not suitable for binary image data
- External storage: Platform-specific, less portable
- In-memory only: Would lose images on app close (rejected in clarification)

**Installation**: `npx expo install expo-file-system`

## Permission Handling Pattern

### Decision: Request on first use with settings link fallback

**Rationale**:
- Best UX practice: request permission when user initiates camera/gallery action
- Expo libraries provide `requestPermissionsAsync()` and `getPermissionsAsync()` methods
- `expo-linking` (already installed) can open device settings when permission permanently denied
- Clear permission state management in component state

**Permission Flow**:
1. Check current permission status on mode activation
2. If undetermined: show permission request with rationale
3. If granted: proceed with camera/gallery access
4. If denied: show UI with "Open Settings" button

## Camera Preview Implementation

### Decision: Camera component with ref-based capture

**Rationale**:
- `expo-camera` Camera component provides native camera preview
- Use ref to call `takePictureAsync()` on capture button press
- Configure with `CameraType.back` for food photos
- Set appropriate quality (0.7-0.8) to balance file size and quality

**Key Properties**:
- `type`: CameraType.back (rear camera for food photos)
- `ratio`: "4:3" (matches scan frame aspect ratio)
- `onCameraReady`: Enable capture button when camera is ready

## Integration with Existing Scan Screen

### Decision: Replace placeholder Image with Camera/selected image conditionally

**Rationale**:
- Existing scan.tsx uses static Image as placeholder
- Replace with Camera component when in camera mode and permission granted
- Show selected/captured image in gallery mode or after capture
- Preserve existing UI structure (header, bottom panel, mode buttons)

**State Management**:
- `cameraPermission`: PermissionStatus
- `galleryPermission`: PermissionStatus
- `capturedImage`: string | null (URI)
- `cameraReady`: boolean

## Error Handling Strategy

### Decision: User-friendly inline messaging

**Rationale**:
- Display permission denial messages within scan frame area
- Provide "Open Settings" action button for denied permissions
- Show camera-in-use errors with retry suggestion
- Handle empty gallery gracefully

**Error States**:
- Camera permission denied
- Gallery permission denied
- Camera not available
- Camera in use by another app
- Storage error on save

## Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| expo-camera | ~16.x | Camera preview and photo capture |
| expo-image-picker | ~16.x | Gallery image selection |
| expo-file-system | ~19.x | Persistent image storage |
| expo-linking | ~8.x | Open device settings (already installed) |
