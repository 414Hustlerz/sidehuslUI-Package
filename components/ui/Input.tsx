import { useRef, useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, type TextInputProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../theme/tokens';

const UNFOCUSED = 0;
const FOCUSED = 1;
const DURATION = 200;
const EASING = Easing.bezier(0.4, 0, 0.2, 1);

const INPUT_HEIGHT = 56;
const BORDER_RADIUS = 28;

// Label positions
const LABEL_TOP_RESTING = 19;
const LABEL_TOP_FLOATING = 6;
const LABEL_SIZE_RESTING = 16;
const LABEL_SIZE_FLOATING = 12;

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: object;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerStyle,
  value,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const progress = useSharedValue(value ? FOCUSED : UNFOCUSED);
  const hasError = !!error;

  const iconLeft = leftIcon ? 44 : 20;

  const handleFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      progress.value = withTiming(FOCUSED, { duration: DURATION, easing: EASING });
      onFocus?.(e);
    },
    [onFocus, progress],
  );

  const handleBlur = useCallback(
    (e: any) => {
      setIsFocused(false);
      if (!value) {
        progress.value = withTiming(UNFOCUSED, { duration: DURATION, easing: EASING });
      }
      onBlur?.(e);
    },
    [onBlur, value, progress],
  );

  const labelAnimStyle = useAnimatedStyle(() => ({
    top: interpolate(progress.value, [0, 1], [LABEL_TOP_RESTING, LABEL_TOP_FLOATING]),
    fontSize: interpolate(progress.value, [0, 1], [LABEL_SIZE_RESTING, LABEL_SIZE_FLOATING]),
  }));

  const isFloating = isFocused || !!value;

  return (
    <View style={containerStyle}>
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={{
          height: INPUT_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: hasError
            ? colors.status.error.border
            : isFocused
              ? colors.primary
              : colors.border,
          borderRadius: BORDER_RADIUS,
          paddingHorizontal: 16,
        }}
      >
        {leftIcon && (
          <View style={{ marginRight: 12 }}>{leftIcon}</View>
        )}

        <View style={{ flex: 1, height: INPUT_HEIGHT, justifyContent: 'center' }}>
          {label && (
            <Animated.Text
              style={[
                {
                  position: 'absolute',
                  left: 0,
                  color: hasError
                    ? colors.status.error.text
                    : isFocused
                      ? colors.primary
                      : colors.textSecondary,
                  fontWeight: '500',
                },
                labelAnimStyle,
              ]}
              numberOfLines={1}
            >
              {label}
            </Animated.Text>
          )}
          <TextInput
            ref={inputRef}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={colors.textTertiary}
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              paddingVertical: 0,
              marginTop: isFloating && label ? 8 : 0,
              textAlignVertical: 'center',
              includeFontPadding: false,
            }}
            {...props}
            placeholder={label ? undefined : props.placeholder}
          />
        </View>

        {rightIcon && (
          <View style={{ marginLeft: 8 }}>{rightIcon}</View>
        )}
      </Pressable>

      {error && (
        <Text
          style={{
            color: colors.status.error.text,
            fontSize: 12,
            lineHeight: 16,
            marginTop: 6,
            marginLeft: 20,
          }}
        >
          {error}
        </Text>
      )}
      {!error && hint && (
        <Text
          style={{
            color: colors.textTertiary,
            fontSize: 12,
            lineHeight: 16,
            marginTop: 6,
            marginLeft: 20,
          }}
        >
          {hint}
        </Text>
      )}
    </View>
  );
}
