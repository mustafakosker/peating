import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type CaPRatioCardProps = {
  calcium: number;
  phosphorus: number;
  onPress?: () => void;
};

function getStatusColor(ratio: number): string {
  if (ratio >= 1.0) return Colors.accent300; // Green
  if (ratio >= 0.7) return Colors.accent200; // Yellow
  return Colors.primary; // Red
}

export function CaPRatioCard({ calcium, phosphorus, onPress }: CaPRatioCardProps) {
  const ratio = phosphorus > 0 ? calcium / phosphorus : 0;
  const ratioDisplay = phosphorus > 0 ? ratio.toFixed(1) : 'N/A';
  const statusColor = getStatusColor(ratio);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="nutrition-outline" size={24} color={Colors.background} />
      </View>

      <Text style={styles.title}>Ca:P Ratio</Text>

      <View style={styles.ratioContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
        <Text style={styles.ratioText}>{ratioDisplay}:1</Text>
      </View>

      <View style={styles.valuesContainer}>
        <Text style={styles.valueText}>Ca: {calcium}mg</Text>
        <Text style={styles.valueText}>P: {phosphorus}mg</Text>
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
  ratioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  ratioText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.background,
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
