import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { TabSwitcher } from '../../components/TabSwitcher';
import { DietCard } from '../../components/DietCard';

const DIETS = [
  {
    id: '1',
    title: 'Mediterranean Lifestyle',
    calories: 2000,
    protein: 120,
    carbs: 200,
    fat: 70,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  },
  {
    id: '2',
    title: 'Keto Kickstart',
    calories: 1800,
    protein: 70,
    carbs: 30,
    fat: 105,
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  },
  {
    id: '3',
    title: 'Plant-Based Power',
    calories: 1900,
    protein: 80,
    carbs: 250,
    fat: 55,
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80',
  },
];

const MY_DIETS = [
  {
    id: '4',
    title: 'My Custom Diet',
    calories: 2200,
    protein: 150,
    carbs: 180,
    fat: 80,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  },
];

export default function DietsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const diets = activeTab === 0 ? DIETS : MY_DIETS;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>Diets</Text>

        <TabSwitcher
          tabs={['All Diets', 'My Diets']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Explore Diet Plans</Text>
          <Text style={styles.bannerSubtitle}>
            Personalized plans to match your goals and lifestyle.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diets</Text>
          <View style={styles.dietsList}>
            {diets.map((diet) => (
              <DietCard
                key={diet.id}
                title={diet.title}
                calories={diet.calories}
                protein={diet.protein}
                carbs={diet.carbs}
                fat={diet.fat}
                imageUrl={diet.imageUrl}
              />
            ))}
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
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    lineHeight: 36,
    marginTop: 12,
  },
  banner: {
    backgroundColor: Colors.accent100,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 8,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray600,
    lineHeight: 30,
  },
  bannerSubtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.gray600,
    lineHeight: 25,
  },
  section: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    lineHeight: 36,
  },
  dietsList: {
    gap: 24,
  },
});
