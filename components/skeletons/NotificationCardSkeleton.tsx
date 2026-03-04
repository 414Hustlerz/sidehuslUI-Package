import { View } from 'react-native';
import { Skeleton } from '../ui/atoms/Skeleton';
import { colors } from '../../theme/tokens';

export function NotificationCardSkeleton() {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Skeleton width={40} height={40} borderRadius={20} />
      <View style={{ flex: 1, marginLeft: 12, gap: 6 }}>
        <Skeleton width="80%" height={14} borderRadius={7} />
        <Skeleton width="60%" height={12} borderRadius={6} />
        <Skeleton width={50} height={10} borderRadius={5} />
      </View>
    </View>
  );
}
