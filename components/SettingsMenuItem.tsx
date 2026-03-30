import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface SettingsMenuItemProps {
  label: string;
  onPress?: () => void;
}

export function SettingsMenuItem({ label, onPress }: SettingsMenuItemProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color={Colors.gray300} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.white,
    lineHeight: 25,
  },
});
