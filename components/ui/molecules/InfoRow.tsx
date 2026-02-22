import { View, Text } from 'react-native';
import { colors } from '../../../theme/tokens';

interface InfoRowProps {
  label: string;
  value: string;
  valueColor?: string;
  last?: boolean;
}

export function InfoRow({ label, value, valueColor, last = false }: InfoRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>{label}</Text>
      <Text
        style={{
          color: valueColor ?? colors.textPrimary,
          fontSize: 14,
          fontWeight: '500',
          lineHeight: 20,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
