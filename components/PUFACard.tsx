import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type PUFACardProps = {
  current: number;
  limit: number;
  onPress?: () => void;
};

function getStatusColor(percentage: number): string {
  if (percentage < 80) return Colors.accent300; // Green
  if (percentage <= 100) return Colors.accent200; // Yellow
  return Colors.primary; // Red
}

export function PUFACard({ current, limit, onPress }: PUFACardProps) {
  const percentage = (current / limit) * 100;
  const displayPercentage = Math.min(percentage, 100);
  const statusColor = getStatusColor(percentage);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="water-outline" size={24} color={Colors.background} />
      </View>

      <Text style={styles.title}>PUFA</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${displayPercentage}%`, backgroundColor: statusColor }
            ]}
          />
        </View>
        <View style={styles.valuesContainer}>
          <Text style={styles.valueText}>{current}g</Text>
          <Text style={styles.valueText}>{limit}g</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    height: 173,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.background,
  },
  progressContainer: {
    gap: 6,
  },
  progressBackground: {
    height: 6,
    backgroundColor: 'rgba(18, 18, 18, 0.1)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 5,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueText: {
    fontSize: 13,
    color: Colors.gray300,
  },
});
