import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text } from 'react-native';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    spacing: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
    vertical: { control: 'boolean' },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
  args: { spacing: 'md' },
};

export const Spacings: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24 }}>
      <Text style={{ color: '#666', fontSize: 11, marginBottom: 4 }}>spacing="none"</Text>
      <Divider spacing="none" />
      <Text style={{ color: '#666', fontSize: 11, marginBottom: 4 }}>spacing="sm"</Text>
      <Divider spacing="sm" />
      <Text style={{ color: '#666', fontSize: 11, marginBottom: 4 }}>spacing="md"</Text>
      <Divider spacing="md" />
      <Text style={{ color: '#666', fontSize: 11, marginBottom: 4 }}>spacing="lg"</Text>
      <Divider spacing="lg" />
    </View>
  ),
};

export const Vertical: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', height: 80, alignItems: 'center' }}>
      <Text style={{ color: '#FFFFFF' }}>Left</Text>
      <Divider vertical spacing="md" />
      <Text style={{ color: '#FFFFFF' }}>Right</Text>
    </View>
  ),
};

export const CustomColor: Story = {
  args: { color: '#0066CC', spacing: 'md' },
};
