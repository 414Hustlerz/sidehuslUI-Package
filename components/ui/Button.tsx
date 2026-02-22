import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { colors, gradients } from '../../theme/tokens';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const sizeStyles: Record<Size, { paddingVertical: number; paddingHorizontal: number; fontSize: number; borderRadius: number }> = {
  sm: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 13, borderRadius: 8 },
  md: { paddingVertical: 12, paddingHorizontal: 20, fontSize: 15, borderRadius: 10 },
  lg: { paddingVertical: 16, paddingHorizontal: 28, fontSize: 16, borderRadius: 12 },
};

export function Button({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const s = sizeStyles[size];
  const isDisabled = disabled || loading;

  const textColor = variant === 'primary'
    ? '#FFFFFF'
    : variant === 'secondary'
    ? colors.textSecondary
    : variant === 'outline'
    ? colors.primary
    : variant === 'ghost'
    ? colors.textSecondary
    : colors.status.error.text;

  const content = loading ? (
    <ActivityIndicator size="small" color={textColor} />
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {icon}
      <Text style={{ color: textColor, fontSize: s.fontSize, fontWeight: '600', lineHeight: s.fontSize * 1.4 }}>
        {children}
      </Text>
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={{ borderRadius: s.borderRadius, overflow: 'hidden', opacity: isDisabled ? 0.5 : 1, width: fullWidth ? '100%' : undefined }}
      >
        <LinearGradient
          colors={gradients.primary as unknown as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ paddingVertical: s.paddingVertical, paddingHorizontal: s.paddingHorizontal, alignItems: 'center', justifyContent: 'center' }}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const bgColor =
    variant === 'secondary' ? colors.elevated
    : variant === 'danger' ? colors.status.error.bg
    : 'transparent';

  const borderColor =
    variant === 'outline' ? colors.primary
    : variant === 'danger' ? colors.status.error.border
    : 'transparent';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={{
        borderRadius: s.borderRadius,
        backgroundColor: bgColor,
        borderWidth: variant === 'outline' || variant === 'danger' ? 1.5 : 0,
        borderColor,
        paddingVertical: s.paddingVertical,
        paddingHorizontal: s.paddingHorizontal,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDisabled ? 0.5 : 1,
        width: fullWidth ? '100%' : undefined,
      }}
    >
      {content}
    </TouchableOpacity>
  );
}
