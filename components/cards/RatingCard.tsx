import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/atoms/Text';
import { StarRow } from '../ui/atoms/StarRow';
import { colors, spacing, radius } from '../../theme/tokens';

interface RatingCardProps {
  customerName: string;
  rating: number;
  comment?: string;
  date: string;
  storeName?: string;
}

export function RatingCard({ customerName, rating, comment, date, storeName }: RatingCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.customerInfo}>
          <View style={styles.avatarCircle}>
            <Text variant="caption" weight="bold">
              {customerName.charAt(0)}
            </Text>
          </View>
          <View>
            <Text variant="body" weight="semibold">{customerName}</Text>
            <Text variant="caption" color="tertiary">{date}</Text>
          </View>
        </View>
        <StarRow rating={rating} />
      </View>

      {comment ? (
        <Text variant="body" color="secondary" style={styles.comment}>
          &ldquo;{comment}&rdquo;
        </Text>
      ) : null}

      {storeName ? (
        <View style={styles.storeTag}>
          <Ionicons name="storefront-outline" size={12} color={colors.textTertiary} />
          <Text variant="caption" color="tertiary">{storeName}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,102,204,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comment: {
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
  storeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.04)',
  },
});
