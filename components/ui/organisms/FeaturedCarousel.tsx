import { useEffect, useMemo, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  scrollTo,
  runOnUI,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { EventCarouselCard } from './EventCarouselCard';
import type { Event } from '@414hustlerz/types';

const { width } = Dimensions.get('window');

const EDGE_PADDING = 16;
const GAP = 12;
const CARD_WIDTH = width - 100;
const CAROUSEL_PADDING = (width - CARD_WIDTH) / 2; // = 50
const ITEM_SIZE = CARD_WIDTH + GAP;

interface CarouselItemProps {
  event: Event;
  index: number;
  snapOffsets: number[];
  scrollX: SharedValue<number>;
  onPress: () => void;
  attendeeCount?: number;
  attendeeAvatars?: string[];
}

function CarouselItem({ event, index, snapOffsets, scrollX, onPress, attendeeCount, attendeeAvatars }: CarouselItemProps) {
  const animStyle = useAnimatedStyle(() => {
    // Use actual snap offsets as input range bounds so the animation tracks
    // the non-uniform positions of the first and last cards correctly
    const prev = index > 0 ? snapOffsets[index - 1] : snapOffsets[0] - ITEM_SIZE;
    const curr = snapOffsets[index];
    const next = index < snapOffsets.length - 1 ? snapOffsets[index + 1] : snapOffsets[snapOffsets.length - 1] + ITEM_SIZE;

    return {
      transform: [{
        scale: interpolate(scrollX.value, [prev, curr, next], [0.9, 1, 0.9], Extrapolation.CLAMP),
      }],
      opacity: interpolate(scrollX.value, [prev, curr, next], [0.6, 1, 0.6], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View style={[{ width: CARD_WIDTH, marginRight: GAP }, animStyle]}>
      <EventCarouselCard
        event={event}
        onPress={onPress}
        attendeeCount={attendeeCount}
        attendeeAvatars={attendeeAvatars}
      />
    </Animated.View>
  );
}

interface FeaturedCarouselProps {
  events: Event[];
  onEventPress: (event: Event) => void;
  autoScrollInterval?: number;
  attendeeCount?: number;
  attendeeAvatars?: string[];
}

export function FeaturedCarousel({
  events,
  onEventPress,
  autoScrollInterval = 5000,
  attendeeCount,
  attendeeAvatars,
}: FeaturedCarouselProps) {
  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollX = useSharedValue(0);
  const currentIndex = useRef(0);
  const n = events.length;

  const snapOffsets = useMemo(() => events.map((_, i) => {
    if (i === 0) return 0;
    if (i === n - 1) {
      return Math.max(0, 2 * EDGE_PADDING + (n - 1) * ITEM_SIZE + CARD_WIDTH - width);
    }
    return Math.max(0, EDGE_PADDING + i * ITEM_SIZE - CAROUSEL_PADDING);
  }), [n]);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  useEffect(() => {
    if (n <= 1) return;
    const timer = setInterval(() => {
      const next = (currentIndex.current + 1) % n;
      currentIndex.current = next;
      const offset = snapOffsets[next];
      runOnUI((x: number) => {
        scrollTo(aref, x, 0, true);
      })(offset);
    }, autoScrollInterval);
    return () => clearInterval(timer);
  }, [n, autoScrollInterval, snapOffsets]);

  if (!n) return null;

  return (
    <Animated.ScrollView
      ref={aref}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToOffsets={snapOffsets}
      decelerationRate="fast"
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingLeft: EDGE_PADDING }}
      onScroll={scrollHandler}
    >
      {events.map((event, index) => (
        <CarouselItem
          key={event.id}
          event={event}
          index={index}
          snapOffsets={snapOffsets}
          scrollX={scrollX}
          onPress={() => onEventPress(event)}
          attendeeCount={attendeeCount}
          attendeeAvatars={attendeeAvatars}
        />
      ))}
    </Animated.ScrollView>
  );
}
