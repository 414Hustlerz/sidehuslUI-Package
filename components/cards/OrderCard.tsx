import { View, Text, TouchableOpacity } from 'react-native';
import type { Order } from '@414hustlerz/types';
import { StatusBadge } from '../ui/StatusBadge';
import { getOrderStatusLabel, formatCurrency, formatRelative } from '../utils';
import { colors, radius } from '../../theme/tokens';

interface OrderCardProps {
  order: Order;
  storeName?: string;
  onPress: () => void;
  className?: string;
}

const statusToVariant: Record<string, 'warning' | 'success' | 'error' | 'pending' | 'completed' | 'info'> = {
  pending: 'pending',
  confirmed: 'info',
  preparing: 'warning',
  ready: 'success',
  collected: 'completed',
  cancelled: 'error',
};

export function OrderCard({ order, storeName, onPress, className = '' }: OrderCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '600', lineHeight: 20 }}>
          #{order.order_number}
        </Text>
        <StatusBadge
          label={getOrderStatusLabel(order.status)}
          variant={statusToVariant[order.status]}
        />
      </View>
      {storeName && (
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20, marginBottom: 4 }}>{storeName}</Text>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        <Text style={{ color: colors.textTertiary, fontSize: 13, lineHeight: 18 }}>
          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
        </Text>
        <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '700' }}>
          {formatCurrency(order.total_amount)}
        </Text>
      </View>
      <Text style={{ color: colors.textTertiary, fontSize: 12, lineHeight: 16, marginTop: 6 }}>
        {formatRelative(order.created_at)}
      </Text>
    </TouchableOpacity>
  );
}
