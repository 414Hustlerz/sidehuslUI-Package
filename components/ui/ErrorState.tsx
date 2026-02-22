import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/tokens';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  message = 'Something went wrong',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 48, paddingHorizontal: 32 }}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: colors.status.error.bg,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <Ionicons name="alert-circle-outline" size={36} color={colors.status.error.text} />
      </View>
      <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 8 }}>
        Something went wrong
      </Text>
      <Text style={{ color: colors.textSecondary, fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 20 }}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={{
            borderWidth: 1,
            borderColor: colors.status.error.border,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: colors.status.error.text, fontSize: 15, fontWeight: '600' }}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
