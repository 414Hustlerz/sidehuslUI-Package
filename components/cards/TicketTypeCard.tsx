import { View, Text, StyleSheet } from 'react-native';
import type { TicketType } from '@414hustlerz/types';
import { CapacityBar } from '../ui/atoms/CapacityBar';
import { QuantitySelector } from '../ui/molecules/QuantitySelector';
import { formatPrice } from '../utils';
import { colors, radius, spacing, typography } from '../../theme/tokens';

interface TicketTypeCardProps {
  ticketType: TicketType;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  isFreeEvent?: boolean;
  isSelected?: boolean;
}

function getAvailabilityMessage(ticketType: TicketType): string | null {
  const now = new Date();
  if (ticketType.sale_starts_at && new Date(ticketType.sale_starts_at) > now) {
    const date = new Date(ticketType.sale_starts_at);
    return `Sales open ${date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}`;
  }
  if (ticketType.sale_ends_at && new Date(ticketType.sale_ends_at) < now) {
    return 'Sales ended';
  }
  return null;
}

export function TicketTypeCard({
  ticketType,
  quantity,
  onQuantityChange,
  isFreeEvent = false,
  isSelected,
}: TicketTypeCardProps) {
  const remaining = ticketType.quantity_total - ticketType.quantity_sold;
  const isSoldOut = remaining <= 0;
  const availabilityMessage = getAvailabilityMessage(ticketType);
  const isUnavailable = isSoldOut || !!availabilityMessage;
  const maxSelectable = Math.min(ticketType.max_per_order, remaining);

  return (
    <View style={[styles.container, isUnavailable && styles.containerDisabled, (isSelected ?? quantity > 0) && styles.containerSelected]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={[styles.name, isUnavailable && styles.textDisabled]}>
            {ticketType.name}
          </Text>
          {!isFreeEvent && (
            <Text style={[styles.price, isUnavailable && styles.textDisabled]}>
              {formatPrice(ticketType.price)}
            </Text>
          )}
        </View>

        {ticketType.description && (
          <Text style={styles.description}>{ticketType.description}</Text>
        )}

        {isSoldOut ? (
          <Text style={styles.soldOut}>SOLD OUT</Text>
        ) : availabilityMessage ? (
          <Text style={styles.unavailable}>{availabilityMessage}</Text>
        ) : (
          <>
            <View style={styles.capacityRow}>
              <Text style={styles.remaining}>{remaining} / {ticketType.quantity_total} remaining</Text>
            </View>
            <CapacityBar sold={ticketType.quantity_sold} total={ticketType.quantity_total} showLabel={false} />
            <View style={styles.selectorRow}>
              <QuantitySelector
                value={quantity}
                max={maxSelectable}
                onValueChange={onQuantityChange}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  containerSelected: {
    borderColor: '#0066CC40',
  },
  header: {
    gap: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.bodyLg.size,
    fontWeight: '600',
    lineHeight: typography.bodyLg.lineHeight,
    flex: 1,
  },
  price: {
    color: colors.textPrimary,
    fontSize: typography.bodyLg.size,
    fontWeight: '700',
    lineHeight: typography.bodyLg.lineHeight,
    marginLeft: spacing.md,
  },
  textDisabled: {
    color: colors.textTertiary,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.caption.size,
    lineHeight: typography.caption.lineHeight,
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remaining: {
    color: colors.textSecondary,
    fontSize: typography.caption.size,
    lineHeight: typography.caption.lineHeight,
  },
  soldOut: {
    color: '#FF6B6B',
    fontSize: typography.label.size,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  unavailable: {
    color: colors.textSecondary,
    fontSize: typography.caption.size,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  selectorRow: {
    marginTop: spacing.xs,
  },
});
