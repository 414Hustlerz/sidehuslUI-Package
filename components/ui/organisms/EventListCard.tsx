import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { colors, radius } from '../../../theme/tokens';
import { GradientIcon } from '../atoms/GradientIcon';
import type { Event } from '@414hustlerz/types';
import { format } from 'date-fns';

interface EventListCardProps {
  event: Event;
  onPress: () => void;
}

export function EventListCard({ event, onPress }: EventListCardProps) {
  const date = new Date(event.start_date);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {event.image_url ? (
        <Image
          source={{ uri: event.image_url }}
          style={{ width: 90, height: 90 }}
          contentFit="cover"
        />
      ) : (
        <View style={{ width: 90, height: 90, backgroundColor: colors.elevated, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 32 }}>🎉</Text>
        </View>
      )}
      <View style={{ flex: 1, padding: 12, justifyContent: 'center', gap: 6 }}>
        <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '600', lineHeight: 20 }} numberOfLines={2}>
          {event.title}
        </Text>
        <View style={{ gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <GradientIcon name="calendar" size={13} />
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, lineHeight: 16 }}>
              {format(date, 'EEE, MMM d · h:mm a')}
            </Text>
          </View>
          {event.venue_name && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <GradientIcon name="location" size={13} />
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, lineHeight: 16 }} numberOfLines={1}>
                {event.venue_name}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
