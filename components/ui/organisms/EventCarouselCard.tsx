import { TouchableOpacity, View, Text } from 'react-native';
import { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../../../theme/tokens';
import { GradientIcon } from '../atoms/GradientIcon';
import { AttendeeAvatarStack } from '../molecules/AttendeeAvatarStack';
import { PaginationDots } from '../atoms/PaginationDots';
import type { Event } from '@414hustlerz/types';
import { format } from 'date-fns';

interface EventCarouselCardProps {
  event: Event;
  onPress: () => void;
  attendeeCount?: number;
  attendeeAvatars?: string[];
  /** Pass in a carousel-driven SharedValue to show animated dots over the image */
  activeIndex?: SharedValue<number>;
  /** Number of items in the carousel — omit to hide dots */
  total?: number;
}

export function EventCarouselCard({ event, onPress, attendeeCount, attendeeAvatars = [], activeIndex, total }: EventCarouselCardProps) {
  const fallbackIndex = useSharedValue(0);
  const resolvedIndex = activeIndex ?? fallbackIndex;
  const date = new Date(event.start_date);
  const [isFavourited, setIsFavourited] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      style={{
        borderRadius: radius.xl,
        overflow: 'hidden',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Image with fade */}
      <View style={{ height: 160 }}>
        {event.image_url ? (
          <Image
            source={{ uri: event.image_url }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : (
          <View style={{ width: '100%', height: '100%', backgroundColor: colors.elevated, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 40 }}>🎉</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', colors.surface]}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60 }}
        />
        {/* Favourite button */}
        <TouchableOpacity
          onPress={(e) => { e.stopPropagation(); setIsFavourited((v) => !v); }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: 'rgba(10,10,15,0.55)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GradientIcon name={isFavourited ? 'heart' : 'heart-outline'} size={17} />
        </TouchableOpacity>

        {/* Pagination dots — overlaid at bottom of image, right above title */}
        {total !== undefined && (
          <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, alignItems: 'center' }}>
            <PaginationDots total={total} activeIndex={resolvedIndex} />
          </View>
        )}
      </View>

      {/* Content */}
      <View style={{ paddingHorizontal: 14, paddingBottom: 14, paddingTop: 8 }}>
        {/* Title */}
        <Text
          style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700', lineHeight: 22, marginBottom: 6 }}
          numberOfLines={2}
        >
          {event.title}
        </Text>

        {/* Date */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 5 }}>
          <GradientIcon name="calendar" size={13} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, lineHeight: 16, flex: 1 }} numberOfLines={1}>
            {format(date, 'EEE, MMM d · h:mm a')}
          </Text>
        </View>

        {/* Location */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
          <GradientIcon name="location" size={13} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, lineHeight: 16, flex: 1 }} numberOfLines={1}>
            {event.venue_name ?? 'Venue TBA'}
          </Text>
        </View>

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 10 }} />

        {/* Attendees + Share */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {attendeeCount !== undefined && attendeeCount > 0 ? (
            <AttendeeAvatarStack avatars={attendeeAvatars} count={attendeeCount} size={22} overlap={8} />
          ) : (
            <View />
          )}
          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={(e) => e.stopPropagation()}>
            <GradientIcon name="share-social" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
