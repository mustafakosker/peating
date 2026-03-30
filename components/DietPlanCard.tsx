import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../constants/Colors';

type DietPlanCardProps = {
  title: string;
  imageUrl: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
};

export function DietPlanCard({
  title = 'Vegan Vitality',
  imageUrl,
  calories = '2,000 kcal',
  protein = '125g',
  carbs = '300g',
  fat = '55g',
}: DietPlanCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholder]} />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.nutritionInfo}>
          <Text style={styles.nutritionText}>{calories}</Text>
          <View style={styles.divider} />
          <Text style={styles.nutritionText}>Protein: {protein}</Text>
          <View style={styles.divider} />
          <Text style={styles.nutritionText}>Carbs: {carbs}</Text>
          <View style={styles.divider} />
          <Text style={styles.nutritionText}>Fat: {fat}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  imageContainer: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 24,
  },
  placeholder: {
    backgroundColor: Colors.gray400,
  },
  infoContainer: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  nutritionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  nutritionText: {
    fontSize: 13,
    color: Colors.white,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.gray400,
  },
});
