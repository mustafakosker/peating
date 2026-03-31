# Data Model: Camera and Gallery Integration

**Feature**: 006-camera-gallery-integration
**Date**: 2026-03-31

## Entities

### CapturedImage

Represents a photo taken by the camera or selected from the gallery, persisted for food recognition.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| id | string | Unique identifier (UUID) | Required, auto-generated |
| uri | string | Local file path to image | Required, must exist in file system |
| source | 'camera' \| 'gallery' | How image was obtained | Required, enum |
| timestamp | number | Unix timestamp when captured/selected | Required, auto-generated |
| width | number | Image width in pixels | Optional |
| height | number | Image height in pixels | Optional |

**Storage**: Images stored in `${FileSystem.documentDirectory}food-images/`

**Lifecycle**:
1. Created when user captures photo or selects from gallery
2. Copied to app storage directory
3. URI updated to local storage path
4. Available for food recognition feature

### PermissionState

Represents the current status of device permissions for camera and photo library.

| Field | Type | Description |
|-------|------|-------------|
| camera | PermissionStatus | Camera access status |
| mediaLibrary | PermissionStatus | Photo library access status |

**PermissionStatus Values**:
- `undetermined`: User hasn't been asked yet
- `granted`: Permission granted
- `denied`: Permission denied (can request again)

## State Shape (Component)

```typescript
type ScanScreenState = {
  activeMode: 'camera' | 'barcode' | 'gallery';
  cameraPermission: PermissionStatus;
  mediaLibraryPermission: PermissionStatus;
  capturedImage: CapturedImage | null;
  cameraReady: boolean;
  isProcessing: boolean;
  error: string | null;
};
```

## Type Definitions

```typescript
// types/camera.ts

import { PermissionStatus } from 'expo-camera';

export type ImageSource = 'camera' | 'gallery';

export type CapturedImage = {
  id: string;
  uri: string;
  source: ImageSource;
  timestamp: number;
  width?: number;
  height?: number;
};

export type CameraError =
  | 'permission_denied'
  | 'camera_unavailable'
  | 'camera_in_use'
  | 'storage_error'
  | 'gallery_empty';
```

## Relationships

```
ScanScreen
    └── has one CapturedImage (nullable)
    └── has PermissionState
        ├── camera: PermissionStatus
        └── mediaLibrary: PermissionStatus
```

## File Storage Structure

```
${FileSystem.documentDirectory}/
└── food-images/
    ├── {uuid-1}.jpg
    ├── {uuid-2}.jpg
    └── ...
```

## State Transitions

### Camera Permission Flow

```
undetermined ──(requestPermission)──> granted | denied
denied ──(openSettings + return)──> granted | denied
```

### Image Capture Flow

```
idle ──(capturePhoto)──> processing ──(success)──> captured
                                   ──(error)──> error state
```

### Mode Switching

```
camera ──(tap barcode)──> barcode
camera ──(tap gallery)──> gallery
gallery ──(tap camera)──> camera
(capturedImage preserved across transitions)
```
