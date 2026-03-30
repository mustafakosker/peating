# Data Model: Temp & Pulse Log

**Feature**: 002-temp-pulse-log
**Date**: 2026-03-30
**Phase**: 1 - Data Model Design

## Entity Definitions

### VitalReading

Represents a single temperature or pulse measurement.

```typescript
interface VitalReading {
  id: string;                    // UUID v4
  type: 'temperature' | 'pulse'; // Vital type
  value: number;                 // Numeric value
  unit: 'F' | 'C' | 'BPM';       // Unit of measurement
  timestamp: string;             // ISO 8601 datetime
}
```

**Constraints**:
- Temperature (Fahrenheit): 95.0 - 108.0
- Temperature (Celsius): 35.0 - 42.0
- Pulse (BPM): 30 - 220

### VitalsStore

Persistent storage structure for all readings.

```typescript
interface VitalsStore {
  readings: VitalReading[];      // All stored readings
  preferredTempUnit: 'F' | 'C';  // User's temperature unit preference
}
```

### TrendIndicator

Derived type representing the trend direction between readings.

```typescript
type TrendDirection = 'up' | 'down' | 'stable' | 'none';

interface TrendData {
  direction: TrendDirection;
  previous: number | null;       // Previous reading value (for context)
}
```

## Storage Schema

### AsyncStorage Keys

| Key | Type | Description |
|-----|------|-------------|
| `@vitals/readings` | `VitalReading[]` | Array of all vital readings |
| `@vitals/temp_unit` | `'F' \| 'C'` | User's preferred temperature unit |

### Data Examples

**Single Reading**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "temperature",
  "value": 98.6,
  "unit": "F",
  "timestamp": "2026-03-30T08:30:00.000Z"
}
```

**Readings Array**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "type": "temperature",
    "value": 98.6,
    "unit": "F",
    "timestamp": "2026-03-30T08:30:00.000Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "type": "pulse",
    "value": 72,
    "unit": "BPM",
    "timestamp": "2026-03-30T08:30:00.000Z"
  }
]
```

## Business Logic

### Trend Calculation

```typescript
function calculateTrend(latest: number, previous: number): TrendDirection {
  const percentChange = Math.abs((latest - previous) / previous) * 100;

  if (percentChange <= 2) return 'stable';
  if (latest > previous) return 'up';
  return 'down';
}
```

### Today's Readings Filter

```typescript
function getTodaysReadings(readings: VitalReading[]): VitalReading[] {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  return readings.filter(r =>
    new Date(r.timestamp) >= startOfDay
  );
}
```

### Most Recent Reading (by type)

```typescript
function getLatestReading(
  readings: VitalReading[],
  type: 'temperature' | 'pulse'
): VitalReading | null {
  const filtered = readings
    .filter(r => r.type === type)
    .sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  return filtered[0] || null;
}
```

## Validation Rules

### Temperature Validation

```typescript
function validateTemperature(value: number, unit: 'F' | 'C'): boolean {
  if (unit === 'F') {
    return value >= 95 && value <= 108;
  }
  return value >= 35 && value <= 42;
}
```

### Pulse Validation

```typescript
function validatePulse(value: number): boolean {
  return value >= 30 && value <= 220;
}
```

## Data Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   VitalsCard    │────►│  VitalsService   │────►│   AsyncStorage  │
│   (Display)     │◄────│  (Business Logic)│◄────│   (Persistence) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌──────────────────┐
│  AddVitalSheet  │────►│   Validation     │
│   (Input)       │     │   Functions      │
└─────────────────┘     └──────────────────┘
```

## Migration Strategy

Not applicable - this is a new feature with no existing data to migrate.
