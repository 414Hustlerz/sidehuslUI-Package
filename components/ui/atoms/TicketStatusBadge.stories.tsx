import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { TicketStatusBadge } from './TicketStatusBadge';

const meta: Meta<typeof TicketStatusBadge> = {
  title: 'Atoms/TicketStatusBadge',
  component: TicketStatusBadge,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, alignItems: 'flex-start', gap: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['active', 'transferred', 'refunded', 'cancelled', 'checked_in', 'transfer_pending'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TicketStatusBadge>;

export const Playground: Story = {
  args: { status: 'active' },
};

export const Active: Story = {
  args: { status: 'active' },
};

export const Transferred: Story = {
  args: { status: 'transferred' },
};

export const Refunded: Story = {
  args: { status: 'refunded' },
};

export const Cancelled: Story = {
  args: { status: 'cancelled' },
};

export const CheckedIn: Story = {
  args: { status: 'checked_in' },
};

export const TransferPending: Story = {
  args: { status: 'transfer_pending' },
};

export const AllStatuses: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12, alignItems: 'flex-start' }}>
      <TicketStatusBadge status="active" />
      <TicketStatusBadge status="transferred" />
      <TicketStatusBadge status="refunded" />
      <TicketStatusBadge status="cancelled" />
      <TicketStatusBadge status="checked_in" />
      <TicketStatusBadge status="transfer_pending" />
    </View>
  ),
};
