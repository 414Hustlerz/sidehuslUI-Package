import { View } from 'react-native';
import { Skeleton } from '../ui/atoms/Skeleton';
import { colors, radius } from '../../theme/tokens';

export function OrderCardSkeleton() {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Skeleton width={100} height={14} borderRadius={7} />
        <Skeleton width={70} height={22} borderRadius={8} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Skeleton width={60} height={12} borderRadius={6} />
        <Skeleton width={50} height={14} borderRadius={7} />
      </View>
      <Skeleton width={80} height={11} borderRadius={5} />
    </View>
  );
}
