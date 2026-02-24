import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { OrderStatus } from '@414hustlerz/types';
import { getOrderStatusLabel, ORDER_TIMELINE_STEPS } from '../utils';
import { colors, typography } from '../../theme/tokens';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  style?: object;
}

export function OrderTimeline({ currentStatus, style }: OrderTimelineProps) {
  const currentIdx = ORDER_TIMELINE_STEPS.indexOf(currentStatus);
  const isCancelled = currentStatus === 'cancelled';

  return (
    <View style={style}>
      {ORDER_TIMELINE_STEPS.map((step, idx) => {
        const isCompleted = !isCancelled && idx <= currentIdx;
        const isCurrent = !isCancelled && idx === currentIdx;
        const isLast = idx === ORDER_TIMELINE_STEPS.length - 1;

        return (
          <View key={step} style={styles.stepRow}>
            <View style={styles.stepIndicatorCol}>
              <View
                style={[
                  styles.dot,
                  isCompleted
                    ? isCurrent
                      ? styles.dotCurrent
                      : styles.dotCompleted
                    : styles.dotPending,
                ]}
              >
                {isCompleted && !isCurrent ? (
                  <Ionicons name="checkmark" size={16} color={colors.status.success.text} />
                ) : isCurrent ? (
                  <View style={styles.dotInnerCurrent} />
                ) : (
                  <View style={styles.dotInnerPending} />
                )}
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.connector,
                    {
                      backgroundColor:
                        isCompleted && idx < currentIdx
                          ? colors.status.success.border
                          : colors.border,
                    },
                  ]}
                />
              )}
            </View>
            <View style={styles.stepContent}>
              <Text
                style={[
                  styles.stepLabel,
                  isCurrent
                    ? styles.stepLabelCurrent
                    : isCompleted
                      ? styles.stepLabelCompleted
                      : styles.stepLabelPending,
                ]}
              >
                {getOrderStatusLabel(step)}
              </Text>
            </View>
          </View>
        );
      })}

      {isCancelled && (
        <View style={[styles.stepRow, { marginTop: 8 }]}>
          <View style={[styles.dot, styles.dotCancelled]}>
            <Ionicons name="close" size={16} color={colors.status.error.text} />
          </View>
          <Text style={[styles.stepLabel, { fontWeight: '600', color: colors.status.error.text, marginLeft: 12 }]}>
            Cancelled
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
  },
  stepIndicatorCol: {
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCurrent: {
    backgroundColor: colors.primary,
  },
  dotCompleted: {
    backgroundColor: colors.status.success.bg,
    borderWidth: 1,
    borderColor: colors.status.success.border,
  },
  dotPending: {
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dotCancelled: {
    backgroundColor: colors.status.error.bg,
    borderWidth: 1,
    borderColor: colors.status.error.border,
  },
  dotInnerCurrent: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  dotInnerPending: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textTertiary,
  },
  connector: {
    width: 2,
    height: 32,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 16,
  },
  stepLabel: {
    fontSize: typography.body.size,
    lineHeight: typography.body.lineHeight,
  },
  stepLabelCurrent: {
    fontWeight: '600',
    color: colors.primary,
  },
  stepLabelCompleted: {
    color: colors.textPrimary,
  },
  stepLabelPending: {
    color: colors.textTertiary,
  },
});
