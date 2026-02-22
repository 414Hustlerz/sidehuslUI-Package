import { View } from 'react-native';
import { colors, spacing } from '../../../theme/tokens';

interface DividerProps {
  color?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  vertical?: boolean;
}

const spacingMap = {
  none: 0,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
};

export function Divider({
  color = colors.border,
  spacing: spacingProp = 'md',
  vertical = false,
}: DividerProps) {
  const margin = spacingMap[spacingProp];

  if (vertical) {
    return (
      <View
        style={{
          width: 1,
          alignSelf: 'stretch',
          backgroundColor: color,
          marginHorizontal: margin,
        }}
      />
    );
  }

  return (
    <View
      style={{
        height: 1,
        backgroundColor: color,
        marginVertical: margin,
      }}
    />
  );
}
