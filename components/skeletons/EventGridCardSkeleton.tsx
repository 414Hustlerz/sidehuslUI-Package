import { View, Dimensions } from 'react-native';
import { Skeleton } from '../ui/atoms/Skeleton';
import { colors, radius } from '../../theme/tokens';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export function EventGridCardSkeleton() {
  return (
    <View
      style={{
        width: CARD_WIDTH,
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Skeleton width="100%" height={120} borderRadius={0} />
      <View style={{ padding: 10, gap: 6 }}>
        <Skeleton width="90%" height={13} borderRadius={6} />
        <Skeleton width="70%" height={11} borderRadius={5} />
        <Skeleton width="55%" height={11} borderRadius={5} />
      </View>
    </View>
  );
}
