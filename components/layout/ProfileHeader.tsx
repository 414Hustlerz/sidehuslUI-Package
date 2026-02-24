import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from '../ui/Avatar';
import { GradientIcon } from '../ui/atoms/GradientIcon';
import { colors, radius } from '../../theme/tokens';
import type { Profile } from '@414hustlerz/types';

interface ProfileHeaderProps {
  user: Profile | null;
  onEditPress?: () => void;
}

export function ProfileHeader({ user, onEditPress }: ProfileHeaderProps) {
  return (
    <View style={{ marginHorizontal: 16, marginVertical: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}
      >
      <Avatar imageUrl={user?.avatar_url} name={user?.full_name} size="lg" />

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 14 }}>
        <View style={{ flexShrink: 1, maxWidth: '75%' }}>
          <Text
            numberOfLines={1}
            style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: '700',
              lineHeight: 24,
            }}
          >
            {user?.full_name || 'Guest'}
          </Text>
          {user?.email ? (
            <Text
              numberOfLines={1}
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                lineHeight: 20,
                marginTop: 2,
              }}
            >
              {user.email}
            </Text>
          ) : null}
        </View>

        <View style={{ flex: 1 }} />

        {onEditPress && (
          <TouchableOpacity onPress={onEditPress} activeOpacity={0.7} style={{ padding: 8 }}>
            <GradientIcon name="create-outline" size={26} />
          </TouchableOpacity>
        )}
      </View>
      </View>
    </View>
  );
}
