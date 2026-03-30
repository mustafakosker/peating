import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type HeaderBarProps = {
  greeting?: string;
  avatarUrl?: string;
};

export function HeaderBar({ greeting = 'Good Morning', avatarUrl }: HeaderBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
          ) : (
            <View style={[styles.avatarImage, styles.avatarPlaceholder]}>
              <Ionicons name="person" size={20} color={Colors.white} />
            </View>
          )}
        </View>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="diamond-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.gray400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.white,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray400,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
