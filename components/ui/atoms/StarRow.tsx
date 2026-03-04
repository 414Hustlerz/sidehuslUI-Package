import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StarRowProps {
  rating: number;
  size?: number;
  color?: string;
}

export function StarRow({ rating, size = 16, color = '#FFB800' }: StarRowProps) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? 'star' : star - 0.5 <= rating ? 'star-half' : 'star-outline'}
          size={size}
          color={star <= rating ? color : 'rgba(255,255,255,0.2)'}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 2,
  },
});
