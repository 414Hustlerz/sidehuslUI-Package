import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { OrganiserProfile, Event } from '@414hustlerz/types';
import { Avatar } from '../ui/Avatar';
import { GradientIcon } from '../ui/atoms/GradientIcon';
import { colors, radius, gradients } from '../../theme/tokens';
import { format } from 'date-fns';

interface OrganiserCardProps {
  organiser: OrganiserProfile;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onPress: () => void;
  upcomingEvents?: Event[];
}

const POSTER_SIZE = 88;

export function OrganiserCard({
  organiser,
  isFollowing,
  onToggleFollow,
  onPress,
  upcomingEvents = [],
}: OrganiserCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
      }}
    >
      {/* Top section — avatar, info, follow indicator */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 }}>
        <Avatar size="lg" name={organiser.full_name} imageUrl={organiser.avatar_url} />

        <View style={{ flex: 1, gap: 3 }}>
          <Text
            style={{ color: colors.textPrimary, fontSize: 16, fontWeight: '700', lineHeight: 20 }}
            numberOfLines={1}
          >
            {organiser.full_name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <GradientIcon name="calendar" size={12} />
              <Text style={{ color: colors.textSecondary, fontSize: 12, lineHeight: 16 }}>
                {organiser.event_count} events
              </Text>
            </View>
            {organiser.location && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <GradientIcon name="location" size={12} />
                <Text
                  style={{ color: colors.textSecondary, fontSize: 12, lineHeight: 16 }}
                  numberOfLines={1}
                >
                  {organiser.location}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Follow toggle — small circle icon */}
        <TouchableOpacity
          onPress={onToggleFollow}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {isFollowing ? (
            <LinearGradient
              colors={gradients.primary as unknown as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </LinearGradient>
          ) : (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 1.5,
                borderColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="add" size={18} color={colors.textTertiary} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Event posters — horizontal scroll of upcoming events */}
      {upcomingEvents.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 14,
            paddingBottom: 14,
            gap: 8,
          }}
        >
          {upcomingEvents.slice(0, 5).map((event) => (
            <EventPoster key={event.id} event={event} />
          ))}
        </ScrollView>
      )}
    </TouchableOpacity>
  );
}

function EventPoster({ event }: { event: Event }) {
  const date = new Date(event.start_date);

  return (
    <View
      style={{
        width: POSTER_SIZE,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: colors.elevated,
      }}
    >
      {event.image_url ? (
        <Image
          source={{ uri: event.image_url }}
          style={{ width: POSTER_SIZE, height: POSTER_SIZE }}
          contentFit="cover"
        />
      ) : (
        <View
          style={{
            width: POSTER_SIZE,
            height: POSTER_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 28 }}>🎉</Text>
        </View>
      )}
      {/* Date overlay at bottom */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.75)']}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 36,
          justifyContent: 'flex-end',
          paddingHorizontal: 6,
          paddingBottom: 4,
        }}
      >
        <Text
          style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '600', lineHeight: 13 }}
          numberOfLines={1}
        >
          {format(date, 'MMM d')}
        </Text>
      </LinearGradient>
    </View>
  );
}
