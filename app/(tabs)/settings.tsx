import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { UserProfileCard } from '../../components/UserProfileCard';
import { SettingsMenuItem } from '../../components/SettingsMenuItem';

const MAIN_SETTINGS = [
  { id: 'profile', label: 'Profile' },
  { id: 'password', label: 'Change Password' },
  { id: 'notification', label: 'Notification' },
  { id: 'payment', label: 'Payment Method' },
  { id: 'favorite', label: 'Favorite' },
];

export default function SettingsScreen() {
  const router = useRouter();

  const handleMenuPress = (id: string) => {
    if (id === 'profile') {
      router.push('/profile');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>Settings</Text>

        <UserProfileCard
          name="Jane Cooper"
          email="janecooper@email.com"
          avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
          onPress={() => router.push('/profile')}
        />

        <View style={styles.settingsSection}>
          <View style={styles.settingsCard}>
            {MAIN_SETTINGS.map((item, index) => (
              <View key={item.id}>
                <SettingsMenuItem label={item.label} onPress={() => handleMenuPress(item.id)} />
                {index < MAIN_SETTINGS.length - 1 && <View style={styles.menuItemSpacer} />}
              </View>
            ))}
          </View>

          <View style={styles.settingsCard}>
            <SettingsMenuItem label="More" />
          </View>

          <View style={styles.settingsCard}>
            <SettingsMenuItem label="Log Out" />
          </View>
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
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    lineHeight: 36,
    marginTop: 12,
  },
  settingsSection: {
    gap: 20,
  },
  settingsCard: {
    backgroundColor: Colors.gray500,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.gray400,
    padding: 20,
  },
  menuItemSpacer: {
    height: 30,
  },
});
