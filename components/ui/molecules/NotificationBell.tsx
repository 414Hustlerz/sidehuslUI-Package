import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../atoms/Badge';
import { colors } from '../../../theme/tokens';

interface NotificationBellProps {
  unreadCount?: number;
  onPress?: () => void;
}

export function NotificationBell({ unreadCount = 0, onPress }: NotificationBellProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ position: 'relative', width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
      activeOpacity={0.7}
    >
      <Ionicons name="notifications" size={28} color={colors.textSecondary} />
      {unreadCount > 0 && (
        <View style={{ position: 'absolute', top: 4, right: 4 }}>
          <Badge count={unreadCount} color={colors.status.error.text} />
        </View>
      )}
    </TouchableOpacity>
  );
}
