import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { HeaderBar } from '../../components/HeaderBar';
import { CalendarWeek } from '../../components/CalendarWeek';
import { CaloriesCard } from '../../components/CaloriesCard';
import { NutritionCard } from '../../components/NutritionCard';
import { DietPlanCard } from '../../components/DietPlanCard';

const DIET_IMAGE = 'https://www.figma.com/api/mcp/asset/e934d0a8-7243-4a5c-b821-1c61e50508d4';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeaderBar greeting="Good Morning" />

        <View style={styles.content}>
          <CalendarWeek />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Count Your Daily Calories</Text>
            <CaloriesCard caloriesLeft={1672} totalCalories={2000} />
          </View>

          <View style={styles.nutritionRow}>
            <NutritionCard type="carbs" current={140} total={200} />
            <NutritionCard type="protein" current={60} total={120} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diet Plan</Text>
            <DietPlanCard
              title="Vegan Vitality"
              imageUrl={DIET_IMAGE}
              calories="2,000 kcal"
              protein="125g"
              carbs="300g"
              fat="55g"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  nutritionRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
