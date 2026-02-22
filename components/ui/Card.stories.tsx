import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text } from 'react-native';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: { control: 'select', options: ['surface', 'elevated'] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Surface: Story = {
  render: () => (
    <Card>
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
          Surface Card
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
          Default card with surface background.
        </Text>
      </View>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
          Elevated Card
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
          Slightly lighter background for layered content.
        </Text>
      </View>
    </Card>
  ),
};

export const Pressable: Story = {
  render: () => (
    <Card onPress={() => {}} variant="surface">
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
          Pressable Card
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
          Tap me — I have an onPress handler.
        </Text>
      </View>
    </Card>
  ),
};

export const Stacked: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Card>
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '600' }}>Card One</Text>
        </View>
      </Card>
      <Card variant="elevated">
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '600' }}>Card Two (elevated)</Text>
        </View>
      </Card>
      <Card onPress={() => {}}>
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '600' }}>Card Three (pressable)</Text>
        </View>
      </Card>
    </View>
  ),
};
