import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

type MacroData = {
  fats: number;
  carbs: number;
  protein: number;
};

type MacroDistributionProps = {
  data?: MacroData;
  message?: string;
};

export function MacroDistribution({
  data = { fats: 53, carbs: 28, protein: 19 },
  message = "You're consistently low on protein.",
}: MacroDistributionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Macro Distribution</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.fatsCard]}>
          <Text style={styles.cardLabel}>Fats</Text>
          <Text style={styles.cardValue}>{data.fats}%</Text>
        </View>

        <View style={[styles.card, styles.carbsCard]}>
          <Text style={styles.cardLabel}>Carbs</Text>
          <Text style={styles.cardValue}>{data.carbs}%</Text>
        </View>

        <View style={[styles.card, styles.proteinCard]}>
          <Text style={styles.cardLabel}>Protein</Text>
          <Text style={styles.cardValue}>{data.protein}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent200,
    borderRadius: 24,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.background,
    marginBottom: 4,
  },
  message: {
    fontSize: 17,
    color: Colors.background,
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    height: 88,
    justifyContent: 'center',
  },
  fatsCard: {
    backgroundColor: Colors.accent100,
  },
  carbsCard: {
    backgroundColor: Colors.accent300,
  },
  proteinCard: {
    backgroundColor: '#FF6F43',
  },
  cardLabel: {
    fontSize: 17,
    color: Colors.background,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.background,
  },
});
