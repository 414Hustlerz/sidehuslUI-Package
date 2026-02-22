import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { gradients } from '../../../theme/tokens';
import type { ComponentProps } from 'react';

interface GradientIconProps {
  name: ComponentProps<typeof Ionicons>['name'];
  size: number;
}

export function GradientIcon({ name, size }: GradientIconProps) {
  return (
    <MaskedView
      style={{ width: size, height: size }}
      maskElement={<Ionicons name={name} size={size} color="black" />}
    >
      <LinearGradient
        colors={gradients.primary as unknown as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: size, height: size }}
      />
    </MaskedView>
  );
}
