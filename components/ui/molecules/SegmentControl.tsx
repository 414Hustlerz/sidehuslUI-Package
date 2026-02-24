import { View, Text, TouchableOpacity, LayoutChangeEvent, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { colors, radius, gradients } from '../../../theme/tokens';

interface SegmentControlProps {
  segments: string[];
  selected: number;
  onSelect: (index: number) => void;
}

const SPRING_CONFIG = { damping: 16, stiffness: 140, mass: 0.8 };

export function SegmentControl({ segments, selected, onSelect }: SegmentControlProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const activeIndex = useSharedValue(selected);

  const segmentWidth = containerWidth > 0 ? (containerWidth - 8) / segments.length : 0;

  // Keep shared value in sync with prop
  activeIndex.value = withSpring(selected, SPRING_CONFIG);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const w = e.nativeEvent.layout.width;
      setContainerWidth(w);
    },
    [],
  );

  const indicatorStyle = useAnimatedStyle(() => {
    if (segmentWidth <= 0) return { opacity: 0 };
    return {
      opacity: 1,
      transform: [{ translateX: activeIndex.value * segmentWidth }],
    };
  });

  return (
    <View
      onLayout={onLayout}
      style={styles.container}
    >
      {/* Animated gradient indicator — same pattern as PaginationDots */}
      {segmentWidth > 0 && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 4,
              left: 4,
              width: segmentWidth,
              height: '100%',
              borderRadius: 6,
              overflow: 'hidden',
            },
            indicatorStyle,
          ]}
        >
          <LinearGradient
            colors={gradients.primary as unknown as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { opacity: 0.15 }]}
          />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.elevated }]} />
          <LinearGradient
            colors={gradients.primary as unknown as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { opacity: 0.12 }]}
          />
        </Animated.View>
      )}

      {segments.map((label, index) => {
        return (
          <SegmentLabel
            key={label}
            label={label}
            index={index}
            activeIndex={activeIndex}
            onPress={() => onSelect(index)}
          />
        );
      })}
    </View>
  );
}

interface SegmentLabelProps {
  label: string;
  index: number;
  activeIndex: SharedValue<number>;
  onPress: () => void;
}

function SegmentLabel({ label, index, activeIndex, onPress }: SegmentLabelProps) {
  const isActive = useDerivedValue(() => Math.round(activeIndex.value) === index);

  const textStyle = useAnimatedStyle(() => ({
    opacity: withSpring(isActive.value ? 1 : 0.45, SPRING_CONFIG),
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.segment}
      activeOpacity={0.7}
    >
      <Animated.Text
        style={[
          styles.label,
          textStyle,
          { fontWeight: isActive.value ? '600' : '400' },
        ]}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    zIndex: 1,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 14,
  },
});
