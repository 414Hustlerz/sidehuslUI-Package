import { View, Text } from 'react-native';
import { colors } from '../../theme/tokens';

type BadgeVariant = 'warning' | 'success' | 'error' | 'pending' | 'completed' | 'info';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  warning: {
    bg: colors.status.warning.bg,
    text: colors.status.warning.text,
    border: colors.status.warning.border,
  },
  success: {
    bg: colors.status.success.bg,
    text: colors.status.success.text,
    border: colors.status.success.border,
  },
  error: {
    bg: colors.status.error.bg,
    text: colors.status.error.text,
    border: colors.status.error.border,
  },
  pending: {
    bg: colors.status.pending.bg,
    text: colors.status.pending.text,
    border: colors.status.pending.border,
  },
  completed: {
    bg: colors.status.completed.bg,
    text: colors.status.completed.text,
    border: colors.status.completed.border,
  },
  info: {
    bg: colors.status.info.bg,
    text: colors.status.info.text,
    border: colors.status.info.border,
  },
};

export function StatusBadge({ label, variant = 'info', className = '' }: StatusBadgeProps) {
  const v = variantStyles[variant];

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 9999,
        borderWidth: 1,
        backgroundColor: v.bg,
        borderColor: v.border,
      }}
    >
      <Text style={{ color: v.text, fontSize: 12, fontWeight: '600', lineHeight: 16 }}>
        {label}
      </Text>
    </View>
  );
}
