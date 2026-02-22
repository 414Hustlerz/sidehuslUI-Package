import { TouchableOpacity, View, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radius } from '../../../theme/tokens';
import { CategoryChip } from '../molecules/CategoryChip';
import { AttendeeAvatarStack } from '../molecules/AttendeeAvatarStack';
import { GradientIcon } from '../atoms/GradientIcon';
import { PaginationDots } from '../atoms/PaginationDots';

const CATEGORY_EMOJIS: Record<string, string> = {
  food: '🍔',
  music: '🎵',
  tech: '💻',
  arts: '🎨',
  sports: '⚽',
  comedy: '😂',
  wellness: '🧘',
  film: '🎬',
  fashion: '👗',
  business: '💼',
};
import type { Event } from '@414hustlerz/types';
import { format } from 'date-fns';

const CARD_HEIGHT = 320;

interface HeroEventCardProps {
  event: Event;
  onPress: () => void;
  attendeeCount?: number;
  attendeeAvatars?: string[];
  activeIndex?: SharedValue<number>;
  total?: number;
}

export function HeroEventCard({ event, onPress, attendeeCount, attendeeAvatars = [], activeIndex, total = 4 }: HeroEventCardProps) {
  const fallbackIndex = useSharedValue(0);
  const resolvedIndex = activeIndex ?? fallbackIndex;
  const date = new Date(event.start_date);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        width: '100%',
        height: CARD_HEIGHT,
        borderRadius: radius.xl,
        overflow: 'hidden',
      }}
    >
      {/* Hero image */}
      {event.image_url ? (
        <Image
          source={{ uri: event.image_url }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
      ) : (
        <View style={{ width: '100%', height: '100%', backgroundColor: colors.elevated, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 64 }}>🎉</Text>
        </View>
      )}

      {/* Bottom gradient overlay */}
      <LinearGradient
        colors={gradients.hero as unknown as [string, string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingBottom: 16, paddingTop: 64 }}
      >
        {/* Category chip + attendee stack — same row, same height */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 42, marginBottom: 6 }}>
          {event.category ? (
            <CategoryChip
              label={event.category}
              emoji={CATEGORY_EMOJIS[event.category]}
            />
          ) : (
            <View />
          )}
          {attendeeCount !== undefined && attendeeCount > 0 && (
            <View style={{ height: 42, justifyContent: 'center' }}>
              <AttendeeAvatarStack
                avatars={attendeeAvatars}
                count={attendeeCount}
                size={26}
                overlap={9}
              />
            </View>
          )}
        </View>

        {/* Pagination dots — only shown when there are multiple items */}
        {total > 1 && (
          <View style={{ alignItems: 'center', marginBottom: 12 }}>
            <PaginationDots total={total} activeIndex={resolvedIndex} />
          </View>
        )}

        {/* Title */}
        <Text
          style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '700', lineHeight: 30, marginBottom: 10 }}
          numberOfLines={2}
        >
          {event.title}
        </Text>

        {/* Date + venue */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <GradientIcon name="calendar" size={13} />
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 18 }}>
              {format(date, 'EEE, MMM d')}
            </Text>
          </View>
          {event.venue_name && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 }}>
              <GradientIcon name="location" size={13} />
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 18 }} numberOfLines={1}>
                {event.venue_name}
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
