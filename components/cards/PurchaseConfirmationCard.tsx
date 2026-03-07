import { View, Text, StyleSheet } from 'react-native';
import type { TicketPurchase } from '@414hustlerz/types';
import { formatPrice } from '../utils';
import { colors, radius, spacing, typography, shadows } from '../../theme/tokens';

interface PurchaseConfirmationCardProps {
  purchase: TicketPurchase;
  eventTitle: string;
  eventDate: string;
  venueName?: string;
  ticketTypeName: string;
  status?: 'completed' | 'pending';
  subtitle?: string;
}

export function PurchaseConfirmationCard({
  purchase,
  eventTitle,
  eventDate,
  venueName,
  ticketTypeName,
  status = 'completed',
  subtitle,
}: PurchaseConfirmationCardProps) {
  const isCompleted = status === 'completed';

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, !isCompleted && styles.iconContainerPending]}>
        <Text style={[styles.checkmark, !isCompleted && styles.checkmarkPending]}>
          {isCompleted ? '\u2713' : '\u23F0'}
        </Text>
      </View>

      <Text style={styles.heading}>
        {isCompleted ? 'Payment Successful' : 'Payment Received'}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}

      <Text style={styles.eventTitle}>{eventTitle}</Text>
      <Text style={styles.eventMeta}>
        {eventDate}{venueName ? ` \u2014 ${venueName}` : ''}
      </Text>

      <View style={styles.divider} />

      <View style={styles.details}>
        <Text style={styles.detailText}>
          {purchase.quantity}x {ticketTypeName}
        </Text>
        <Text style={styles.totalText}>
          Total: {formatPrice(purchase.total_amount)}
        </Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.purchaseNumber}>
        Purchase #{purchase.purchase_number}
      </Text>
      <Text style={[styles.statusText, !isCompleted && styles.statusTextPending]}>
        {isCompleted ? 'Payment confirmed' : 'Processing tickets...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing['3xl'],
    alignItems: 'center',
    ...shadows.sm,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00261A',
    borderWidth: 1,
    borderColor: '#006644',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  iconContainerPending: {
    backgroundColor: 'rgba(245,158,11,0.12)',
    borderColor: 'rgba(245,158,11,0.3)',
  },
  checkmark: {
    color: '#06D6A0',
    fontSize: 28,
    fontWeight: '700',
  },
  checkmarkPending: {
    color: '#F59E0B',
  },
  heading: {
    color: colors.textPrimary,
    fontSize: typography.h2.size,
    fontWeight: typography.h2.weight,
    lineHeight: typography.h2.lineHeight,
    marginBottom: spacing.xl,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body.size,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: -spacing.md,
    marginBottom: spacing.lg,
  },
  eventTitle: {
    color: colors.textPrimary,
    fontSize: typography.h3.size,
    fontWeight: typography.h3.weight,
    lineHeight: typography.h3.lineHeight,
    textAlign: 'center',
  },
  eventMeta: {
    color: colors.textSecondary,
    fontSize: typography.body.size,
    lineHeight: typography.body.lineHeight,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
  details: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    color: colors.textPrimary,
    fontSize: typography.bodyLg.size,
    lineHeight: typography.bodyLg.lineHeight,
  },
  totalText: {
    color: colors.textPrimary,
    fontSize: typography.h3.size,
    fontWeight: '700',
    lineHeight: typography.h3.lineHeight,
  },
  purchaseNumber: {
    color: colors.textSecondary,
    fontSize: typography.caption.size,
    lineHeight: typography.caption.lineHeight,
  },
  statusText: {
    color: '#06D6A0',
    fontSize: typography.body.size,
    fontWeight: '500',
    marginTop: spacing.xs,
  },
  statusTextPending: {
    color: '#F59E0B',
  },
});
