import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type ScanMode = 'camera' | 'barcode' | 'gallery';

interface ScanModeButtonProps {
  mode: ScanMode;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const ICONS: Record<ScanMode, keyof typeof Ionicons.glyphMap> = {
  camera: 'camera',
  barcode: 'scan',
  gallery: 'images',
};

export function ScanModeButton({ mode, label, isActive, onPress }: ScanModeButtonProps) {
  return (
    <Pressable
      style={[styles.container, isActive && styles.containerActive]}
      onPress={onPress}
    >
      <Ionicons
        name={ICONS[mode]}
        size={24}
        color={Colors.gray600}
      />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 78,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  containerActive: {
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.gray600,
    lineHeight: 22,
  },
});
