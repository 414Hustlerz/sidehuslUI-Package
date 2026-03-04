import { RefreshControl } from 'react-native';
import { colors } from '../../theme/tokens';

interface ThemedRefreshControlProps {
  refreshing: boolean;
  onRefresh: () => void;
}

export function ThemedRefreshControl({ refreshing, onRefresh }: ThemedRefreshControlProps) {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={colors.primary}
      progressBackgroundColor={colors.surface}
      colors={[colors.primary, colors.accent]}
    />
  );
}
