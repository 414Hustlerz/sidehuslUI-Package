import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { getInitials } from '../utils';
import { colors } from '../../theme/tokens';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  imageUrl?: string | null;
  name?: string | null;
  size?: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, { px: number; fontSize: number; lineHeight: number }> = {
  xs: { px: 24, fontSize: 10, lineHeight: 12 },
  sm: { px: 32, fontSize: 12, lineHeight: 16 },
  md: { px: 40, fontSize: 15, lineHeight: 20 },
  lg: { px: 56, fontSize: 20, lineHeight: 24 },
  xl: { px: 80, fontSize: 28, lineHeight: 34 },
};

export function Avatar({ imageUrl, name, size = 'md', className = '' }: AvatarProps) {
  const s = sizeMap[size];

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={{ width: s.px, height: s.px, borderRadius: s.px / 2 }}
        contentFit="cover"
      />
    );
  }

  return (
    <View
      style={{
        width: s.px,
        height: s.px,
        borderRadius: s.px / 2,
        backgroundColor: 'rgba(0, 102, 204, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(0, 102, 204, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: colors.primary,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          fontWeight: '600',
        }}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}
