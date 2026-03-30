import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface FormDropdownProps {
  label: string;
  value: string;
  onPress?: () => void;
}

export function FormDropdown({ label, value, onPress }: FormDropdownProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.dropdown} onPress={onPress}>
        <Text style={styles.value}>{value}</Text>
        <Ionicons name="chevron-down" size={20} color={Colors.gray300} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.white,
    lineHeight: 25,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray400,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.white,
    lineHeight: 25,
  },
});
