import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Pill } from './Pill';

const meta: Meta<typeof Pill> = {
  title: 'Atoms/Pill',
  component: Pill,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, alignItems: 'flex-start', gap: 12 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'accent', 'success', 'error', 'warning', 'pending'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Playground: Story = {
  args: { label: 'General', variant: 'default', size: 'md' },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Pill label="Default" variant="default" />
      <Pill label="Primary" variant="primary" />
      <Pill label="Accent" variant="accent" />
      <Pill label="Success" variant="success" />
      <Pill label="Error" variant="error" />
      <Pill label="Warning" variant="warning" />
      <Pill label="Pending" variant="pending" />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Pill label="Small" size="sm" variant="primary" />
      <Pill label="Medium" size="md" variant="primary" />
    </View>
  ),
};

export const StatusLabels: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Pill label="Confirmed" variant="success" />
      <Pill label="Cancelled" variant="error" />
      <Pill label="Pending" variant="pending" />
      <Pill label="Free Entry" variant="accent" />
      <Pill label="VIP" variant="primary" />
      <Pill label="Sold Out" variant="warning" />
    </View>
  ),
};
