import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text } from 'react-native';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'UI/StatusBadge',
  component: StatusBadge,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['warning', 'success', 'error', 'pending', 'completed', 'info'] },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Playground: Story = {
  args: {
    label: 'Pending',
    variant: 'pending',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {([
        { variant: 'pending' as const, label: 'Pending' },
        { variant: 'success' as const, label: 'Confirmed' },
        { variant: 'warning' as const, label: 'Needs Attention' },
        { variant: 'error' as const, label: 'Cancelled' },
        { variant: 'completed' as const, label: 'Completed' },
        { variant: 'info' as const, label: 'Processing' },
      ]).map(({ variant, label }) => (
        <View key={variant} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <StatusBadge label={label} variant={variant} />
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{variant}</Text>
        </View>
      ))}
    </View>
  ),
};

export const OrderStatuses: Story = {
  render: () => (
    <View style={{ gap: 10 }}>
      <StatusBadge label="Payment Pending" variant="pending" />
      <StatusBadge label="Confirmed" variant="success" />
      <StatusBadge label="Preparing" variant="info" />
      <StatusBadge label="Ready for Pickup" variant="warning" />
      <StatusBadge label="Picked Up" variant="completed" />
      <StatusBadge label="Cancelled" variant="error" />
    </View>
  ),
};

export const EventStatuses: Story = {
  render: () => (
    <View style={{ gap: 10 }}>
      <StatusBadge label="Upcoming" variant="info" />
      <StatusBadge label="Live Now" variant="success" />
      <StatusBadge label="Sold Out" variant="error" />
      <StatusBadge label="Almost Full" variant="warning" />
      <StatusBadge label="Ended" variant="completed" />
    </View>
  ),
};
