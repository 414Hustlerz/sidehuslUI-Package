import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Notification } from '@414hustlerz/types';
import { formatRelative } from '../utils';
import { colors, radius } from '../../theme/tokens';

interface NotificationCardProps {
  notification: Notification;
  onPress: () => void;
  className?: string;
}

const typeIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
  order_ready: 'bag-check-outline',
  order_confirmed: 'checkmark-circle-outline',
  announcement: 'megaphone-outline',
  poll_published: 'bar-chart-outline',
  transfer_received: 'swap-horizontal-outline',
};

const typeColor: Record<string, string> = {
  order_ready: colors.status.success.text,
  order_confirmed: colors.accent,
  announcement: colors.status.warning.text,
  poll_published: colors.primary,
  transfer_received: colors.status.info.text,
};

export function NotificationCard({ notification, onPress, className = '' }: NotificationCardProps) {
  const isUnread = !notification.is_read;
  const iconName = typeIcon[notification.type] ?? 'notifications-outline';
  const iconColor = typeColor[notification.type] ?? colors.textSecondary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        padding: 16,
        backgroundColor: isUnread ? 'rgba(0, 102, 204, 0.06)' : 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
          backgroundColor: `${iconColor}18`,
          flexShrink: 0,
        }}
      >
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 14,
            fontWeight: isUnread ? '600' : '400',
            lineHeight: 20,
            marginBottom: 2,
          }}
        >
          {notification.title}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 13, lineHeight: 18 }} numberOfLines={2}>
          {notification.body}
        </Text>
        <Text style={{ color: colors.textTertiary, fontSize: 11, lineHeight: 14, marginTop: 4 }}>
          {formatRelative(notification.created_at)}
        </Text>
      </View>
      {isUnread && (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.primary,
            marginTop: 6,
            flexShrink: 0,
          }}
        />
      )}
    </TouchableOpacity>
  );
}
