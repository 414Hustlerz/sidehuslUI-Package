import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../../../theme/tokens';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'card' | 'subtle' | 'hero';

interface GradientViewProps extends Omit<ComponentProps<typeof LinearGradient>, 'colors'> {
  variant?: Variant;
  colors?: readonly string[];
  children?: ReactNode;
  className?: string;
}

const variantColors: Record<Variant, readonly string[]> = {
  primary: gradients.primary,
  card: gradients.card,
  subtle: gradients.subtle,
  hero: gradients.hero,
};

const variantStart: Record<Variant, { x: number; y: number }> = {
  primary: { x: 0, y: 0 },
  card: { x: 0, y: 0 },
  subtle: { x: 0, y: 0 },
  hero: { x: 0, y: 0 },
};

const variantEnd: Record<Variant, { x: number; y: number }> = {
  primary: { x: 1, y: 0 },
  card: { x: 0, y: 1 },
  subtle: { x: 1, y: 1 },
  hero: { x: 0, y: 1 },
};

export function GradientView({
  variant = 'primary',
  colors: customColors,
  children,
  className = '',
  style,
  ...props
}: GradientViewProps) {
  const resolvedColors = customColors ?? variantColors[variant];

  return (
    <LinearGradient
      colors={resolvedColors as [string, string, ...string[]]}
      start={variantStart[variant]}
      end={variantEnd[variant]}
      style={style as any}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
