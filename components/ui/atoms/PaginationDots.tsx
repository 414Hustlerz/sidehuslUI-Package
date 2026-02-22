import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useDerivedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../../../theme/tokens';
import type { SharedValue } from 'react-native-reanimated';

interface PaginationDotsProps {
  total: number;
  activeIndex: SharedValue<number>;
}

interface DotProps {
  index: number;
  activeIndex: SharedValue<number>;
}

function Dot({ index, activeIndex }: DotProps) {
  const isActive = useDerivedValue(() => Math.round(activeIndex.value) === index);

  const containerStyle = useAnimatedStyle(() => ({
    width: withSpring(isActive.value ? 18 : 6, { damping: 14, stiffness: 140 }),
  }));

  const gradientStyle = useAnimatedStyle(() => ({
    opacity: withSpring(isActive.value ? 1 : 0, { damping: 14, stiffness: 140 }),
  }));

  const inactiveStyle = useAnimatedStyle(() => ({
    opacity: withSpring(isActive.value ? 0 : 0.4, { damping: 14, stiffness: 140 }),
  }));

  return (
    <Animated.View style={[styles.dot, containerStyle]}>
      <Animated.View style={[StyleSheet.absoluteFill, gradientStyle]}>
        <LinearGradient
          colors={gradients.primary as unknown as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, styles.inactive, inactiveStyle]} />
    </Animated.View>
  );
}

export function PaginationDots({ total, activeIndex }: PaginationDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} index={i} activeIndex={activeIndex} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  inactive: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
