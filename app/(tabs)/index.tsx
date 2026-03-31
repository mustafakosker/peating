import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback } from 'react';
import { Colors } from '../../constants/Colors';
import { HeaderBar } from '../../components/HeaderBar';
import { CalendarWeek } from '../../components/CalendarWeek';
import { CaloriesCard } from '../../components/CaloriesCard';
import { NutritionCard } from '../../components/NutritionCard';
import { VitalsCard } from '../../components/VitalsCard';
import { AddVitalSheet } from '../../components/AddVitalSheet';
import { TrendDirection } from '../../types/vitals';
import {
  getLatestByType,
  getPreferredTempUnit,
  getTrendForType,
} from '../../services/vitalsService';

export default function HomeScreen() {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [tempTrend, setTempTrend] = useState<TrendDirection>('none');
  const [pulse, setPulse] = useState<number | null>(null);
  const [pulseTrend, setPulseTrend] = useState<TrendDirection>('none');

  const loadVitalsData = useCallback(async () => {
    try {
      const [latestTemp, latestPulse, preferredUnit, tempTrendValue, pulseTrendValue] = await Promise.all([
        getLatestByType('temperature'),
        getLatestByType('pulse'),
        getPreferredTempUnit(),
        getTrendForType('temperature'),
        getTrendForType('pulse'),
      ]);

      setTemperature(latestTemp?.value ?? null);
      setPulse(latestPulse?.value ?? null);
      setTempUnit(preferredUnit);
      setTempTrend(tempTrendValue);
      setPulseTrend(pulseTrendValue);
    } catch (error) {
      console.error('Failed to load vitals:', error);
      // Use defaults if storage fails
      setTempUnit('F');
    }
  }, []);

  useEffect(() => {
    loadVitalsData();
  }, [loadVitalsData]);

  const handleVitalsPress = () => {
    setSheetVisible(true);
  };

  const handleVitalsSave = async () => {
    await loadVitalsData();
  };

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
            <Text style={styles.sectionTitle}>Today's Vitals</Text>
            <VitalsCard
              temperature={temperature}
              tempUnit={tempUnit}
              tempTrend={tempTrend}
              pulse={pulse}
              pulseTrend={pulseTrend}
              onPress={handleVitalsPress}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Track Your Fuel</Text>
            <CaloriesCard caloriesLeft={1672} totalCalories={2000} />
          </View>

          <View style={styles.nutritionRow}>
            <NutritionCard type="carbs" current={140} total={200} />
            <NutritionCard type="protein" current={60} total={120} />
          </View>
        </View>
      </ScrollView>

      <AddVitalSheet
        visible={sheetVisible}
        tempUnit={tempUnit}
        onClose={() => setSheetVisible(false)}
        onSave={handleVitalsSave}
      />
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
