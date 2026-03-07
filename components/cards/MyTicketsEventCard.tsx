import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import type { MyTicketsEvent } from '@414hustlerz/types';
import { GradientIcon } from '../ui/atoms/GradientIcon';
import { formatShortDate } from '../utils';
import { colors, radius, spacing, typography } from '../../theme/tokens';

interface MyTicketsEventCardProps {
  data: MyTicketsEvent;
  onPress: () => void;
  isPast?: boolean;
}

export function MyTicketsEventCard({ data, onPress, isPast = false }: MyTicketsEventCardProps) {
  const { event, tickets } = data;
  const ticketCount = tickets.length;
  const ticketTypes = [...new Set(tickets.map((t) => t.ticket_type_name))];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.container, isPast && styles.containerPast]}
    >
      {event.image_url && (
        <Image
          source={{ uri: event.image_url }}
          style={styles.image}
          contentFit="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={[styles.title, isPast && styles.textMuted]} numberOfLines={1}>
          {event.title}
        </Text>
        <View style={styles.metaRow}>
          <GradientIcon name="calendar" size={14} />
          <Text style={styles.meta}>
            {formatShortDate(event.start_date)}
            {event.venue_name ? ` \u00B7 ${event.venue_name}` : ''}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <GradientIcon name="ticket" size={14} />
          <Text style={styles.ticketInfo}>
            {ticketCount} ticket{ticketCount !== 1 ? 's' : ''}
            {ticketTypes.length === 1 ? ` \u00B7 ${ticketTypes[0]}` : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  containerPast: {
    opacity: 0.6,
  },
  image: {
    width: '100%',
    height: 100,
  },
  content: {
    padding: 14,
    gap: 6,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  textMuted: {
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  ticketInfo: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
