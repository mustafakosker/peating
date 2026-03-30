import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { ScanModeButton } from '../../components/ScanModeButton';

type ScanMode = 'camera' | 'barcode' | 'gallery';

export default function ScanScreen() {
  const [activeMode, setActiveMode] = useState<ScanMode>('camera');

  return (
    <View style={styles.container}>
      {/* Camera Preview Background */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' }}
        style={styles.cameraPreview}
        blurRadius={2}
      />

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

          {/* Clear area for scanning */}
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' }}
            style={styles.scanAreaImage}
          />

          {/* Highlighted bottom area */}
          <View style={styles.highlightedArea} />
        </View>
      </View>

      {/* Header */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>AI Camera</Text>
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
            onPress={() => setActiveMode('camera')}
          />
          <ScanModeButton
            mode="barcode"
            label="AI Barcode"
            isActive={activeMode === 'barcode'}
            onPress={() => setActiveMode('barcode')}
          />
          <ScanModeButton
            mode="gallery"
            label="Gallery"
            isActive={activeMode === 'gallery'}
            onPress={() => setActiveMode('gallery')}
          />
        </View>

        {/* Capture Button */}
        <View style={styles.captureButtonContainer}>
          <Pressable style={styles.captureButton}>
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
  cameraPreview: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
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
  scanAreaImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
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
