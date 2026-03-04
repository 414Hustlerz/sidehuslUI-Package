import { type ReactNode } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radius } from '../../../theme/tokens';
import { haptics } from '../../utils/haptics';
import { GradientIcon } from '../atoms/GradientIcon';
import { PaginationDots } from '../atoms/PaginationDots';

import { CATEGORY_EMOJI_MAP } from '../../utils/categories';
import type { Event } from '@414hustlerz/types';
import { format } from 'date-fns';

const CARD_HEIGHT = 320;

interface HeroEventCardProps {
  event: Event;
  onPress?: () => void;
  attendeeCount?: number;
  attendeeAvatars?: string[];
  activeIndex?: SharedValue<number>;
  total?: number;
  borderRadius?: number;
  interactive?: boolean;
  /** When provided, replaces the default date + venue sub-info line */
  subInfoContent?: ReactNode;
}

export function HeroEventCard({ event, onPress, attendeeCount, attendeeAvatars = [], activeIndex, total = 4, borderRadius = radius.xl, interactive = true, subInfoContent }: HeroEventCardProps) {
  const fallbackIndex = useSharedValue(0);
  const resolvedIndex = activeIndex ?? fallbackIndex;
  const date = new Date(event.start_date);

  const containerStyle = {
    width: '100%' as const,
    height: CARD_HEIGHT,
    borderRadius,
    overflow: 'hidden' as const,
  };

  const content = (
    <>
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
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingBottom: 12, paddingTop: 64 }}
      >
        {/* Category chip + attendee pill — matched ghost style */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          {event.category ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, paddingVertical: 6, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }}>
              {CATEGORY_EMOJI_MAP[event.category] && <Text style={{ fontSize: 14, marginRight: 5 }}>{CATEGORY_EMOJI_MAP[event.category]}</Text>}
              <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600' }}>{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</Text>
            </View>
          ) : (
            <View />
          )}
          {attendeeCount !== undefined && attendeeCount > 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }}>
              <View style={{ flexDirection: 'row', marginRight: 6 }}>
                {(attendeeAvatars.length > 0 ? attendeeAvatars : ['https://api.dicebear.com/7.x/thumbs/png?seed=alice', 'https://api.dicebear.com/7.x/thumbs/png?seed=bob', 'https://api.dicebear.com/7.x/thumbs/png?seed=carol']).slice(0, 3).map((uri, i) => (
                  <View key={i} style={{ marginLeft: i === 0 ? 0 : -6, zIndex: 3 - i, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.3)', borderRadius: 9 }}>
                    <Image source={{ uri }} style={{ width: 18, height: 18, borderRadius: 9 }} contentFit="cover" />
                  </View>
                ))}
              </View>
              <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600' }}>
                {attendeeCount.toLocaleString()} attending
              </Text>
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
          style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '700', lineHeight: 30, marginBottom: 8 }}
          numberOfLines={2}
        >
          {event.title}
        </Text>

        {/* Sub-info line */}
        {subInfoContent ?? (
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
        )}
      </LinearGradient>
    </>
  );

  if (!interactive) {
    return <View style={containerStyle}>{content}</View>;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        haptics.light();
        onPress?.();
      }}
      activeOpacity={0.9}
      style={containerStyle}
    >
      {content}
    </TouchableOpacity>
  );
}
