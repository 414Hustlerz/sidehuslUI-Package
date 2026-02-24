import React from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import { colors } from '../../../theme/tokens';
import type { StyleProp, ViewStyle } from 'react-native';

interface SideHuslLogoProps {
  /** Width in pixels. Defaults to 200. */
  width?: number;
  /** Height in pixels. If provided without width, width auto-scales. */
  height?: number;
  /** 'white' for solid white, 'gradient' for primary blue→teal */
  variant?: 'white' | 'gradient';
  /** Override stroke color (takes precedence over variant) */
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const VB_W = 750;
const VB_H = 100;
const SW = 7;

export function SideHuslLogo({
  width,
  height,
  variant = 'white',
  color,
  style,
}: SideHuslLogoProps) {
  const aspect = VB_W / VB_H;
  const w = width ?? (height ? height * aspect : 200);
  const h = height ?? w / aspect;

  const stroke =
    color ?? (variant === 'gradient' ? 'url(#sidehuslGrad)' : '#FFFFFF');

  const p = {
    stroke,
    strokeWidth: SW,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none' as const,
  };

  return (
    <Svg
      width={w}
      height={h}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      style={style as any}
    >
      {variant === 'gradient' && !color && (
        <Defs>
          <SvgLinearGradient id="sidehuslGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={colors.gradientStart} />
            <Stop offset="1" stopColor={colors.gradientEnd} />
          </SvgLinearGradient>
        </Defs>
      )}

      {/* S */}
      <Path
        d="M 56 8 C 56 -8, 2 -8, 2 24 C 2 46, 56 54, 56 76 C 56 108, 2 108, 2 92"
        {...p}
      />

      {/* I */}
      <Path d="M 102 2 L 102 98" {...p} />

      {/* D — top horizontal, arc right, bottom horizontal, half vertical (middle→bottom) */}
      <Path d="M 150 2 L 176 2 C 224 2, 224 98, 176 98 L 150 98 L 150 50" {...p} />

      {/* E — three horizontal lines only, no vertical */}
      <Path
        d="M 258 2 L 312 2 M 258 50 L 312 50 M 258 98 L 312 98"
        {...p}
      />

      {/* H */}
      <Path
        d="M 360 2 L 360 98 M 422 2 L 422 98 M 360 50 L 422 50"
        {...p}
      />

      {/* U */}
      <Path
        d="M 470 2 L 470 68 C 470 90, 488 98, 505 98 C 522 98, 540 90, 540 68 L 540 2"
        {...p}
      />

      {/* S */}
      <Path
        d="M 636 8 C 636 -8, 582 -8, 582 24 C 582 46, 636 54, 636 76 C 636 108, 582 108, 582 92"
        {...p}
      />

      {/* L */}
      <Path d="M 682 2 L 682 98 L 736 98" {...p} />
    </Svg>
  );
}
