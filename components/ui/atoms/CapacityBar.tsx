import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../../theme/tokens';

interface CapacityBarProps {
  sold: number;
  total: number;
  showLabel?: boolean;
}

function getBarColor(percent: number): string {
  if (percent >= 100) return colors.textTertiary;
  if (percent > 90) return '#FF6B6B';
  if (percent >= 50) return '#FFD166';
  return '#06D6A0';
}

export function CapacityBar({ sold, total, showLabel = true }: CapacityBarProps) {
  const percent = total > 0 ? Math.min((sold / total) * 100, 100) : 0;
  const isSoldOut = sold >= total;
  const barColor = getBarColor(percent);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${percent}%`,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={[styles.label, isSoldOut && styles.soldOutLabel]}>
          {isSoldOut ? 'SOLD OUT' : `${sold} / ${total}`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  track: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.full,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.caption.size,
    lineHeight: typography.caption.lineHeight,
  },
  soldOutLabel: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});
