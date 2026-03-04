import { View, Switch, StyleSheet } from 'react-native';
import { Text } from '../atoms/Text';
import { colors, spacing } from '../../../theme/tokens';

interface ToggleRowProps {
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  description?: string;
}

export function ToggleRow({ label, value, onToggle, description }: ToggleRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.labelWrap}>
        <Text variant="body" style={{ flex: 1 }}>{label}</Text>
        {description ? (
          <Text variant="caption" color="tertiary">{description}</Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: 'rgba(255,255,255,0.1)', true: `${colors.accent}60` }}
        thumbColor={value ? colors.accent : '#ccc'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  labelWrap: {
    flex: 1,
    gap: 2,
  },
});
