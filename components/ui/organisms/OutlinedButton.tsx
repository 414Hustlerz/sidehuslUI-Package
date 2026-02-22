import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { colors } from '../../../theme/tokens';
import type { ReactNode } from 'react';

interface OutlinedButtonProps {
  onPress?: () => void;
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'error';
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: { paddingVertical: 10, paddingHorizontal: 20, fontSize: 14, borderRadius: 8 },
  md: { paddingVertical: 14, paddingHorizontal: 28, fontSize: 15, borderRadius: 10 },
  lg: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 16, borderRadius: 12 },
};

const colorMap = {
  primary: colors.primary,
  accent: colors.accent,
  error: colors.status.error.text,
};

export function OutlinedButton({
  onPress,
  children,
  loading = false,
  disabled = false,
  size = 'md',
  color = 'primary',
  fullWidth = true,
}: OutlinedButtonProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const s = sizeStyles[size];
  const borderColor = colorMap[color];

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
        activeOpacity={0.8}
        style={{
          borderRadius: s.borderRadius,
          borderWidth: 1.5,
          borderColor,
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
          backgroundColor: 'transparent',
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={borderColor} />
        ) : (
          <Text style={{ color: borderColor, fontSize: s.fontSize, fontWeight: '600', lineHeight: s.fontSize * 1.4 }}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
