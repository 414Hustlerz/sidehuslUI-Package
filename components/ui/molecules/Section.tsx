import { View, StyleSheet } from 'react-native';
import { Text } from '../atoms/Text';
import { spacing } from '../../../theme/tokens';
import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  /** Optional right-side element (button, link, badge, etc.) */
  right?: ReactNode;
  children: ReactNode;
}

export function Section({ title, right, children }: SectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="body" weight="bold">{title}</Text>
        {right}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
});
