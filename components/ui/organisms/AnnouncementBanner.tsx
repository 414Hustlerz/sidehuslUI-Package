import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../../theme/tokens';
import { formatRelative } from '../../utils';
import type { Announcement, AnnouncementPriority } from '@414hustlerz/types';

interface AnnouncementBannerProps {
  announcement: Announcement;
  onDismiss?: () => void;
  onPress?: () => void;
}

const priorityStyles: Record<AnnouncementPriority, { border: string; icon: 'megaphone-outline' | 'alert-circle-outline'; iconColor: string }> = {
  normal: { border: colors.status.info.border, icon: 'megaphone-outline', iconColor: colors.status.info.text },
  emergency: { border: colors.status.error.border, icon: 'alert-circle-outline', iconColor: colors.status.error.text },
};

export function AnnouncementBanner({ announcement, onDismiss, onPress }: AnnouncementBannerProps) {
  const style = priorityStyles[announcement.priority] ?? priorityStyles.normal;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: style.border,
        padding: 14,
        flexDirection: 'row',
        gap: 12,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: `${style.iconColor}18`,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Ionicons name={style.icon} size={18} color={style.iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.textPrimary, fontSize: 14, fontWeight: '600', lineHeight: 20, marginBottom: 2 }}>
          {announcement.priority === 'emergency' ? '🚨 Emergency' : 'Announcement'}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 13, lineHeight: 18 }} numberOfLines={3}>
          {announcement.message}
        </Text>
        <Text style={{ color: colors.textTertiary, fontSize: 11, lineHeight: 14, marginTop: 6 }}>
          {formatRelative(announcement.created_at)}
        </Text>
      </View>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} hitSlop={8}>
          <Ionicons name="close" size={18} color={colors.textTertiary} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
