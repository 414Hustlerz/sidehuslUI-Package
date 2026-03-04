import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { colors, spacing, radius } from '../../../theme/tokens';

interface TransactionRowProps {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  amount: number;
  isPositive: boolean;
  status?: string;
  timestamp?: string;
}

export function TransactionRow({
  icon,
  iconColor,
  title,
  subtitle,
  amount,
  isPositive,
  status,
  timestamp,
}: TransactionRowProps) {
  const formattedAmount = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(Math.abs(amount));

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: isPositive
              ? 'rgba(0,201,177,0.1)'
              : 'rgba(255,255,255,0.04)',
          },
        ]}
      >
        <Ionicons
          name={icon as any}
          size={18}
          color={iconColor}
        />
      </View>
      <View style={styles.content}>
        <Text variant="body" weight="semibold" numberOfLines={1}>{title}</Text>
        <Text variant="caption" color="tertiary" numberOfLines={1}>
          {subtitle}
          {timestamp ? ` · ${timestamp}` : ''}
        </Text>
      </View>
      <View style={styles.amountWrap}>
        <Text
          variant="body"
          weight="bold"
          style={{
            color: isPositive ? colors.status.success.text : colors.status.error.text,
          }}
        >
          {isPositive ? '+' : '-'}{formattedAmount}
        </Text>
        {status ? (
          <Text variant="caption" color="tertiary">{status}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  amountWrap: {
    alignItems: 'flex-end',
    gap: 2,
  },
});
