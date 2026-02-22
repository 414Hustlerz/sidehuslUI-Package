import { View, Text, type ViewStyle } from 'react-native';
import { colors } from '../../../theme/tokens';

type PillVariant = 'default' | 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'pending';

interface PillProps {
  label: string;
  variant?: PillVariant;
  size?: 'sm' | 'md';
}

const variantStyles: Record<PillVariant, { bg: string; text: string; border: string }> = {
  default: { bg: colors.elevated, text: colors.textSecondary, border: colors.border },
  primary: { bg: 'rgba(0, 102, 204, 0.15)', text: '#4DA6FF', border: 'rgba(0, 102, 204, 0.3)' },
  accent: { bg: 'rgba(0, 201, 177, 0.15)', text: colors.accent, border: 'rgba(0, 201, 177, 0.3)' },
  success: { bg: colors.status.success.bg, text: colors.status.success.text, border: colors.status.success.border },
  error: { bg: colors.status.error.bg, text: colors.status.error.text, border: colors.status.error.border },
  warning: { bg: colors.status.warning.bg, text: colors.status.warning.text, border: colors.status.warning.border },
  pending: { bg: colors.status.pending.bg, text: colors.status.pending.text, border: colors.status.pending.border },
};

export function Pill({ label, variant = 'default', size = 'md' }: PillProps) {
  const s = variantStyles[variant];
  const isSmall = size === 'sm';

  return (
    <View
      style={{
        backgroundColor: s.bg,
        borderColor: s.border,
        borderWidth: 1,
        borderRadius: 9999,
        paddingHorizontal: isSmall ? 8 : 10,
        paddingVertical: isSmall ? 2 : 4,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          color: s.text,
          fontSize: isSmall ? 11 : 12,
          fontWeight: '600',
          lineHeight: isSmall ? 14 : 16,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
