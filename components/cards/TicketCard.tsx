import { View, Text, StyleSheet } from 'react-native';
import type { Ticket } from '@414hustlerz/types';
import { QRCodeDisplay } from '../display/QRCodeDisplay';
import { TicketStatusBadge } from '../ui/atoms/TicketStatusBadge';
import { formatPrice } from '../utils';
import { colors, radius, spacing, typography, shadows } from '../../theme/tokens';

interface TicketCardProps {
  ticket: Ticket;
  eventTitle?: string;
  eventDate?: string;
  venueName?: string;
  holderName?: string;
  transferRecipient?: string;
  qrSize?: number;
  opacity?: number;
  onTransfer?: () => void;
  onRefund?: () => void;
  actionSlot?: React.ReactNode;
}

function getDisplayStatus(ticket: Ticket): 'active' | 'transferred' | 'refunded' | 'cancelled' | 'checked_in' | 'transfer_pending' {
  if (ticket.checked_in_at) return 'checked_in';
  if (ticket.status === 'transferred' && ticket.transferred_to) return 'transferred';
  return ticket.status;
}

export function TicketCard({
  ticket,
  eventTitle,
  eventDate,
  venueName,
  holderName,
  transferRecipient,
  qrSize = 180,
  opacity,
  onTransfer,
  onRefund,
  actionSlot,
}: TicketCardProps) {
  const displayStatus = getDisplayStatus(ticket);
  const isInactive = displayStatus !== 'active';
  const isActive = ticket.status === 'active' && !ticket.checked_in_at;
  const resolvedHolderName = holderName ?? ticket.holder_name;

  return (
    <View style={[styles.container, isInactive && styles.containerInactive, opacity != null && { opacity }]}>
      {eventTitle && <Text style={styles.eventTitle}>{eventTitle}</Text>}
      {eventDate && (
        <Text style={styles.eventMeta}>
          {eventDate}{venueName ? ` \u00B7 ${venueName}` : ''}
        </Text>
      )}

      <View style={styles.statusRow}>
        <TicketStatusBadge status={displayStatus} />
        {ticket.checked_in_at && (
          <Text style={styles.checkedInTime}>
            Checked in at {new Date(ticket.checked_in_at).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
        {displayStatus === 'transferred' && transferRecipient && (
          <Text style={styles.transferInfo}>To {transferRecipient}</Text>
        )}
      </View>

      <View style={styles.qrContainer}>
        <QRCodeDisplay value={ticket.ticket_code} size={qrSize} />
      </View>

      <View style={styles.codeContainer}>
        <Text style={styles.ticketCode}>{ticket.ticket_code}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.details}>
        <DetailRow label="Type" value={ticket.ticket_type_name} />
        {resolvedHolderName && <DetailRow label="Holder" value={resolvedHolderName} />}
        {ticket.ticket_type_price > 0 && (
          <DetailRow label="Price" value={formatPrice(ticket.ticket_type_price)} />
        )}
      </View>

      {actionSlot}

      {!actionSlot && isActive && (onTransfer || onRefund) && (
        <View style={styles.actionRow}>
          {onTransfer && (
            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText} onPress={onTransfer}>Transfer</Text>
            </View>
          )}
          {onRefund && (
            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText} onPress={onRefund}>Refund</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  containerInactive: {
    opacity: 0.6,
  },
  eventTitle: {
    color: colors.textPrimary,
    fontSize: typography.h3.size,
    fontWeight: typography.h3.weight,
    lineHeight: typography.h3.lineHeight,
    textAlign: 'center',
    paddingTop: spacing['2xl'],
    paddingHorizontal: spacing['2xl'],
  },
  eventMeta: {
    color: colors.textSecondary,
    fontSize: typography.body.size,
    lineHeight: typography.body.lineHeight,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing['2xl'],
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  qrContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  codeContainer: {
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
  ticketCode: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  separator: {
    marginHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderStyle: 'dashed',
  },
  details: {
    gap: spacing.sm,
    padding: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: typography.body.size,
    lineHeight: typography.body.lineHeight,
  },
  detailValue: {
    color: colors.textPrimary,
    fontSize: typography.body.size,
    fontWeight: '500',
    lineHeight: typography.body.lineHeight,
  },
  checkedInTime: {
    color: colors.textSecondary,
    fontSize: typography.caption.size,
    lineHeight: typography.caption.lineHeight,
  },
  transferInfo: {
    color: colors.textSecondary,
    fontSize: typography.caption.size,
    lineHeight: typography.caption.lineHeight,
  },
  actionRow: {
    flexDirection: 'row',
    padding: spacing.lg,
    paddingTop: spacing.xs,
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  actionButtonText: {
    color: colors.textPrimary,
    fontSize: typography.body.size,
    fontWeight: '500',
  },
});
