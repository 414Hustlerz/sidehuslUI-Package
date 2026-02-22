import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { OutlinedButton } from './OutlinedButton';

const meta: Meta<typeof OutlinedButton> = {
  title: 'Organisms/OutlinedButton',
  component: OutlinedButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    children: { control: 'text' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    color: { control: { type: 'select' }, options: ['primary', 'accent', 'error'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof OutlinedButton>;

export const Playground: Story = {
  args: { children: 'View Details', size: 'md', color: 'primary', fullWidth: true },
};

export const Colors: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      <OutlinedButton color="primary">Primary Outline</OutlinedButton>
      <OutlinedButton color="accent">Accent Outline</OutlinedButton>
      <OutlinedButton color="error">Delete Account</OutlinedButton>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      <OutlinedButton size="sm">Small</OutlinedButton>
      <OutlinedButton size="md">Medium</OutlinedButton>
      <OutlinedButton size="lg">Large</OutlinedButton>
    </View>
  ),
};

export const Loading: Story = {
  args: { children: 'Saving...', loading: true },
};

export const Disabled: Story = {
  args: { children: 'Unavailable', disabled: true },
};

export const PairedWithGradient: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      {/* Typical CTA pattern — primary action + secondary */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <OutlinedButton size="md">Save for Later</OutlinedButton>
        </View>
        <View style={{ flex: 1 }}>
          <OutlinedButton size="md" color="error">Cancel</OutlinedButton>
        </View>
      </View>
    </View>
  ),
};
