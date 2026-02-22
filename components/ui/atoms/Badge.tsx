import { View, Text } from 'react-native';
import { colors } from '../../../theme/tokens';

interface BadgeProps {
  count?: number;
  dot?: boolean;
  color?: string;
  max?: number;
}

export function Badge({ count, dot = false, color = colors.status.error.text, max = 99 }: BadgeProps) {
  if (dot) {
    return (
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: color,
        }}
      />
    );
  }

  if (count === undefined || count === 0) return null;

  const label = count > max ? `${max}+` : String(count);

  return (
    <View
      style={{
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', lineHeight: 12 }}>
        {label}
      </Text>
    </View>
  );
}
