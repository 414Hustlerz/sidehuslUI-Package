import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/tokens';
import type { ComponentProps } from 'react';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];
type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface IconProps {
  name: IoniconsName;
  size?: IconSize | number;
  color?: string;
}

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export function Icon({ name, size = 'md', color = colors.textSecondary }: IconProps) {
  const px = typeof size === 'number' ? size : sizeMap[size];
  return <Ionicons name={name} size={px} color={color} />;
}
