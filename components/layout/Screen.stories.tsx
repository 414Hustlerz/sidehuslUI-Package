import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text } from 'react-native';
import { Screen } from './Screen';

const meta: Meta<typeof Screen> = {
  title: 'Layout/Screen',
  component: Screen,
  argTypes: {
    withOrbs: { control: 'boolean' },
    scrollable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Screen>;

const Placeholder = () => (
  <View style={{ padding: 24, gap: 12 }}>
    <View style={{ height: 48, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12 }} />
    <View style={{ height: 160, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 16 }} />
    <View style={{ height: 80, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12 }} />
    <View style={{ height: 80, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12 }} />
    <Text style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 8 }}>
      Screen wrapper — bg + safe area
    </Text>
  </View>
);

export const Default: Story = {
  render: () => (
    <Screen>
      <Placeholder />
    </Screen>
  ),
};

export const WithOrbs: Story = {
  render: () => (
    <Screen withOrbs>
      <Placeholder />
    </Screen>
  ),
};

export const Scrollable: Story = {
  render: () => (
    <Screen scrollable withOrbs>
      <Placeholder />
      <Placeholder />
    </Screen>
  ),
};
