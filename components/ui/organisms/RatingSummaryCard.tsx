import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { StarRow } from '../atoms/StarRow';
import { colors, spacing, radius } from '../../../theme/tokens';

interface RatingSummaryCardProps {
  averageRating: number;
  totalCount: number;
  distribution: { stars: number; count: number }[];
}

export function RatingSummaryCard({ averageRating, totalCount, distribution }: RatingSummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text variant="h1" weight="bold">{averageRating.toFixed(1)}</Text>
        <StarRow rating={Math.round(averageRating)} />
        <Text variant="caption" color="tertiary">
          {totalCount} {totalCount === 1 ? 'rating' : 'ratings'}
        </Text>
      </View>
      <View style={styles.right}>
        {distribution
          .sort((a, b) => b.stars - a.stars)
          .map((item) => {
            const pct = totalCount > 0 ? (item.count / totalCount) * 100 : 0;
            return (
              <View key={item.stars} style={styles.distRow}>
                <Text variant="caption" color="tertiary" style={styles.distLabel}>
                  {item.stars}
                </Text>
                <Ionicons name="star" size={10} color="#FFB800" />
                <View style={styles.distBarBg}>
                  <View style={[styles.distBarFill, { width: `${pct}%` }]} />
                </View>
                <Text variant="caption" color="tertiary" style={styles.distCount}>
                  {item.count}
                </Text>
              </View>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: spacing.xl,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.06)',
    gap: spacing.xs,
    width: 100,
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: spacing.lg,
    gap: spacing.xs,
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  distLabel: {
    width: 12,
    textAlign: 'right',
  },
  distBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  distBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFB800',
  },
  distCount: {
    width: 16,
    textAlign: 'right',
  },
});
