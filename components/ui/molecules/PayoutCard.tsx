import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { Divider } from '../atoms/Divider';
import { Pill } from '../atoms/Pill';
import { colors, spacing, radius } from '../../../theme/tokens';

interface PayoutCardProps {
  amount: number;
  bankName: string;
  accountLast4: string;
  period: string;
  processedDate: string;
  status: string;
}

const STATUS_CONFIG: Record<string, { variant: 'success' | 'pending' | 'warning' | 'error'; icon: string }> = {
  processed: { variant: 'success', icon: 'checkmark-circle' },
  completed: { variant: 'success', icon: 'checkmark-circle' },
  pending: { variant: 'pending', icon: 'time' },
  scheduled: { variant: 'warning', icon: 'calendar' },
  failed: { variant: 'error', icon: 'alert-circle' },
};

export function PayoutCard({ amount, bankName, accountLast4, period, processedDate, status }: PayoutCardProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  const formattedAmount = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name={config.icon as any} size={22} color={colors.accent} />
        </View>
        <View style={styles.headerContent}>
          <Text variant="h3" weight="bold">{formattedAmount}</Text>
          <Text variant="caption" color="secondary">
            {bankName} ····{accountLast4}
          </Text>
        </View>
        <Pill
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          variant={config.variant}
        />
      </View>

      <Divider spacing="sm" />

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Text variant="caption" color="tertiary">Period</Text>
          <Text variant="caption" color="secondary">{period}</Text>
        </View>
        {processedDate ? (
          <View style={styles.metaItem}>
            <Text variant="caption" color="tertiary">Processed</Text>
            <Text variant="caption" color="secondary">{processedDate}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: `${colors.accent}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
  },
  meta: {
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
