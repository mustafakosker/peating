import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { FormInput } from '../components/FormInput';
import { FormDropdown } from '../components/FormDropdown';

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Jane Cooper');
  const [email, setEmail] = useState('janecooper@email.com');
  const [dob, setDob] = useState('21-05-2003');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('5.3ft');
  const [weight, setWeight] = useState('56kg');

  const handleSave = () => {
    // Save profile logic
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
          </Pressable>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Picture */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' }}
            style={styles.avatar}
          />
          <Pressable style={styles.cameraButton}>
            <Ionicons name="camera" size={16} color={Colors.white} />
          </Pressable>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <FormInput
            label="Name"
            value={name}
            onChangeText={setName}
          />

          <FormInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <FormDropdown
                label="DOB"
                value={dob}
              />
            </View>
            <View style={styles.halfWidth}>
              <FormDropdown
                label="Gender"
                value={gender}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <FormDropdown
                label="Height"
                value={height}
              />
            </View>
            <View style={styles.halfWidth}>
              <FormDropdown
                label="Weight"
                value={weight}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    lineHeight: 36,
  },
  headerSpacer: {
    width: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '50%',
    marginRight: -42,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  halfWidth: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    lineHeight: 27,
  },
});
