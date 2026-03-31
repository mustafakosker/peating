import { useRef, useCallback, useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useFocusEffect } from 'expo-router';

interface UseAnimatedProgressOptions {
  toValue: number;
  duration?: number;
}

export function useAnimatedProgress({
  toValue,
  duration = 1000
}: UseAnimatedProgressOptions) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useFocusEffect(
    useCallback(() => {
      // Reset to 0 when screen focuses
      animatedValue.setValue(0);
      setDisplayValue(0);

      // Add listener to track animated value for number display
      const listenerId = animatedValue.addListener(({ value }) => {
        setDisplayValue(value);
      });

      // Animate to target value
      Animated.timing(animatedValue, {
        toValue,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();

      // Cleanup listener on unfocus
      return () => {
        animatedValue.removeListener(listenerId);
      };
    }, [toValue, duration])
  );

  return { animatedValue, displayValue };
}
