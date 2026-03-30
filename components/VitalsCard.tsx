import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { TrendDirection } from '../types/vitals';

interface VitalsCardProps {
  temperature: number | null;
  tempUnit: 'F' | 'C';
  tempTrend: TrendDirection;
  pulse: number | null;
  pulseTrend: TrendDirection;
  onPress: () => void;
}

function TrendIcon({ direction }: { direction: TrendDirection }) {
  if (direction === 'none') return null;

  const iconName =
    direction === 'up'
      ? 'arrow-up'
      : direction === 'down'
        ? 'arrow-down'
        : 'remove';

  const color =
    direction === 'up'
      ? '#FF6B6B'
      : direction === 'down'
        ? '#4ECDC4'
        : Colors.gray300;

  return <Ionicons name={iconName} size={16} color={color} />;
}

export function VitalsCard({
  temperature,
  tempUnit,
  tempTrend,
  pulse,
  pulseTrend,
  onPress,
}: VitalsCardProps) {
  const hasData = temperature !== null || pulse !== null;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.row}>
        <View style={styles.vitalItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="thermometer-outline" size={20} color={Colors.accent100} />
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.label}>Temperature</Text>
            <View style={styles.valueRow}>
              <Text style={styles.value}>
                {temperature !== null ? `${temperature}°${tempUnit}` : `-- °${tempUnit}`}
              </Text>
              <TrendIcon direction={tempTrend} />
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.vitalItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart-outline" size={20} color={Colors.accent300} />
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.label}>Pulse</Text>
            <View style={styles.valueRow}>
              <Text style={styles.value}>
                {pulse !== null ? `${pulse} BPM` : '-- BPM'}
              </Text>
              <TrendIcon direction={pulseTrend} />
            </View>
          </View>
        </View>
      </View>

      {!hasData && (
        <Text style={styles.hint}>Tap to add your first reading</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray500,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.gray400,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vitalItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: Colors.gray300,
    marginBottom: 2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.gray400,
    marginHorizontal: 16,
  },
  hint: {
    fontSize: 12,
    color: Colors.gray300,
    textAlign: 'center',
    marginTop: 12,
  },
});
