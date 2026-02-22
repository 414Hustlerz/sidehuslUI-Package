import { View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { colors, gradients } from '../../theme/tokens';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 48 }}>
      <MaskedView
        maskElement={
          <View style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        }
      >
        <LinearGradient
          colors={gradients.primary as unknown as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 48, height: 48 }}
        />
      </MaskedView>
      <Text style={{ color: colors.textTertiary, fontSize: 18, fontWeight: '600', marginTop: 10, lineHeight: 24 }}>
        {message}
      </Text>
    </View>
  );
}
