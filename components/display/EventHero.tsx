import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { EventWithOrganiser } from '@sidehusl/types';
import { formatDate } from '../utils';
import { getCategoryLabel } from '../utils';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../../theme/tokens';

interface EventHeroProps {
  event: EventWithOrganiser;
  style?: object;
}

export function EventHero({ event, style }: EventHeroProps) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: event.image_url || undefined }}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {getCategoryLabel(event.category)}
          </Text>
        </View>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color="white" />
          <Text style={styles.infoText}>
            {formatDate(event.start_date)}
          </Text>
        </View>
        <View style={[styles.infoRow, { marginTop: 4 }]}>
          <Ionicons name="location-outline" size={14} color="white" />
          <Text style={styles.infoText}>{event.venue_name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 256,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    marginBottom: 8,
  },
  categoryText: {
    color: 'white',
    fontSize: typography.caption.size,
    fontWeight: '500',
  },
  title: {
    color: 'white',
    fontSize: typography.h1.size,
    fontWeight: typography.h1.weight,
    lineHeight: typography.h1.lineHeight,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: typography.body.size,
    marginLeft: 4,
  },
});
