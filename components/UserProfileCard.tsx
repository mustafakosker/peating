import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';

interface UserProfileCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onPress?: () => void;
}

export function UserProfileCard({ name, email, avatarUrl, onPress }: UserProfileCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarInitial}>{name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray500,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.gray400,
    padding: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    lineHeight: 27,
  },
  email: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.white,
    lineHeight: 22,
  },
});
