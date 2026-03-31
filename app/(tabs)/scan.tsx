import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
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

  // Request camera permission on mount
  useEffect(() => {
    if (!cameraPermission?.granted && cameraPermission?.canAskAgain !== false) {
      requestCameraPermission();
    }
  }, [cameraPermission, requestCameraPermission]);

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
      mediaTypes: ['images'],
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
    // Show permission denied for camera mode
    if (activeMode === 'camera' && !cameraPermission?.granted) {
      return <PermissionDenied type="camera" />;
    }

    // Show captured/selected image if available
    if (capturedImage) {
      return (
        <Image
          source={{ uri: capturedImage.uri }}
          style={styles.previewImage}
        />
      );
    }

    // Show live camera preview
    if (activeMode === 'camera' && cameraPermission?.granted) {
      return (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          onCameraReady={() => setCameraReady(true)}
        />
      );
    }

    // Default placeholder for barcode mode or gallery without selection
    return (
      <View style={styles.placeholder}>
        <Ionicons
          name={activeMode === 'barcode' ? 'barcode-outline' : 'images-outline'}
          size={64}
          color={Colors.gray300}
        />
        <Text style={styles.placeholderText}>
          {activeMode === 'barcode' ? 'Barcode scanning coming soon' : 'Tap to select a photo'}
        </Text>
      </View>
    );
  };

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
          {/* Corner decorations */}
          <View style={[styles.corner, styles.cornerTopLeft]} />
          <View style={[styles.corner, styles.cornerTopRight]} />
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          <View style={[styles.corner, styles.cornerBottomRight]} />

          {/* Highlighted bottom area */}
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
        {/* Mode Buttons */}
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

        {/* Capture Button */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  camera: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  placeholderText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.gray300,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanFrameContainer: {
    position: 'absolute',
    top: 140,
    left: 44,
    right: 44,
  },
  scanFrame: {
    aspectRatio: 341 / 412,
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  highlightedArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderTopWidth: 3,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: Colors.white,
    zIndex: 10,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 32,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 32,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 32,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 32,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    lineHeight: 36,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingBottom: 50,
    alignItems: 'center',
    gap: 24,
  },
  modeButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
  },
  captureButtonContainer: {
    alignItems: 'center',
  },
  captureButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: Colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
  },
});
