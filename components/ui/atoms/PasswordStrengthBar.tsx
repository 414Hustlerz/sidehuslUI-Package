import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors, spacing } from '../../../theme/tokens';
import { Text } from './Text';
import { getPasswordStrength, type PasswordStrength } from '../../utils/validation';

interface PasswordStrengthBarProps {
  password: string;
}

const strengthConfig: Record<PasswordStrength, { color: string; label: string }> = {
  weak: { color: colors.status.error.text, label: 'Weak' },
  fair: { color: colors.status.warning.text, label: 'Fair' },
  strong: { color: colors.status.success.text, label: 'Strong' },
};

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const { strength, score } = getPasswordStrength(password);
  const config = strengthConfig[strength];

  const barStyle = useAnimatedStyle(() => ({
    width: withTiming(`${Math.max(score * 100, 5)}%`, { duration: 300 }),
    backgroundColor: withTiming(config.color, { duration: 300 }),
  }));

  if (!password) return null;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.bar, barStyle]} />
      </View>
      <Text variant="caption" style={{ color: config.color }}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 4,
    marginLeft: 20,
  },
  track: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 2,
  },
});
