import { View, Text } from 'react-native';
import { Children, type ReactNode } from 'react';
import { colors, radius } from '../../../theme/tokens';

interface MenuGroupProps {
  title?: string;
  children: ReactNode;
}

export function MenuGroup({ title, children }: MenuGroupProps) {
  const childArray = Children.toArray(children);

  return (
    <View style={{ marginBottom: 20 }}>
      {title ? (
        <Text
          style={{
            color: colors.textTertiary,
            fontSize: 11,
            fontWeight: '600',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            paddingHorizontal: 16,
            marginBottom: 8,
          }}
        >
          {title}
        </Text>
      ) : null}

      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
        }}
      >
        {childArray.map((child, idx) => (
          <View key={idx}>
            {child}
            {idx < childArray.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.border,
                  marginLeft: 60,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
