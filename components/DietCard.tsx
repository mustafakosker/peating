import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';

interface DietCardProps {
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
  onPress?: () => void;
}

export function DietCard({
  title,
  calories,
  protein,
  carbs,
  fat,
  imageUrl,
  onPress,
}: DietCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionText}>{calories.toLocaleString()} kcal</Text>
          <View style={styles.divider} />
          <Text style={styles.nutritionText}>Protein: {protein}g</Text>
          <View style={styles.divider} />
          <Text style={styles.nutritionText}>Carbs: {carbs}g</Text>
          <View style={styles.divider} />
          <Text style={styles.nutritionText}>Fat: {fat}g</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    backgroundColor: Colors.gray400,
  },
  infoContainer: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    lineHeight: 27,
  },
  nutritionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nutritionText: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.white,
    lineHeight: 19,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.gray400,
  },
});
