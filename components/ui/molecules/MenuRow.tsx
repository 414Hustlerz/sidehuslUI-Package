import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientIcon } from '../atoms/GradientIcon';
import { colors } from '../../../theme/tokens';
import type { ComponentProps, ReactNode } from 'react';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

interface MenuRowProps {
  icon: IoniconsName;
  label: string;
  description?: string;
  onPress?: () => void;
  destructive?: boolean;
  rightElement?: ReactNode;
  showChevron?: boolean;
}

export function MenuRow({
  icon,
  label,
  description,
  onPress,
  destructive = false,
  rightElement,
  showChevron,
}: MenuRowProps) {
  const resolvedShowChevron = showChevron ?? !destructive;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
      }}
      activeOpacity={0.7}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: destructive ? colors.status.error.bg : colors.elevated,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        {destructive ? (
          <Ionicons name={icon} size={18} color={colors.status.error.text} />
        ) : (
          <GradientIcon name={icon} size={18} />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: destructive ? colors.status.error.text : colors.textPrimary,
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          {label}
        </Text>
        {description ? (
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              lineHeight: 18,
              marginTop: 2,
            }}
          >
            {description}
          </Text>
        ) : null}
      </View>

      {rightElement
        ? rightElement
        : resolvedShowChevron && (
            <GradientIcon name="chevron-forward" size={16} />
          )}
    </TouchableOpacity>
  );
}
