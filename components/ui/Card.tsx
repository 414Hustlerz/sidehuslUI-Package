import { View, Pressable } from 'react-native';
import type { ReactNode } from 'react';
import { colors, radius, shadows } from '../../theme/tokens';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: 'surface' | 'elevated';
  className?: string;
}

export function Card({ children, onPress, variant = 'surface' }: CardProps) {
  const bg = variant === 'elevated' ? colors.elevated : colors.surface;

  const style = {
    backgroundColor: bg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.xs,
  };

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={style}>
        {children}
      </Pressable>
    );
  }

  return <View style={style}>{children}</View>;
}
