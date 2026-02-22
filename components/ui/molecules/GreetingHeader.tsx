import { View, Text } from 'react-native';
import { GradientText } from '../atoms/GradientText';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

interface GreetingHeaderProps {
  name?: string | null;
  subtitle?: string;
}

export function GreetingHeader({ name, subtitle }: GreetingHeaderProps) {
  const greeting = getGreeting();
  const displayName = name ? `, ${name}` : '';

  return (
    <View>
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
}
