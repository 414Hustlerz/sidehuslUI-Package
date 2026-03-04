import { ScrollView, View, Dimensions } from 'react-native';
import { EventGridCard } from './EventGridCard';
import type { Event } from '@414hustlerz/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COLUMN_WIDTH = Math.round((SCREEN_WIDTH - 48) / 2);

interface HorizontalEventScrollProps {
  events: Event[];
  onEventPress: (event: Event) => void;
}

export function HorizontalEventScroll({ events, onEventPress }: HorizontalEventScrollProps) {
  // Chunk events into pairs for 2-row columns
  const pairs: [Event, Event | undefined][] = [];
  for (let i = 0; i < events.length; i += 2) {
    pairs.push([events[i], events[i + 1]]);
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
    >
      {pairs.map(([top, bottom]) => (
        <View key={top.id} style={{ width: COLUMN_WIDTH, gap: 10 }}>
          <EventGridCard
            event={top}
            onPress={() => onEventPress(top)}
            compact
          />
          {bottom ? (
            <EventGridCard
              event={bottom}
              onPress={() => onEventPress(bottom)}
              compact
            />
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </View>
      ))}
    </ScrollView>
  );
}
