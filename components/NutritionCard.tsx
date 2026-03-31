import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useAnimatedProgress } from './hooks/useAnimatedProgress';

type NutritionCardProps = {
  type: 'carbs' | 'protein';
  current: number;
  total: number;
};

export function NutritionCard({ type, current, total }: NutritionCardProps) {
  const progress = (current / total) * 100;
  const isCarbs = type === 'carbs';

  // Animated progress - animates from 0 to target progress percentage
  const { animatedValue, displayValue } = useAnimatedProgress({ toValue: progress });

  // Interpolate width from 0% to target progress%
  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, progress],
    outputRange: ['0%', `${progress}%`],
    extrapolate: 'clamp',
  });

  // Calculate displayed value based on animation progress
  const displayedCurrent = Math.round((displayValue / 100) * total);

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
          <Animated.View style={[styles.progressFill, { width: animatedWidth }]} />
        </View>
        <View style={styles.valuesContainer}>
          <Text style={styles.valueText}>{displayedCurrent}g</Text>
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
    overflow: 'hidden',
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
