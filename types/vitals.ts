export interface VitalReading {
  id: string;
  type: 'temperature' | 'pulse';
  value: number;
  unit: 'F' | 'C' | 'BPM';
  timestamp: string;
}

export type TrendDirection = 'up' | 'down' | 'stable' | 'none';

export interface TrendData {
  direction: TrendDirection;
  previous: number | null;
}
