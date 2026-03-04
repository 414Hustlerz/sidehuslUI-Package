import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/atoms/Text';
import { Pill } from '../ui/atoms/Pill';
import { colors, spacing, radius } from '../../theme/tokens';

const DEVICE_ICONS: Record<string, string> = {
  phone: 'phone-portrait-outline',
  mobile: 'phone-portrait-outline',
  desktop: 'desktop-outline',
  tablet: 'tablet-portrait-outline',
};

interface SessionCardProps {
  deviceName: string;
  deviceType: 'phone' | 'desktop' | 'tablet';
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
  onRevoke?: () => void;
}

export function SessionCard({
  deviceName,
  deviceType,
  location,
  ipAddress,
  lastActive,
  isCurrent,
  onRevoke,
}: SessionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Ionicons
          name={(DEVICE_ICONS[deviceType] || 'phone-portrait-outline') as any}
          size={22}
          color={isCurrent ? colors.accent : colors.textSecondary}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text variant="body" weight="semibold">{deviceName}</Text>
          {isCurrent && <Pill label="Current" variant="accent" size="sm" />}
        </View>
        <Text variant="caption" color="secondary">
          {location} {'\u2022'} {ipAddress}
        </Text>
        <Text variant="caption" color="tertiary">
          Last active: {lastActive}
        </Text>
      </View>
      {!isCurrent && onRevoke && (
        <Pressable onPress={onRevoke} style={styles.revokeBtn}>
          <Ionicons name="close-circle" size={22} color={colors.status.error.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  revokeBtn: {
    padding: spacing.sm,
  },
});
