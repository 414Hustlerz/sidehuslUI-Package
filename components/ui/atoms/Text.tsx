import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { colors, typography } from '../../../theme/tokens';

type Variant = 'display' | 'h1' | 'h2' | 'h3' | 'body-lg' | 'body' | 'label' | 'caption';
type Color = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'accent';
type Weight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: Color;
  weight?: Weight;
}

const variantStyle: Record<Variant, TextStyle> = {
  display: { fontSize: typography.display.size, lineHeight: typography.display.lineHeight, fontWeight: typography.display.weight },
  h1: { fontSize: typography.h1.size, lineHeight: typography.h1.lineHeight, fontWeight: typography.h1.weight },
  h2: { fontSize: typography.h2.size, lineHeight: typography.h2.lineHeight, fontWeight: typography.h2.weight },
  h3: { fontSize: typography.h3.size, lineHeight: typography.h3.lineHeight, fontWeight: typography.h3.weight },
  'body-lg': { fontSize: typography.bodyLg.size, lineHeight: typography.bodyLg.lineHeight, fontWeight: typography.bodyLg.weight },
  body: { fontSize: typography.body.size, lineHeight: typography.body.lineHeight, fontWeight: typography.body.weight },
  label: { fontSize: typography.label.size, lineHeight: typography.label.lineHeight, fontWeight: typography.label.weight },
  caption: { fontSize: typography.caption.size, lineHeight: typography.caption.lineHeight, fontWeight: typography.caption.weight },
};

const colorStyle: Record<Color, TextStyle> = {
  primary: { color: colors.textPrimary },
  secondary: { color: colors.textSecondary },
  tertiary: { color: colors.textTertiary },
  inverse: { color: colors.textInverse },
  accent: { color: colors.accent },
};

const weightStyle: Record<Weight, TextStyle> = {
  normal: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
};

export function Text({
  variant = 'body',
  color = 'primary',
  weight,
  style,
  ...props
}: TextProps) {
  return (
    <RNText
      style={[
        variantStyle[variant],
        colorStyle[color],
        weight ? weightStyle[weight] : undefined,
        style,
      ]}
      {...props}
    />
  );
}
