import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type NutritionCardProps = {
  type: 'carbs' | 'protein';
  current: number;
  total: number;
};

export function NutritionCard({ type, current, total }: NutritionCardProps) {
  const progress = (current / total) * 100;
  const isCarbs = type === 'carbs';

  return (
    <View style={[styles.container, isCarbs ? styles.carbsBackground : styles.proteinBackground]}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={isCarbs ? 'leaf-outline' : 'fish-outline'}
          size={24}
          color={Colors.background}
        />
      </View>

      <Text style={styles.title}>{isCarbs ? 'Carbs' : 'Protein'}</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.valuesContainer}>
          <Text style={styles.valueText}>{current}g</Text>
          <Text style={styles.valueText}>{total}g</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    height: 173,
    justifyContent: 'space-between',
  },
  carbsBackground: {
    backgroundColor: Colors.accent200,
  },
  proteinBackground: {
    backgroundColor: Colors.accent300,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
  },
  progressFill: {
    height: 6,
    backgroundColor: Colors.background,
    borderRadius: 5,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueText: {
    fontSize: 13,
    color: Colors.background,
  },
});
