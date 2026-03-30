import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';

interface TabSwitcherProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function TabSwitcher({ tabs, activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <Pressable
          key={tab}
          style={[styles.tab, activeTab === index && styles.tabActive]}
          onPress={() => onTabChange(index)}
        >
          <Text style={[styles.tabText, activeTab === index && styles.tabTextActive]}>
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 30,
    padding: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.gray600,
    lineHeight: 25,
  },
  tabTextActive: {
    color: Colors.white,
  },
});
