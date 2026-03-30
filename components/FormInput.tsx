import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '../constants/Colors';

interface FormInputProps extends TextInputProps {
  label: string;
}

export function FormInput({ label, ...props }: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.gray300}
        {...props}
      />
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray400,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 17,
    color: Colors.white,
    lineHeight: 25,
  },
});
