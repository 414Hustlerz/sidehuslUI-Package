import { useRef, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radius, spacing } from '../../../theme/tokens';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function OTPInput({ length = 6, value, onChange, error = false }: OTPInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const shakeX = useSharedValue(0);

  const digits = value.split('').concat(Array(length - value.length).fill(''));

  useEffect(() => {
    if (error) {
      shakeX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-4, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
    }
  }, [error]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const handleChange = useCallback((text: string, index: number) => {
    const newDigits = [...digits];

    if (text.length > 1) {
      const pasted = text.replace(/\D/g, '').slice(0, length);
      onChange(pasted);
      const focusIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    const digit = text.replace(/\D/g, '');
    newDigits[index] = digit;
    const newValue = newDigits.join('').slice(0, length);
    onChange(newValue);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [digits, length, onChange]);

  const handleKeyPress = useCallback((e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newDigits = [...digits];
      newDigits[index - 1] = '';
      onChange(newDigits.join(''));
    }
  }, [digits, onChange]);

  return (
    <Animated.View style={[styles.container, shakeStyle]}>
      {Array.from({ length }).map((_, index) => {
        const isFilled = !!digits[index];
        const isActive = index === value.length;

        return (
          <Animated.View
            key={index}
            entering={FadeIn.delay(index * 60).duration(300)}
          >
            <Pressable
              onPress={() => inputRefs.current[index]?.focus()}
              style={[
                styles.cell,
                isFilled && styles.cellFilled,
                isActive && styles.cellActive,
                error && styles.cellError,
              ]}
            >
              {isFilled ? (
                <LinearGradient
                  colors={[...gradients.primary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.cellGradientBorder}
                />
              ) : null}
              <TextInput
                ref={(ref) => { inputRefs.current[index] = ref; }}
                value={digits[index]}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={length}
                selectTextOnFocus
                style={styles.input}
                caretHidden
              />
            </Pressable>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  cell: {
    width: 48,
    height: 56,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cellFilled: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(0, 102, 204, 0.08)',
  },
  cellActive: {
    borderColor: colors.primary,
  },
  cellError: {
    borderColor: colors.status.error.border,
    backgroundColor: colors.status.error.bg,
  },
  cellGradientBorder: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  input: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
});
