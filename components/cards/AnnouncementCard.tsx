import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Announcement } from '@414hustlerz/types';
import { formatRelative } from '../utils';
import { colors } from '../../theme/tokens';

interface AnnouncementCardProps {
  announcement: Announcement;
  isNew?: boolean;
  onPress: () => void;
}

export function AnnouncementCard({ announcement, isNew = false, onPress }: AnnouncementCardProps) {
  const isEmergency = announcement.priority === 'emergency';
  const iconName = isEmergency ? 'warning' : 'megaphone';
  const iconColor = isEmergency ? colors.status.error.text : colors.status.warning.text;
  const title = isEmergency ? 'Emergency Alert' : 'Announcement';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        padding: 16,
        backgroundColor: isNew ? 'rgba(0, 102, 204, 0.06)' : 'transparent',
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
            fontWeight: isNew ? '600' : '400',
            lineHeight: 20,
            marginBottom: 2,
          }}
        >
          {title}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 13, lineHeight: 18 }} numberOfLines={2}>
          {announcement.message}
        </Text>
        <Text style={{ color: colors.textTertiary, fontSize: 11, lineHeight: 14, marginTop: 4 }}>
          {formatRelative(announcement.created_at)}
        </Text>
      </View>
      {isNew && (
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
