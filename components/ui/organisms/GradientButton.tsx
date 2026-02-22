import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { gradients, colors } from '../../../theme/tokens';
import type { ReactNode } from 'react';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface GradientButtonProps {
  onPress?: () => void;
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: { paddingVertical: 10, paddingHorizontal: 20, fontSize: 14, borderRadius: 8 },
  md: { paddingVertical: 14, paddingHorizontal: 28, fontSize: 15, borderRadius: 10 },
  lg: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 16, borderRadius: 12 },
};

export function GradientButton({
  onPress,
  children,
  loading = false,
  disabled = false,
  size = 'md',
  fullWidth = true,
}: GradientButtonProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const s = sizeStyles[size];

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { mass: 0.5, damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { mass: 0.5, damping: 15, stiffness: 200 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Animated.View style={[animStyle, fullWidth && { width: '100%' }]}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
        style={{ borderRadius: s.borderRadius, overflow: 'hidden', opacity: disabled ? 0.5 : 1 }}
      >
        <LinearGradient
          colors={gradients.primary as unknown as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: s.paddingVertical,
            paddingHorizontal: s.paddingHorizontal,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 8,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={{ color: '#FFFFFF', fontSize: s.fontSize, fontWeight: '700', lineHeight: s.fontSize * 1.4 }}>
              {children}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}
