import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import type { MenuItem } from '@414hustlerz/types';
import { formatCurrency } from '../utils';
import { colors, radius } from '../../theme/tokens';

interface MenuItemCardProps {
  item: MenuItem;
  onPress: () => void;
  quantity?: number;
  className?: string;
}

export function MenuItemCard({ item, onPress, quantity = 0, className = '' }: MenuItemCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!item.is_available}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: item.is_available ? 1 : 0.5,
      }}
    >
      <View style={{ flex: 1, marginRight: 12, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '600', lineHeight: 20 }}>
            {item.name}
          </Text>
          {item.description && (
            <Text style={{ color: colors.textSecondary, fontSize: 12, lineHeight: 16, marginTop: 3 }} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '700' }}>
            {formatCurrency(item.price)}
          </Text>
          {!item.is_available && (
            <Text style={{ color: colors.status.error.text, fontSize: 12, marginLeft: 8 }}>Unavailable</Text>
          )}
        </View>
      </View>

      <View style={{ position: 'relative' }}>
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={{ width: 80, height: 80, borderRadius: radius.sm }} contentFit="cover" />
        ) : (
          <View style={{ width: 80, height: 80, borderRadius: radius.sm, backgroundColor: colors.elevated, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 28 }}>🍽️</Text>
          </View>
        )}
        {quantity > 0 && (
          <View
            style={{
              position: 'absolute',
              top: -6,
              right: -6,
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.textInverse, fontSize: 11, fontWeight: '700' }}>{quantity}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
