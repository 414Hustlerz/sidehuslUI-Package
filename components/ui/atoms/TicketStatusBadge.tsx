import { View, Text } from 'react-native';
import type { TicketStatus } from '@414hustlerz/types';

type TicketBadgeStatus = TicketStatus | 'checked_in' | 'transfer_pending';

interface TicketStatusBadgeProps {
  status: TicketBadgeStatus;
}

const config: Record<TicketBadgeStatus, { label: string; bg: string; text: string; border: string }> = {
  active: { label: 'Active', bg: '#00261A', text: '#06D6A0', border: '#006644' },
  transferred: { label: 'Transferred', bg: '#0A1A2A', text: '#64B5F6', border: '#1A3A5A' },
  refunded: { label: 'Refunded', bg: '#2A1F00', text: '#FFD166', border: '#7A5A00' },
  cancelled: { label: 'Cancelled', bg: '#2A0A0A', text: '#FF6B6B', border: '#7A1A1A' },
  checked_in: { label: 'Checked In', bg: '#1A0A2A', text: '#CE93D8', border: '#4A1A6A' },
  transfer_pending: { label: 'Transfer Pending', bg: '#2A2A00', text: '#FFE082', border: '#6A6A00' },
};

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const c = config[status];

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 9999,
        borderWidth: 1,
        backgroundColor: c.bg,
        borderColor: c.border,
      }}
    >
      <Text style={{ color: c.text, fontSize: 12, fontWeight: '600', lineHeight: 16 }}>
        {c.label}
      </Text>
    </View>
  );
}
