import { TouchableOpacity, View, Text } from 'react-native';
import { colors, radius } from '../../theme/tokens';
import { haptics } from '../utils/haptics';

interface QuickCategoryTileProps {
  emoji: string;
  label: string;
  onPress: () => void;
}

export function QuickCategoryTile({ emoji, label, onPress }: QuickCategoryTileProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        haptics.light();
        onPress();
      }}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: 14,
        paddingVertical: 10,
      }}
    >
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
      <Text style={{ color: colors.textPrimary, fontSize: 13, fontWeight: '600' }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
