import { View, Text } from 'react-native';
import { GradientText } from '../atoms/GradientText';
import { colors } from '../../../theme/tokens';
import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

interface IconInfoRowProps {
  icon?: ComponentProps<typeof Ionicons>['name'];
  label: string;
  value?: string;
}

export function IconInfoRow({ label, value }: IconInfoRowProps) {
  return (
    <View style={{ flex: 1 }}>
      <GradientText style={{ fontSize: 13, lineHeight: 18, fontWeight: '600' }}>
        {label}
      </GradientText>
      {value && (
        <Text style={{ color: colors.textPrimary, fontSize: 15, lineHeight: 22, fontWeight: '500', marginTop: 2 }}>
          {value}
        </Text>
      )}
    </View>
  );
}
