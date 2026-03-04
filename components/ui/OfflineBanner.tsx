import { Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { colors } from '../../theme/tokens';

const BANNER_HEIGHT = 40;

interface OfflineBannerProps {
  /** Whether the device is offline — parent provides this via a network hook */
  isOffline: boolean;
}

export function OfflineBanner({ isOffline }: OfflineBannerProps) {
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withTiming(isOffline ? BANNER_HEIGHT : 0, { duration: 300 });
  }, [isOffline]);

  const containerStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden' as const,
  }));

  return (
    <Animated.View style={containerStyle}>
      <Animated.View
        style={{
          height: BANNER_HEIGHT,
          backgroundColor: colors.status.warning.bg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.status.warning.border,
        }}
      >
        <Ionicons name="cloud-offline" size={16} color={colors.status.warning.text} />
        <Text style={{ color: colors.status.warning.text, fontSize: 13, fontWeight: '600' }}>
          No internet connection
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
