import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { TabSelector } from '../../components/TabSelector';
import { CalorieTrendsChart } from '../../components/CalorieTrendsChart';
import { MacroDistribution } from '../../components/MacroDistribution';

const TABS = ['Daily', 'Weekly', 'Monthly'];

export default function AnalysisScreen() {
  const [activeTab, setActiveTab] = useState('Daily');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Analysis</Text>
        </View>

        <View style={styles.content}>
          {/* Nutrition Analysis Banner */}
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>Your Nutrition Analysis</Text>
            <Text style={styles.bannerSubtitle}>
              Track trends. Spot patterns. Crush your goals.
            </Text>
          </View>

          {/* Tab Selector */}
          <TabSelector
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Calorie Trends Chart */}
          <CalorieTrendsChart
            underGoalDays={5}
            overGoalDays={2}
          />

          {/* Macro Distribution */}
          <MacroDistribution
            data={{ fats: 53, carbs: 28, protein: 19 }}
            message="You're consistently low on protein."
          />
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
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
  banner: {
    backgroundColor: Colors.accent300,
    borderRadius: 24,
    padding: 24,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 17,
    color: Colors.white,
    lineHeight: 25,
  },
});
