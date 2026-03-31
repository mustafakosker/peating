# Quickstart: Camera and Gallery Integration

**Feature**: 006-camera-gallery-integration
**Date**: 2026-03-31

## Overview

Replace the placeholder image in the scan screen with real camera preview and gallery integration. Users can capture food photos or select existing images for food logging.

## Prerequisites

- Expo development environment set up
- Project dependencies installed (`npm install`)
- Physical device recommended for camera testing (simulator has limited camera support)

## Quick Implementation

### 1. Install Dependencies

```bash
npx expo install expo-camera expo-image-picker expo-file-system
```

### 2. Create Camera Types

Create `types/camera.ts`:

```typescript
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

### 3. Create Image Storage Service

Create `services/imageStorage.ts`:

```typescript
import * as FileSystem from 'expo-file-system';
import { CapturedImage, ImageSource } from '../types/camera';

const IMAGE_DIR = `${FileSystem.documentDirectory}food-images/`;

export async function ensureImageDirectory(): Promise<void> {
  const dirInfo = await FileSystem.getInfoAsync(IMAGE_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(IMAGE_DIR, { intermediates: true });
  }
}

export async function saveImage(
  sourceUri: string,
  source: ImageSource
): Promise<CapturedImage> {
  await ensureImageDirectory();

  const id = generateUUID();
  const filename = `${id}.jpg`;
  const destinationUri = `${IMAGE_DIR}${filename}`;

  await FileSystem.copyAsync({
    from: sourceUri,
    to: destinationUri,
  });

  return {
    id,
    uri: destinationUri,
    source,
    timestamp: Date.now(),
  };
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
```

### 4. Create Permission Denied Component

Create `components/PermissionDenied.tsx`:

```typescript
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type PermissionDeniedProps = {
  type: 'camera' | 'gallery';
  onRequestPermission?: () => void;
};

export function PermissionDenied({ type, onRequestPermission }: PermissionDeniedProps) {
  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  const icon = type === 'camera' ? 'camera-outline' : 'images-outline';
  const title = type === 'camera' ? 'Camera Access Required' : 'Photo Access Required';
  const message = type === 'camera'
    ? 'To scan food, please allow camera access in your device settings.'
    : 'To select photos, please allow photo library access in your device settings.';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={48} color={Colors.gray300} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={handleOpenSettings}>
        <Text style={styles.buttonText}>Open Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: Colors.gray300,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### 5. Update Scan Screen

Modify `app/(tabs)/scan.tsx` to integrate camera and gallery:

```typescript
import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { ScanModeButton } from '../../components/ScanModeButton';
import { PermissionDenied } from '../../components/PermissionDenied';
import { saveImage } from '../../services/imageStorage';
import { CapturedImage } from '../../types/camera';

type ScanMode = 'camera' | 'barcode' | 'gallery';

export default function ScanScreen() {
  const [activeMode, setActiveMode] = useState<ScanMode>('camera');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const handleCapture = async () => {
    if (!cameraRef.current || !cameraReady) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    if (photo?.uri) {
      const saved = await saveImage(photo.uri, 'camera');
      setCapturedImage(saved);
    }
  };

  const handlePickImage = async () => {
    if (!mediaLibraryPermission?.granted) {
      const result = await requestMediaLibraryPermission();
      if (!result.granted) return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const saved = await saveImage(result.assets[0].uri, 'gallery');
      setCapturedImage(saved);
    }
  };

  const handleModeChange = (mode: ScanMode) => {
    setActiveMode(mode);
    if (mode === 'gallery') {
      handlePickImage();
    }
  };

  const renderCameraContent = () => {
    if (!cameraPermission?.granted) {
      return <PermissionDenied type="camera" />;
    }

    if (capturedImage) {
      return (
        <Image
          source={{ uri: capturedImage.uri }}
          style={styles.scanAreaImage}
        />
      );
    }

    return (
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        onCameraReady={() => setCameraReady(true)}
      />
    );
  };

  // Request camera permission on mount
  useEffect(() => {
    if (!cameraPermission?.granted && !cameraPermission?.canAskAgain === false) {
      requestCameraPermission();
    }
  }, []);

  const headerTitle = activeMode === 'camera' ? 'AI Camera'
    : activeMode === 'barcode' ? 'AI Barcode' : 'Gallery';

  return (
    <View style={styles.container}>
      {/* Camera/Image Preview */}
      <View style={styles.previewContainer}>
        {renderCameraContent()}
      </View>

      {/* Dark Overlay */}
      <View style={styles.overlay} />

      {/* Scanning Frame */}
      <View style={styles.scanFrameContainer}>
        <View style={styles.scanFrame}>
          <View style={[styles.corner, styles.cornerTopLeft]} />
          <View style={[styles.corner, styles.cornerTopRight]} />
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          <View style={[styles.corner, styles.cornerBottomRight]} />
          <View style={styles.highlightedArea} />
        </View>
      </View>

      {/* Header */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <Pressable style={styles.closeButton}>
            <Ionicons name="close" size={20} color={Colors.white} />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Bottom Panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.modeButtons}>
          <ScanModeButton
            mode="camera"
            label="AI Camera"
            isActive={activeMode === 'camera'}
            onPress={() => handleModeChange('camera')}
          />
          <ScanModeButton
            mode="barcode"
            label="AI Barcode"
            isActive={activeMode === 'barcode'}
            onPress={() => handleModeChange('barcode')}
          />
          <ScanModeButton
            mode="gallery"
            label="Gallery"
            isActive={activeMode === 'gallery'}
            onPress={() => handleModeChange('gallery')}
          />
        </View>

        <View style={styles.captureButtonContainer}>
          <Pressable
            style={styles.captureButton}
            onPress={activeMode === 'gallery' ? handlePickImage : handleCapture}
          >
            <View style={styles.captureButtonInner} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// ... styles remain largely the same, add:
const styles = StyleSheet.create({
  // ... existing styles
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  camera: {
    flex: 1,
  },
});
```

## Verification Checklist

- [ ] Dependencies installed (`expo-camera`, `expo-image-picker`, `expo-file-system`)
- [ ] Camera permission prompt appears on first camera mode access
- [ ] Live camera preview displays when permission granted
- [ ] Capture button takes photo and displays it in frame
- [ ] Gallery mode opens device photo picker
- [ ] Selected photo displays in frame
- [ ] Permission denied screen shows with "Open Settings" button
- [ ] Header title updates based on active mode
- [ ] Captured/selected images persist across mode switches

## Running the App

```bash
# iOS Simulator (limited camera support)
npx expo start --ios

# Android Emulator (limited camera support)
npx expo start --android

# Physical Device (recommended for camera testing)
npx expo start
# Scan QR code with Expo Go app
```

## Testing Permission States

1. **First launch**: Should prompt for camera permission
2. **Permission denied**: Shows PermissionDenied component with settings link
3. **Permission revoked**: Open Settings > App > Camera toggle off, reopen app

## Notes

- Physical device recommended for full camera testing
- Barcode mode shows placeholder (separate feature)
- Images saved to app's document directory for persistence
