import { View } from 'react-native';
import { Skeleton } from '../ui/atoms/Skeleton';
import { colors, radius } from '../../theme/tokens';

export function EventListCardSkeleton() {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Skeleton width={90} height={90} borderRadius={0} />
      <View style={{ flex: 1, padding: 12, justifyContent: 'center', gap: 8 }}>
        <Skeleton width="85%" height={14} borderRadius={7} />
        <Skeleton width="60%" height={12} borderRadius={6} />
        <Skeleton width="45%" height={12} borderRadius={6} />
      </View>
    </View>
  );
}
