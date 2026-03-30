import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { Colors } from '../constants/Colors';
import {
  saveReading,
  validateTemperature,
  validatePulse,
} from '../services/vitalsService';

interface AddVitalSheetProps {
  visible: boolean;
  tempUnit: 'F' | 'C';
  onClose: () => void;
  onSave: () => Promise<void> | void;
}

export function AddVitalSheet({
  visible,
  tempUnit,
  onClose,
  onSave,
}: AddVitalSheetProps) {
  const [tempValue, setTempValue] = useState('');
  const [pulseValue, setPulseValue] = useState('');
  const [tempError, setTempError] = useState<string | null>(null);
  const [pulseError, setPulseError] = useState<string | null>(null);

  const resetForm = () => {
    setTempValue('');
    setPulseValue('');
    setTempError(null);
    setPulseError(null);
  };

  const handleSave = async () => {
    let hasError = false;

    // Require at least one value
    if (!tempValue.trim() && !pulseValue.trim()) {
      setTempError('Enter at least one reading');
      return;
    }

    // Validate temperature if provided
    if (tempValue.trim()) {
      const temp = parseFloat(tempValue);
      if (isNaN(temp) || !validateTemperature(temp, tempUnit)) {
        const range = tempUnit === 'F' ? '95-108' : '35-42';
        setTempError(`Enter a valid temperature (${range}°${tempUnit})`);
        hasError = true;
      } else {
        setTempError(null);
      }
    }

    // Validate pulse if provided
    if (pulseValue.trim()) {
      const pulse = parseInt(pulseValue, 10);
      if (isNaN(pulse) || !validatePulse(pulse)) {
        setPulseError('Enter a valid pulse (30-220 BPM)');
        hasError = true;
      } else {
        setPulseError(null);
      }
    }

    if (hasError) return;

    try {
      // Save readings sequentially to ensure they complete
      if (tempValue.trim()) {
        await saveReading({
          type: 'temperature',
          value: parseFloat(tempValue),
          unit: tempUnit,
        });
      }

      if (pulseValue.trim()) {
        await saveReading({
          type: 'pulse',
          value: parseInt(pulseValue, 10),
          unit: 'BPM',
        });
      }

      resetForm();
      await onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save reading:', error);
      setTempError('Failed to save. Please try again.');
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <Pressable style={styles.overlay} onPress={handleCancel}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />
            <Text style={styles.title}>Add Vital Reading</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Temperature (°{tempUnit})</Text>
              <TextInput
                style={[styles.input, tempError && styles.inputError]}
                placeholder={`e.g., ${tempUnit === 'F' ? '98.6' : '37.0'}`}
                placeholderTextColor={Colors.gray300}
                keyboardType="decimal-pad"
                value={tempValue}
                onChangeText={(text) => {
                  setTempValue(text);
                  setTempError(null);
                }}
              />
              {tempError && <Text style={styles.errorText}>{tempError}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pulse (BPM)</Text>
              <TextInput
                style={[styles.input, pulseError && styles.inputError]}
                placeholder="e.g., 72"
                placeholderTextColor={Colors.gray300}
                keyboardType="number-pad"
                value={pulseValue}
                onChangeText={(text) => {
                  setPulseValue(text);
                  setPulseError(null);
                }}
              />
              {pulseError && <Text style={styles.errorText}>{pulseError}</Text>}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.gray500,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.gray300,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.gray300,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.gray400,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray400,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.gray400,
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
