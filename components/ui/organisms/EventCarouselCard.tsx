import { TouchableOpacity, View, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../../../theme/tokens';
import { haptics } from '../../utils/haptics';
import { GradientIcon } from '../atoms/GradientIcon';
import { PaginationDots } from '../atoms/PaginationDots';
import type { Event } from '@414hustlerz/types';
import { format } from 'date-fns';

interface EventCarouselCardProps {
  event: Event;
  onPress: () => void;
  /** Pass in a carousel-driven SharedValue to show animated dots over the image */
  activeIndex?: SharedValue<number>;
  /** Number of items in the carousel — omit to hide dots */
  total?: number;
  /** Controlled save/bookmark state */
  isSaved?: boolean;
  /** Callback when bookmark button is pressed */
  onToggleSave?: () => void;
  /** Callback when share button is pressed */
  onShare?: () => void;
}

export function EventCarouselCard({ event, onPress, activeIndex, total, isSaved, onToggleSave, onShare }: EventCarouselCardProps) {
  const fallbackIndex = useSharedValue(0);
  const resolvedIndex = activeIndex ?? fallbackIndex;
  const date = new Date(event.start_date);

  return (
    <TouchableOpacity
      onPress={() => {
        haptics.light();
        onPress();
      }}
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
        {/* Save/bookmark button */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onToggleSave?.();
          }}
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
          <GradientIcon name={isSaved ? 'bookmark' : 'bookmark-outline'} size={17} />
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

        {/* Price + Share */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <GradientIcon name="pricetag" size={14} />
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' }}>
              {event.is_free ? 'Free' : event.ticket_price ? `From R${parseFloat(event.ticket_price).toFixed(0)}` : 'Price TBA'}
            </Text>
          </View>
          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={(e) => { e.stopPropagation(); onShare?.(); }}>
            <GradientIcon name="share-social" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
