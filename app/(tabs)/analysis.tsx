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
});
