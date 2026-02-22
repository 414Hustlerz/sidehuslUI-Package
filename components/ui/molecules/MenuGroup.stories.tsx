import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { MenuGroup } from './MenuGroup';
import { MenuRow } from './MenuRow';

const meta: Meta<typeof MenuGroup> = {
  title: 'Molecules/MenuGroup',
  component: MenuGroup,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', paddingTop: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MenuGroup>;

export const WithTitle: Story = {
  render: () => (
    <MenuGroup title="Account">
      <MenuRow icon="person" label="Account Details" onPress={() => {}} />
      <MenuRow icon="wallet" label="Wallet" onPress={() => {}} />
      <MenuRow icon="card" label="Payment Methods" onPress={() => {}} />
    </MenuGroup>
  ),
};

export const NoTitle: Story = {
  render: () => (
    <MenuGroup>
      <MenuRow icon="settings" label="General Settings" onPress={() => {}} />
      <MenuRow icon="notifications" label="Notifications" onPress={() => {}} />
    </MenuGroup>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <MenuGroup>
      <MenuRow icon="log-out" label="Sign Out" destructive onPress={() => {}} />
    </MenuGroup>
  ),
};

export const MixedItems: Story = {
  render: () => (
    <MenuGroup title="Support">
      <MenuRow icon="help-circle" label="Help & FAQ" onPress={() => {}} />
      <MenuRow icon="flag" label="Report an Issue" description="Let us know about problems" onPress={() => {}} />
      <MenuRow icon="chatbubble" label="Contact Us" onPress={() => {}} />
      <MenuRow icon="log-out" label="Sign Out" destructive onPress={() => {}} />
    </MenuGroup>
  ),
};
