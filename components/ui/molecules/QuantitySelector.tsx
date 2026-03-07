import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../../theme/tokens';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max: number;
  onValueChange: (value: number) => void;
}

export function QuantitySelector({ value, min = 0, max, onValueChange }: QuantitySelectorProps) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => canDecrement && onValueChange(value - 1)}
        style={[styles.button, !canDecrement && styles.buttonDisabled]}
        disabled={!canDecrement}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, !canDecrement && styles.buttonTextDisabled]}>-</Text>
      </TouchableOpacity>

      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>

      <TouchableOpacity
        onPress={() => canIncrement && onValueChange(value + 1)}
        style={[styles.button, !canIncrement && styles.buttonDisabled]}
        disabled={!canIncrement}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, !canIncrement && styles.buttonTextDisabled]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: typography.h3.size,
    fontWeight: '600',
    lineHeight: typography.h3.lineHeight,
  },
  buttonTextDisabled: {
    color: colors.textTertiary,
  },
  valueContainer: {
    minWidth: 32,
    alignItems: 'center',
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.bodyLg.size,
    fontWeight: '600',
  },
});
