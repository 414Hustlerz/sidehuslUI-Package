import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { Divider } from '../atoms/Divider';
import { colors, spacing, radius } from '../../../theme/tokens';

interface FAQAccordionProps {
  question: string;
  answer: string;
  category?: string;
  defaultOpen?: boolean;
}

export function FAQAccordion({ question, answer, category, defaultOpen = false }: FAQAccordionProps) {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <Pressable
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.header}>
        {category ? (
          <View style={styles.categoryBadge}>
            <Text variant="caption" color="primary">{category}</Text>
          </View>
        ) : null}
        <View style={{ flex: 1 }}>
          <Text variant="body" weight="semibold">{question}</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.textSecondary}
        />
      </View>
      {expanded && (
        <View style={styles.answer}>
          <Divider spacing="sm" />
          <Text variant="body" color="secondary" style={{ lineHeight: 22 }}>
            {answer}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(0,102,204,0.1)',
  },
  answer: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
});
