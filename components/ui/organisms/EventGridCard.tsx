import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../../../theme/tokens';
import { GradientIcon } from '../atoms/GradientIcon';
import type { Event } from '@414hustlerz/types';
import { format } from 'date-fns';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface EventGridCardProps {
  event: Event;
  onPress: () => void;
}

export function EventGridCard({ event, onPress }: EventGridCardProps) {
  const date = new Date(event.start_date);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: CARD_WIDTH,
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Image */}
      <View style={{ width: '100%', height: 120 }}>
        {event.image_url ? (
          <Image
            source={{ uri: event.image_url }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : (
          <View style={{ width: '100%', height: '100%', backgroundColor: colors.elevated, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 36 }}>🎉</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', colors.surface]}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40 }}
        />
      </View>

      {/* Content */}
      <View style={{ padding: 10, gap: 5 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600', lineHeight: 18 }} numberOfLines={2}>
          {event.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
          <GradientIcon name="calendar" size={11} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, lineHeight: 14 }} numberOfLines={1}>
            {format(date, 'EEE, MMM d · h:mm a')}
          </Text>
        </View>
        {event.venue_name && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <GradientIcon name="location" size={11} />
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, lineHeight: 14 }} numberOfLines={1}>
              {event.venue_name}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
