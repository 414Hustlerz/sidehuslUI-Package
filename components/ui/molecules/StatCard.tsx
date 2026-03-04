import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { colors, spacing, radius } from '../../../theme/tokens';

interface StatCardProps {
  icon: string;
  iconColor: string;
  label: string;
  value: string | number;
  trend?: { direction: 'up' | 'down'; value: string };
  onPress?: () => void;
}

export function StatCard({ icon, iconColor, label, value, trend, onPress }: StatCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress} disabled={!onPress}>
      <View style={styles.header}>
        <View style={[styles.iconBg, { backgroundColor: iconColor + '18' }]}>
          <Ionicons name={icon as any} size={22} color={iconColor} />
        </View>
        {trend && (
          <View
            style={[
              styles.trendBadge,
              {
                backgroundColor:
                  trend.direction === 'up'
                    ? colors.status.success.bg
                    : colors.status.error.bg,
              },
            ]}
          >
            <Ionicons
              name={trend.direction === 'up' ? 'trending-up' : 'trending-down'}
              size={12}
              color={
                trend.direction === 'up'
                  ? colors.status.success.text
                  : colors.status.error.text
              }
            />
            <Text
              variant="caption"
              style={{
                color:
                  trend.direction === 'up'
                    ? colors.status.success.text
                    : colors.status.error.text,
                fontSize: 10,
                fontWeight: '600',
              }}
            >
              {trend.value}
            </Text>
          </View>
        )}
      </View>
      <Text variant="h2" weight="bold">{value}</Text>
      <Text variant="caption" color="secondary">{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
});
