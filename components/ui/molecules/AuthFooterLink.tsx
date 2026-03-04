import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '../atoms/Text';
import { GradientText } from '../atoms/GradientText';
import { spacing } from '../../../theme/tokens';

interface AuthFooterLinkProps {
  message: string;
  linkText: string;
  onPress: () => void;
}

export function AuthFooterLink({ message, linkText, onPress }: AuthFooterLinkProps) {
  return (
    <View style={styles.container}>
      <Text variant="body" color="secondary">
        {message}{' '}
      </Text>
      <Pressable onPress={onPress} hitSlop={8}>
        <GradientText style={styles.linkText}>
          {linkText}
        </GradientText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
