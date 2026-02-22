import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text } from 'react-native';
import { GradientIcon } from './GradientIcon';

const meta: Meta = {
  title: 'Atoms/GradientIcon',
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <GradientIcon name="heart" size={24} />,
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <GradientIcon name="star" size={16} />
      <GradientIcon name="star" size={20} />
      <GradientIcon name="star" size={24} />
      <GradientIcon name="star" size={32} />
      <GradientIcon name="star" size={40} />
    </View>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {[
        { name: 'calendar' as const, label: 'Calendar' },
        { name: 'location' as const, label: 'Location' },
        { name: 'heart' as const, label: 'Heart' },
        { name: 'star' as const, label: 'Star' },
        { name: 'ticket' as const, label: 'Ticket' },
        { name: 'cart' as const, label: 'Cart' },
        { name: 'person' as const, label: 'Person' },
        { name: 'notifications' as const, label: 'Notifications' },
        { name: 'search' as const, label: 'Search' },
        { name: 'time' as const, label: 'Time' },
      ].map(({ name, label }) => (
        <View key={name} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <GradientIcon name={name} size={24} />
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{label}</Text>
        </View>
      ))}
    </View>
  ),
};

export const LargeShowcase: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
      <GradientIcon name="flame" size={48} />
      <GradientIcon name="musical-notes" size={48} />
      <GradientIcon name="trophy" size={48} />
      <GradientIcon name="rocket" size={48} />
      <GradientIcon name="sparkles" size={48} />
      <GradientIcon name="diamond" size={48} />
    </View>
  ),
};
