import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme/tokens';

interface StickyFooterProps {
  children: React.ReactNode;
}

/**
 * Fixed footer pinned to the bottom of the screen, outside the scroll area.
 * Use for primary CTAs (save, submit, invite, publish).
 *
 * ```tsx
 * <Screen edges={['top']}>
 *   <ScrollView>...</ScrollView>
 *   <StickyFooter>
 *     <GradientButton fullWidth>Save</GradientButton>
 *   </StickyFooter>
 * </Screen>
 * ```
 */
export function StickyFooter({ children }: StickyFooterProps) {
  return <View style={styles.footer}>{children}</View>;
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing['3xl'],
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    gap: spacing.sm,
  },
});
