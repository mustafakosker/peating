import AsyncStorage from '@react-native-async-storage/async-storage';
import { VitalReading, TrendDirection } from '../types/vitals';

const STORAGE_KEY = '@vitals/readings';
const TEMP_UNIT_KEY = '@vitals/temp_unit';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function saveReading(
  reading: Omit<VitalReading, 'id' | 'timestamp'>
): Promise<VitalReading> {
  const newReading: VitalReading = {
    ...reading,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };

  const existingReadings = await getReadings();
  const updatedReadings = [...existingReadings, newReading];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReadings));

  return newReading;
}

export async function getReadings(): Promise<VitalReading[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data) as VitalReading[];
}

export async function getTodaysReadings(): Promise<VitalReading[]> {
  const readings = await getReadings();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  return readings.filter((r) => new Date(r.timestamp) >= startOfDay);
}

export async function getLatestByType(
  type: 'temperature' | 'pulse'
): Promise<VitalReading | null> {
  const todaysReadings = await getTodaysReadings();
  const filtered = todaysReadings
    .filter((r) => r.type === type)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  return filtered[0] || null;
}

export function validateTemperature(value: number, unit: 'F' | 'C'): boolean {
  if (unit === 'F') {
    return value >= 95 && value <= 108;
  }
  return value >= 35 && value <= 42;
}

export function validatePulse(value: number): boolean {
  return value >= 30 && value <= 220;
}

export async function getPreferredTempUnit(): Promise<'F' | 'C'> {
  const stored = await AsyncStorage.getItem(TEMP_UNIT_KEY);
  if (stored === 'C' || stored === 'F') return stored;
  // Default based on locale (US uses Fahrenheit, others use Celsius)
  return getDefaultTempUnitFromLocale();
}

export function getDefaultTempUnitFromLocale(): 'F' | 'C' {
  // In React Native, we can check locale to determine default unit
  // US, Bahamas, Cayman Islands, Liberia, Palau, Micronesia, and Marshall Islands use Fahrenheit
  // For simplicity, default to Fahrenheit (most common in the primary US market)
  // A more robust implementation would use react-native-localize
  return 'F';
}

export async function setPreferredTempUnit(unit: 'F' | 'C'): Promise<void> {
  await AsyncStorage.setItem(TEMP_UNIT_KEY, unit);
}

export function calculateTrend(latest: number, previous: number): TrendDirection {
  const percentChange = Math.abs((latest - previous) / previous) * 100;

  if (percentChange <= 2) return 'stable';
  if (latest > previous) return 'up';
  return 'down';
}

export async function getTrendForType(
  type: 'temperature' | 'pulse'
): Promise<TrendDirection> {
  const todaysReadings = await getTodaysReadings();
  const filtered = todaysReadings
    .filter((r) => r.type === type)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  if (filtered.length < 2) return 'none';

  const latest = filtered[0].value;
  const previous = filtered[1].value;

  return calculateTrend(latest, previous);
}
