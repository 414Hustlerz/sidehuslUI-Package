import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/tokens';
import { GradientText } from './atoms/GradientText';
import { GradientIcon } from './atoms/GradientIcon';
import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface SectionHeaderProps {
  title: string;
  emoji?: string;
  icon?: ComponentProps<typeof Ionicons>['name'];
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionHeader({ title, emoji, icon, actionLabel, onAction, className = '' }: SectionHeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {emoji && <Text style={{ fontSize: 20 }}>{emoji}</Text>}
        {icon && !emoji && <GradientIcon name={icon} size={20} />}
        <Text style={{ color: colors.textPrimary, fontSize: 20, fontWeight: '700', lineHeight: 28 }}>
          {title}
        </Text>
      </View>
      {actionLabel && onAction && (
        <TouchableOpacity onPress={onAction}>
          <GradientText style={{ fontSize: 13, fontWeight: '500', lineHeight: 18 }}>
            {actionLabel}
          </GradientText>
        </TouchableOpacity>
      )}
    </View>
  );
}
