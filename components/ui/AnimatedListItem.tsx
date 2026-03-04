import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedListItemProps {
  index: number;
  children: ReactNode;
  delay?: number;
  maxDelay?: number;
}

export function AnimatedListItem({
  index,
  children,
  delay = 50,
  maxDelay = 300,
}: AnimatedListItemProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      Math.min(index * delay, maxDelay),
      withTiming(1, { duration: 300 }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 16 }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
