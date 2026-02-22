import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import type { StorePublic } from '@sidehusl/types';
import { StatusBadge } from '../ui/StatusBadge';
import { colors, radius } from '../../theme/tokens';

interface VendorCardProps {
  store: StorePublic;
  onPress: () => void;
  className?: string;
}

const statusToVariant: Record<string, 'success' | 'warning' | 'error' | 'completed'> = {
  open: 'success',
  ready: 'success',
  busy: 'warning',
  paused: 'error',
  closed: 'completed',
};

const statusLabel: Record<string, string> = {
  open: 'Open',
  ready: 'Ready',
  busy: 'Busy',
  paused: 'Paused',
  closed: 'Closed',
  setup: 'Setting Up',
};

export function VendorCard({ store, onPress, className = '' }: VendorCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {store.banner_url ? (
        <Image source={{ uri: store.banner_url }} style={{ width: '100%', height: 110 }} contentFit="cover" />
      ) : (
        <View style={{ width: '100%', height: 110, backgroundColor: colors.elevated, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 40 }}>🍽️</Text>
        </View>
      )}
      <View style={{ padding: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '600', flex: 1, marginRight: 8 }} numberOfLines={1}>
            {store.display_name}
          </Text>
          <StatusBadge
            label={statusLabel[store.status] || store.status}
            variant={statusToVariant[store.status] || 'completed'}
          />
        </View>
        {store.description && (
          <Text style={{ color: colors.textSecondary, fontSize: 12, lineHeight: 16, marginTop: 2 }} numberOfLines={2}>
            {store.description}
          </Text>
        )}
        {store.status_reason && (
          <Text style={{ color: colors.status.warning.text, fontSize: 12, lineHeight: 16, marginTop: 4 }}>
            {store.status_reason}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
