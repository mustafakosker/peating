import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import { Colors } from '../constants/Colors';

type DataPoint = {
  day: string;
  value: number;
};

type CalorieTrendsChartProps = {
  data?: DataPoint[];
  underGoalDays?: number;
  overGoalDays?: number;
};

const defaultData: DataPoint[] = [
  { day: 'Mon', value: 280 },
  { day: 'Tue', value: 320 },
  { day: 'Wed', value: 250 },
  { day: 'Thu', value: 380 },
  { day: 'Fri', value: 300 },
  { day: 'Sat', value: 270 },
  { day: 'Sun', value: 200 },
];

const secondaryData: DataPoint[] = [
  { day: 'Mon', value: 220 },
  { day: 'Tue', value: 260 },
  { day: 'Wed', value: 200 },
  { day: 'Thu', value: 280 },
  { day: 'Fri', value: 240 },
  { day: 'Sat', value: 230 },
  { day: 'Sun', value: 180 },
];

export function CalorieTrendsChart({
  data = defaultData,
  underGoalDays = 5,
  overGoalDays = 2,
}: CalorieTrendsChartProps) {
  const chartWidth = 280;
  const chartHeight = 100;
  const padding = 10;

  const maxValue = 400;
  const minValue = 100;

  const getY = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return chartHeight - normalized * chartHeight + padding;
  };

  const getX = (index: number) => {
    return (index / (data.length - 1)) * chartWidth + padding;
  };

  const createPath = (points: DataPoint[]) => {
    let path = '';
    points.forEach((point, index) => {
      const x = getX(index);
      const y = getY(point.value);
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        // Create smooth curve
        const prevX = getX(index - 1);
        const prevY = getY(points[index - 1].value);
        const cpX = (prevX + x) / 2;
        path += ` C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y}`;
      }
    });
    return path;
  };

  const yLabels = [400, 300, 200, 100];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie Trends</Text>

      <View style={styles.chartContainer}>
        <View style={styles.yLabels}>
          {yLabels.map((label) => (
            <Text key={label} style={styles.yLabel}>
              {label}
            </Text>
          ))}
        </View>

        <View style={styles.chartArea}>
          <Svg width={chartWidth + padding * 2} height={chartHeight + padding * 2}>
            {/* Grid lines */}
            {yLabels.map((_, index) => (
              <Line
                key={index}
                x1={padding}
                y1={getY(yLabels[index])}
                x2={chartWidth + padding}
                y2={getY(yLabels[index])}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}

            {/* Secondary line (orange/coral) */}
            <Path
              d={createPath(secondaryData)}
              stroke="#FF6F43"
              strokeWidth={2}
              fill="none"
            />

            {/* Primary line (black) */}
            <Path
              d={createPath(data)}
              stroke={Colors.background}
              strokeWidth={2}
              fill="none"
            />
          </Svg>

          <View style={styles.xLabels}>
            {data.map((point) => (
              <Text key={point.day} style={styles.xLabel}>
                {point.day}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF6F43' }]} />
          <Text style={styles.legendText}>{underGoalDays} days under goal</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.background }]} />
          <Text style={styles.legendText}>
            {overGoalDays} days over by more than 200 kcal
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent100,
    borderRadius: 24,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.background,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
  },
  yLabels: {
    justifyContent: 'space-between',
    paddingRight: 12,
    height: 120,
  },
  yLabel: {
    fontSize: 13,
    color: Colors.background,
    textAlign: 'right',
  },
  chartArea: {
    flex: 1,
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  xLabel: {
    fontSize: 13,
    color: Colors.background,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  legendDot: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    marginRight: 8,
    marginTop: 3,
  },
  legendText: {
    fontSize: 13,
    color: Colors.background,
    flex: 1,
  },
});
