import { Modal, View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadows } from '../../theme/tokens';
import { GradientButton } from './organisms/GradientButton';
import { OutlinedButton } from './organisms/OutlinedButton';

type AlertVariant = 'success' | 'error' | 'info';

interface AlertAction {
  label: string;
  onPress: () => void;
  type?: 'gradient' | 'outlined';
}

interface ThemedAlertProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  variant?: AlertVariant;
  actions?: AlertAction[];
}

const variantConfig: Record<AlertVariant, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  success: { icon: 'checkmark-circle', color: colors.status.success.text },
  error: { icon: 'close-circle', color: colors.status.error.text },
  info: { icon: 'information-circle', color: colors.status.info.text },
};

export function ThemedAlert({
  visible,
  onClose,
  title,
  message,
  variant = 'info',
  actions,
}: ThemedAlertProps) {
  const { icon, color } = variantConfig[variant];
  const resolvedActions = actions ?? [{ label: 'OK', onPress: onClose, type: 'gradient' as const }];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onClose}>
        <BlurView
          intensity={20}
          tint="dark"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)' }}
        />

        {/* Dialog */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width: '85%',
            maxWidth: 340,
            backgroundColor: colors.surface,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 24,
            alignItems: 'center',
            gap: 16,
            ...shadows.lg,
          }}
        >
          {/* Icon */}
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: `${color}15`,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name={icon} size={32} color={color} />
          </View>

          {/* Title */}
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {title}
          </Text>

          {/* Message */}
          {message ? (
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                lineHeight: 20,
                textAlign: 'center',
              }}
            >
              {message}
            </Text>
          ) : null}

          {/* Actions */}
          <View style={{ width: '100%', gap: 8, marginTop: 4 }}>
            {resolvedActions.map((action, i) => {
              const Button = action.type === 'outlined' ? OutlinedButton : GradientButton;
              return (
                <Button key={i} onPress={action.onPress} size="sm" fullWidth>
                  {action.label}
                </Button>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
