import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.gray300,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
              <Ionicons
                name={focused ? 'stats-chart' : 'stats-chart-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
              <Ionicons
                name={focused ? 'scan' : 'scan-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="diets"
        options={{
          title: 'Diets',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
              <Ionicons
                name={focused ? 'restaurant' : 'restaurant-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: Colors.gray400,
    borderRadius: 100,
    height: 66,
    paddingBottom: 0,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.24,
    shadowRadius: 14,
    elevation: 8,
  },
  tabIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    backgroundColor: Colors.accent100,
  },
});
