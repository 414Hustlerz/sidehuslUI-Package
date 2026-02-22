import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { GradientButton } from './GradientButton';

const meta: Meta<typeof GradientButton> = {
  title: 'Organisms/GradientButton',
  component: GradientButton,
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
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof GradientButton>;

export const Playground: Story = {
  args: { children: 'Get Tickets', size: 'md', fullWidth: true },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      <GradientButton size="sm">Small Button</GradientButton>
      <GradientButton size="md">Medium Button</GradientButton>
      <GradientButton size="lg">Large Button</GradientButton>
    </View>
  ),
};

export const Loading: Story = {
  args: { children: 'Processing...', loading: true },
};

export const Disabled: Story = {
  args: { children: 'Sold Out', disabled: true },
};

export const Inline: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', gap: 12 }}>
      <GradientButton size="sm" fullWidth={false}>Buy Now</GradientButton>
      <GradientButton size="sm" fullWidth={false}>Add to Cart</GradientButton>
    </View>
  ),
};

export const CTAStack: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      <GradientButton size="lg">Get Tickets — £24.00</GradientButton>
      <GradientButton size="md">Reserve My Spot</GradientButton>
    </View>
  ),
};
