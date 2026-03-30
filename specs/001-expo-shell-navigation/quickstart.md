# Quickstart: Expo Shell App with Bottom Tab Navigation

**Date**: 2026-03-30
**Feature**: 001-expo-shell-navigation

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo Go app on your mobile device (for testing) OR
- iOS Simulator (macOS) / Android Emulator

---

## Setup

### 1. Create the Expo Project

```bash
# Create new Expo app with tabs template
npx create-expo-app@latest peating --template tabs

# Navigate to project directory
cd peating
```

### 2. Install Dependencies

The tabs template includes all required dependencies. Verify they're installed:

```bash
npm install
```

### 3. Start Development Server

```bash
# Start Expo development server
npx expo start
```

---

## Running the App

### Option A: Expo Go (Recommended for Development)

1. Install "Expo Go" from App Store (iOS) or Play Store (Android)
2. Scan the QR code displayed in terminal
3. App loads on your device

### Option B: iOS Simulator (macOS only)

```bash
npx expo start --ios
```

### Option C: Android Emulator

```bash
npx expo start --android
```

---

## Project Structure After Setup

```
peating/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab navigator config
│   │   ├── index.tsx        # Home screen
│   │   ├── food-log.tsx     # Food Log screen (create this)
│   │   └── settings.tsx     # Settings screen (create this)
│   └── _layout.tsx          # Root layout
├── assets/                   # Images and fonts
├── components/              # Shared components
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

---

## Key Files to Modify

### 1. Tab Layout Configuration

**File**: `app/(tabs)/_layout.tsx`

Configure the three tabs with icons and labels:

```typescript
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="food-log"
        options={{
          title: 'Food Log',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'restaurant' : 'restaurant-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### 2. Screen Components

Each screen follows the same pattern. Example for Home:

**File**: `app/(tabs)/index.tsx`

```typescript
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

---

## Testing

### Run Tests

```bash
npm test
```

### Manual Testing Checklist

- [ ] App launches to Home screen
- [ ] Tap Food Log tab → Food Log screen appears
- [ ] Tap Settings tab → Settings screen appears
- [ ] Tap Home tab → Home screen appears
- [ ] Active tab is visually highlighted
- [ ] Each screen shows its title
- [ ] Rotate device → tab bar remains visible

---

## Common Commands

| Command | Description |
|---------|-------------|
| `npx expo start` | Start development server |
| `npx expo start --clear` | Start with cleared cache |
| `npx expo start --ios` | Run on iOS Simulator |
| `npx expo start --android` | Run on Android Emulator |
| `npm test` | Run test suite |
| `npx expo prebuild` | Generate native projects |

---

## Troubleshooting

### Metro Bundler Issues

```bash
npx expo start --clear
```

### Dependency Issues

```bash
rm -rf node_modules
npm install
```

### iOS Simulator Not Found

```bash
# Install Xcode command line tools
xcode-select --install
```
