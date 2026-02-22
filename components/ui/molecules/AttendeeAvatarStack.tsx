import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../../../theme/tokens';

interface AttendeeAvatarStackProps {
  avatars?: string[];
  count: number;
  size?: number;
  overlap?: number;
}

export function AttendeeAvatarStack({
  avatars = [],
  count,
  size = 28,
  overlap = 10,
}: AttendeeAvatarStackProps) {
  const visible = avatars.slice(0, 3);
  const remaining = count - visible.length;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        {visible.map((uri, i) => (
          <View
            key={i}
            style={{
              marginLeft: i === 0 ? 0 : -overlap,
              zIndex: visible.length - i,
              borderWidth: 2,
              borderColor: colors.surface,
              borderRadius: size / 2,
            }}
          >
            <Image
              source={{ uri }}
              style={{ width: size, height: size, borderRadius: size / 2 }}
              contentFit="cover"
            />
          </View>
        ))}
      </View>
      <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginLeft: 8, lineHeight: 16 }}>
        {count.toLocaleString()} attending
      </Text>
    </View>
  );
}
