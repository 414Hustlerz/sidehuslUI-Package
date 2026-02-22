import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/tokens';
import type { ReactNode } from 'react';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightActions?: ReactNode;
  transparent?: boolean;
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  rightActions,
  transparent = false,
}: ScreenHeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: transparent ? 'transparent' : colors.background,
        borderBottomWidth: transparent ? 0 : 1,
        borderBottomColor: colors.border,
        gap: 12,
      }}
    >
      {/* Back button */}
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      )}

      {/* Title block — left aligned, fills available space */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: onBack ? 20 : 26,
            fontWeight: '700',
            lineHeight: onBack ? 26 : 32,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              lineHeight: 18,
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right actions — pinned to the right edge */}
      {rightActions && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {rightActions}
        </View>
      )}
    </View>
  );
}
