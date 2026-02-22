import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../atoms/Badge';
import { colors } from '../../../theme/tokens';

interface CartButtonProps {
  itemCount?: number;
  onPress?: () => void;
}

export function CartButton({ itemCount = 0, onPress }: CartButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ position: 'relative', width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
      activeOpacity={0.7}
    >
      <Ionicons name="bag" size={28} color={colors.textSecondary} />
      {itemCount > 0 && (
        <View style={{ position: 'absolute', top: 4, right: 4 }}>
          <Badge count={itemCount} color={colors.accent} />
        </View>
      )}
    </TouchableOpacity>
  );
}
