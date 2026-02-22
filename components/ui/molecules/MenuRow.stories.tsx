import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text } from 'react-native';
import { MenuRow } from './MenuRow';
import { colors } from '../../../theme/tokens';

const meta: Meta<typeof MenuRow> = {
  title: 'Molecules/MenuRow',
  component: MenuRow,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 16 }}>
        <View style={{ backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden' }}>
          <Story />
        </View>
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MenuRow>;

export const Default: Story = {
  render: () => (
    <MenuRow icon="person" label="Account Details" onPress={() => {}} />
  ),
};

export const WithDescription: Story = {
  render: () => (
    <MenuRow
      icon="wallet"
      label="Wallet"
      description="View your balance and transactions"
      onPress={() => {}}
    />
  ),
};

export const Destructive: Story = {
  render: () => (
    <MenuRow icon="log-out" label="Sign Out" destructive onPress={() => {}} />
  ),
};

export const NoChevron: Story = {
  render: () => (
    <MenuRow icon="shield" label="Security" showChevron={false} onPress={() => {}} />
  ),
};

export const CustomRight: Story = {
  render: () => (
    <MenuRow
      icon="notifications"
      label="Notifications"
      onPress={() => {}}
      rightElement={
        <View style={{ backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 }}>
          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>3</Text>
        </View>
      }
    />
  ),
};
