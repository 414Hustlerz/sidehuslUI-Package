import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { InfoRow } from './InfoRow';
import { colors } from '../../../theme/tokens';

const meta: Meta<typeof InfoRow> = {
  title: 'Molecules/InfoRow',
  component: InfoRow,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', paddingHorizontal: 24 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    valueColor: { control: 'color' },
    last: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof InfoRow>;

export const Playground: Story = {
  args: { label: 'Ticket type', value: 'General Admission' },
};

export const WithValueColor: Story = {
  args: { label: 'Status', value: 'Confirmed', valueColor: colors.status.success.text },
};

export const Last: Story = {
  args: { label: 'Total', value: '£24.00', last: true },
};

export const OrderSummary: Story = {
  render: () => (
    <View style={{ backgroundColor: '#12121A', borderRadius: 16, paddingHorizontal: 16, marginTop: 16 }}>
      <InfoRow label="Event" value="Summer Vibes Festival" />
      <InfoRow label="Ticket type" value="General Admission" />
      <InfoRow label="Quantity" value="2x" />
      <InfoRow label="Subtotal" value="£40.00" />
      <InfoRow label="Service fee" value="£4.00" />
      <InfoRow label="Total" value="£44.00" valueColor={colors.accent} last />
    </View>
  ),
};

export const ProfileDetails: Story = {
  render: () => (
    <View style={{ backgroundColor: '#12121A', borderRadius: 16, paddingHorizontal: 16, marginTop: 16 }}>
      <InfoRow label="Member since" value="Jan 2024" />
      <InfoRow label="Events attended" value="12" />
      <InfoRow label="Favourite genre" value="Music" />
      <InfoRow label="Account status" value="Active" valueColor={colors.status.success.text} last />
    </View>
  ),
};
