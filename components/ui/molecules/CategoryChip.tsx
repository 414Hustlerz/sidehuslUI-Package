import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientText } from '../atoms/GradientText';
import { colors, gradients } from '../../../theme/tokens';

interface CategoryChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  emoji?: string;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function CategoryChip({ label, selected = false, onPress, emoji }: CategoryChipProps) {
  return (
    <LinearGradient
      colors={selected ? gradients.primary as unknown as [string, string] : [colors.border, colors.border]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderRadius: 9999,
        padding: 1,
        marginRight: 8,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 13,
          paddingVertical: 6,
          borderRadius: 9999,
          overflow: 'hidden',
        }}
        activeOpacity={0.7}
      >
        {/* Layered fill matching SegmentControl indicator */}
        <View style={StyleSheet.absoluteFill}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: selected ? colors.elevated : colors.surface }]} />
          {selected && (
            <LinearGradient
              colors={gradients.primary as unknown as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[StyleSheet.absoluteFill, { opacity: 0.15 }]}
            />
          )}
        </View>
        {emoji && (
          <Text style={{ fontSize: 14, marginRight: 5 }}>{emoji}</Text>
        )}
        {selected ? (
          <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600', lineHeight: 17 }}>
            {capitalize(label)}
          </Text>
        ) : (
          <GradientText style={{ fontSize: 13, fontWeight: '400', lineHeight: 17 }}>
            {capitalize(label)}
          </GradientText>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}
