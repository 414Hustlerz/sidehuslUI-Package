import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients } from '../../../theme/tokens';
import { formatCurrency } from '../../utils';

interface CartSummaryBarProps {
  itemCount: number;
  total: number;
  onCheckout: () => void;
  storeName?: string;
}

export function CartSummaryBar({ itemCount, total, onCheckout, storeName }: CartSummaryBarProps) {
  const insets = useSafeAreaInsets();

  if (itemCount === 0) return null;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: insets.bottom + 8,
        paddingTop: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      <TouchableOpacity onPress={onCheckout} activeOpacity={0.9} style={{ borderRadius: 12, overflow: 'hidden' }}>
        <LinearGradient
          colors={gradients.primary as unknown as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>{itemCount}</Text>
            </View>
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '600' }}>
              {storeName ? `Order from ${storeName}` : 'View Cart'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
              {formatCurrency(total)}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.8)" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
