import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../../../theme/tokens';
import { GradientIcon } from '../atoms/GradientIcon';
import type { Event } from '@414hustlerz/types';
import { format } from 'date-fns';

interface EventGridCardProps {
  event: Event;
  onPress: () => void;
  compact?: boolean;
}

export function EventGridCard({ event, onPress, compact = false }: EventGridCardProps) {
  const date = new Date(event.start_date);

  const s = compact
    ? { imageH: 96, pad: 8, gap: 4, titleSize: 12, titleLH: 16, metaSize: 10, metaLH: 13, fadeH: 32, emojiSize: 28, iconSize: 10 }
    : { imageH: 120, pad: 10, gap: 5, titleSize: 13, titleLH: 18, metaSize: 11, metaLH: 14, fadeH: 40, emojiSize: 36, iconSize: 11 };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        flex: 1,
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Image */}
      <View style={{ width: '100%', height: s.imageH }}>
        {event.image_url ? (
          <Image
            source={{ uri: event.image_url }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : (
          <View style={{ width: '100%', height: '100%', backgroundColor: colors.elevated, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: s.emojiSize }}>🎉</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', colors.surface]}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: s.fadeH }}
        />
      </View>

      {/* Content */}
      <View style={{ padding: s.pad, gap: s.gap }}>
        <Text style={{ color: '#FFFFFF', fontSize: s.titleSize, fontWeight: '600', lineHeight: s.titleLH }} numberOfLines={2}>
          {event.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
          <GradientIcon name="calendar" size={s.iconSize} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: s.metaSize, lineHeight: s.metaLH }} numberOfLines={1}>
            {format(date, 'EEE, MMM d · h:mm a')}
          </Text>
        </View>
        {event.venue_name && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <GradientIcon name="location" size={s.iconSize} />
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: s.metaSize, lineHeight: s.metaLH }} numberOfLines={1}>
              {event.venue_name}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
