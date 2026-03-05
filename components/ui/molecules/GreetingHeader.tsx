import { View, Text } from 'react-native';
import { GradientText } from '../atoms/GradientText';
import { Avatar } from '../Avatar';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

interface GreetingHeaderProps {
  name?: string | null;
  subtitle?: string;
  avatarUrl?: string | null;
}

export function GreetingHeader({ name, subtitle, avatarUrl }: GreetingHeaderProps) {
  const greeting = getGreeting();
  const displayName = name ? `, ${name}` : '';

  const textBlock = (
    <View style={{ flex: 1 }}>
      <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', lineHeight: 30 }}>
        {greeting}{displayName} 👋
      </Text>
      {subtitle && (
        <GradientText style={{ fontSize: 15, lineHeight: 22, fontWeight: '500', marginTop: 2 }}>
          {subtitle}
        </GradientText>
      )}
    </View>
  );

  // When avatarUrl is explicitly passed (even null), show avatar + text row
  if (avatarUrl !== undefined) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
        <Avatar imageUrl={avatarUrl} name={name} size="md" />
        {textBlock}
      </View>
    );
  }

  // Backwards compatible: text-only when avatarUrl prop omitted
  return textBlock;
}
