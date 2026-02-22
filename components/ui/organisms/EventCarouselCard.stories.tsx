import type { Meta, StoryObj } from '@storybook/react-native';
import { useEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useDerivedValue,
  useAnimatedRef,
  scrollTo,
} from 'react-native-reanimated';
import { EventCarouselCard } from './EventCarouselCard';
import { mockEvents } from '../../__mocks__';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 80;

const meta: Meta<typeof EventCarouselCard> = {
  title: 'Organisms/EventCarouselCard',
  component: EventCarouselCard,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', paddingVertical: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EventCarouselCard>;

const MOCK_AVATARS = [
  'https://api.dicebear.com/7.x/thumbs/png?seed=alice',
  'https://api.dicebear.com/7.x/thumbs/png?seed=bob',
  'https://api.dicebear.com/7.x/thumbs/png?seed=carol',
];

export const Single: Story = {
  render: () => (
    <View style={{ paddingHorizontal: 16 }}>
      <EventCarouselCard event={mockEvents[0]} onPress={() => {}} attendeeCount={1240} attendeeAvatars={MOCK_AVATARS} />
    </View>
  ),
};

export const NoAttendees: Story = {
  render: () => (
    <View style={{ paddingHorizontal: 16 }}>
      <EventCarouselCard event={mockEvents[0]} onPress={() => {}} />
    </View>
  ),
};

export const NoImage: Story = {
  render: () => (
    <View style={{ paddingHorizontal: 16 }}>
      <EventCarouselCard event={{ ...mockEvents[0], image_url: null }} onPress={() => {}} />
    </View>
  ),
};

export const NoVenue: Story = {
  render: () => (
    <View style={{ paddingHorizontal: 16 }}>
      <EventCarouselCard event={{ ...mockEvents[0], venue_name: null }} onPress={() => {}} />
    </View>
  ),
};

/**
 * Full-width auto-scrolling carousel — 1 image per second, loops 4 events.
 * Dots are overlaid inside each card at the bottom of the image, right above the title.
 */
const EVENTS = mockEvents.slice(0, 4);
const ITEM_SIZE = width; // full-width snap

function CarouselWithDotsDemo() {
  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollX = useSharedValue(0);
  const currentIndex = useRef(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => { scrollX.value = e.contentOffset.x; },
  });

  // Raw fractional index — dots animate in real-time as you drag
  const activeIndex = useDerivedValue(() => scrollX.value / ITEM_SIZE);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentIndex.current + 1) % EVENTS.length;
      currentIndex.current = next;
      scrollTo(aref, next * ITEM_SIZE, 0, true);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Animated.ScrollView
      ref={aref}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_SIZE}
      decelerationRate="fast"
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      {EVENTS.map((event) => (
        <View key={event.id} style={{ width: ITEM_SIZE, paddingHorizontal: 16 }}>
          <EventCarouselCard
            event={event}
            onPress={() => {}}
            total={EVENTS.length}
            activeIndex={activeIndex}
          />
        </View>
      ))}
    </Animated.ScrollView>
  );
}

export const CarouselWithDots: Story = {
  render: () => <CarouselWithDotsDemo />,
};
