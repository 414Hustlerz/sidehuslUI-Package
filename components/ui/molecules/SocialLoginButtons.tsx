import { View, StyleSheet, Platform } from 'react-native';
import { OutlinedButton } from '../organisms/OutlinedButton';
import { Text } from '../atoms/Text';
import { colors, spacing } from '../../../theme/tokens';

interface SocialLoginButtonsProps {
  onGooglePress: () => void;
  onApplePress: () => void;
  loading?: boolean;
}

export function SocialLoginButtons({ onGooglePress, onApplePress, loading }: SocialLoginButtonsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text variant="caption" color="tertiary" style={styles.dividerText}>
          or continue with
        </Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <OutlinedButton onPress={onGooglePress} disabled={loading} size="md" color="primary">
            Google
          </OutlinedButton>
        </View>
        {Platform.OS === 'ios' && (
          <View style={styles.buttonWrapper}>
            <OutlinedButton onPress={onApplePress} disabled={loading} size="md" color="primary">
              Apple
            </OutlinedButton>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  buttonWrapper: {
    flex: 1,
  },
});
