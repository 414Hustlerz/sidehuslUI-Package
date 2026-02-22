import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, type TextStyle } from 'react-native';
import { gradients } from '../../../theme/tokens';

interface GradientTextProps {
  children: string;
  style?: TextStyle;
}

export function GradientText({ children, style }: GradientTextProps) {
  return (
    <MaskedView
      style={{ alignSelf: 'flex-start' }}
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]}>{children}</Text>
      }
    >
      <LinearGradient
        colors={gradients.primary as unknown as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ alignSelf: 'flex-start' }}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}
