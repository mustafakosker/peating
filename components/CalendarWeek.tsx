import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

type DayData = {
  day: string;
  date: number;
  isSelected?: boolean;
  isPast?: boolean;
};

const days: DayData[] = [
  { day: 'Mon', date: 8, isPast: true },
  { day: 'Tue', date: 9, isPast: true },
  { day: 'Wed', date: 10, isPast: true },
  { day: 'Thu', date: 11, isSelected: true },
  { day: 'Fri', date: 12 },
  { day: 'Sat', date: 13 },
  { day: 'Sun', date: 14 },
];

export function CalendarWeek() {
  return (
    <View style={styles.container}>
      {days.map((item) => (
        <View
          key={item.day}
          style={[
            styles.dayContainer,
            item.isSelected && styles.selectedDayContainer,
          ]}
        >
          <Text
            style={[
              styles.dayText,
              item.isPast && styles.pastDayText,
              !item.isPast && !item.isSelected && styles.futureDayText,
            ]}
          >
            {item.day}
          </Text>
          {item.isSelected ? (
            <View style={styles.selectedDateCircle}>
              <Text style={styles.selectedDateText}>{item.date}</Text>
            </View>
          ) : (
            <Text
              style={[
                styles.dateText,
                item.isPast && styles.pastDayText,
                !item.isPast && styles.futureDayText,
              ]}
            >
              {item.date}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dayContainer: {
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 4,
  },
  selectedDayContainer: {
    backgroundColor: Colors.accent100,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 13,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.background,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.background,
  },
  pastDayText: {
    color: Colors.background,
  },
  futureDayText: {
    color: Colors.gray300,
  },
  selectedDateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.white,
  },
});
