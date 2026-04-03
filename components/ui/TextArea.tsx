import { useRef, useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, type TextInputProps } from 'react-native';
import { colors } from '../../theme/tokens';

const MIN_HEIGHT = 120;
const BORDER_RADIUS = 16;

interface TextAreaProps extends Omit<TextInputProps, 'multiline'> {
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCount?: boolean;
}

export function TextArea({
  label,
  error,
  hint,
  value,
  maxLength,
  showCount,
  onFocus,
  onBlur,
  ...props
}: TextAreaProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error;
  const isFloating = isFocused || !!value;

  const handleFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  return (
    <View>
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={{
          minHeight: MIN_HEIGHT,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: hasError
            ? colors.status.error.border
            : isFocused
              ? colors.primary
              : colors.border,
          borderRadius: BORDER_RADIUS,
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: 12,
        }}
      >
        <View style={{ flex: 1, minHeight: MIN_HEIGHT - 26 }}>
          {label && (
            <Text
              style={{
                position: isFloating ? 'relative' : 'absolute',
                top: isFloating ? 0 : 5,
                left: 0,
                fontSize: isFloating ? 12 : 16,
                fontWeight: '500',
                color: hasError
                  ? colors.status.error.text
                  : isFocused
                    ? colors.primary
                    : colors.textSecondary,
              }}
              numberOfLines={1}
            >
              {label}
            </Text>
          )}
          <TextInput
            ref={inputRef}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            multiline
            textAlignVertical="top"
            placeholderTextColor={colors.textTertiary}
            maxLength={maxLength}
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              lineHeight: 22,
              paddingVertical: 0,
              marginTop: isFloating && label ? 4 : 0,
              minHeight: 80,
              includeFontPadding: false,
            }}
            {...props}
            placeholder={label ? undefined : props.placeholder}
          />
        </View>
      </Pressable>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, paddingHorizontal: 20 }}>
        <View style={{ flex: 1 }}>
          {error && (
            <Text style={{ color: colors.status.error.text, fontSize: 12, lineHeight: 16 }}>
              {error}
            </Text>
          )}
          {!error && hint && (
            <Text style={{ color: colors.textTertiary, fontSize: 12, lineHeight: 16 }}>
              {hint}
            </Text>
          )}
        </View>
        {showCount && maxLength && (
          <Text style={{ color: colors.textTertiary, fontSize: 11 }}>
            {value?.length ?? 0} / {maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}
