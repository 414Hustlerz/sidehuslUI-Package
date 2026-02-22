import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { colors, radius, shadows, spacing, typography } from '../../theme/tokens';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  label?: string;
  style?: object;
}

export function QRCodeDisplay({ value, size = 200, label, style }: QRCodeDisplayProps) {
  return (
    <View style={[styles.container, style]}>
      <QRCode value={value} size={size} backgroundColor="white" color="#182230" />
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: radius.lg,
    padding: spacing['2xl'],
    ...shadows.xs,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.body.size,
    marginTop: 16,
  },
});
