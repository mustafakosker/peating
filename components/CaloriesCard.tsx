import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/Colors';
import Svg, { Path } from 'react-native-svg';
import { useAnimatedProgress } from './hooks/useAnimatedProgress';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type CaloriesCardProps = {
  caloriesLeft: number;
  totalCalories: number;
};

export function CaloriesCard({ caloriesLeft = 1672, totalCalories = 2000 }: CaloriesCardProps) {
  const progress = ((totalCalories - caloriesLeft) / totalCalories) * 100;

  // SVG arc calculations
  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Half circle
  const progressOffset = circumference - (progress / 100) * circumference;

  // Animated progress - animates from 0 to target progress
  const { animatedValue, displayValue } = useAnimatedProgress({ toValue: progress });

  // Interpolate for strokeDashoffset: starts at full circumference (0%), ends at progressOffset
  const animatedOffset = animatedValue.interpolate({
    inputRange: [0, progress],
    outputRange: [circumference, progressOffset],
    extrapolate: 'clamp',
  });

  // Calculate displayed calories based on animation progress
  // When progress is 0%, display totalCalories. When at target, display caloriesLeft.
  const displayedCalories = Math.round(
    totalCalories - (displayValue / 100) * totalCalories
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calories</Text>

      <View style={styles.gaugeContainer}>
        <Svg width={size} height={size / 2 + 20} style={styles.svg}>
          {/* Background arc */}
          <Path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          {/* Animated Progress arc */}
          <AnimatedPath
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            stroke={Colors.background}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={animatedOffset}
          />
        </Svg>

        <View style={styles.centerInfo}>
          <View style={styles.innerCircle}>
            <Text style={styles.caloriesValue}>{displayedCalories}</Text>
            <Text style={styles.caloriesLabel}>Left</Text>
          </View>
        </View>

        <View style={styles.scaleContainer}>
          <Text style={styles.scaleText}>0</Text>
          <Text style={styles.scaleText}>100</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent100,
    borderRadius: 24,
    padding: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.background,
    marginBottom: 16,
  },
  gaugeContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    transform: [{ rotate: '0deg' }],
  },
  centerInfo: {
    position: 'absolute',
    top: 40,
    alignItems: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.background,
  },
  caloriesLabel: {
    fontSize: 14,
    color: Colors.background,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  scaleText: {
    fontSize: 12,
    color: Colors.background,
  },
});
