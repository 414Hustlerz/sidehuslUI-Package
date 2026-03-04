import { Text, TouchableOpacity, View } from 'react-native';
import { colors, radius } from '../../theme/tokens';
import { haptics } from '../utils/haptics';
import { GradientIcon } from '../ui/atoms/GradientIcon';

interface CategoryCardProps {
  emoji: string;
  label: string;
  onPress: () => void;
}

export function CategoryCard({ emoji, label, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        haptics.light();
        onPress();
      }}
      activeOpacity={0.85}
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 13,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <Text style={{ fontSize: 24 }}>{emoji}</Text>
        <Text
          style={{
            flex: 1,
            color: colors.textPrimary,
            fontSize: 16,
            fontWeight: '600',
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
        <GradientIcon name="chevron-forward" size={16} />
      </View>
    </TouchableOpacity>
  );
}
