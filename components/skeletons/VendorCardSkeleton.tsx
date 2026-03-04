import { View } from 'react-native';
import { Skeleton } from '../ui/atoms/Skeleton';
import { colors, radius } from '../../theme/tokens';

export function VendorCardSkeleton() {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Skeleton width="100%" height={110} borderRadius={0} />
      <View style={{ padding: 12, gap: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Skeleton width="55%" height={14} borderRadius={7} />
          <Skeleton width={50} height={20} borderRadius={8} />
        </View>
        <Skeleton width="80%" height={12} borderRadius={6} />
      </View>
    </View>
  );
}
