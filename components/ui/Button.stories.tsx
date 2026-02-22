import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Get Tickets',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button variant="primary" onPress={() => {}}>Primary — Get Tickets</Button>
      <Button variant="secondary" onPress={() => {}}>Secondary</Button>
      <Button variant="outline" onPress={() => {}}>Outline</Button>
      <Button variant="ghost" onPress={() => {}}>Ghost</Button>
      <Button variant="danger" onPress={() => {}}>Danger — Cancel</Button>
    </View>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button variant="primary" size="sm" onPress={() => {}}>Small</Button>
      <Button variant="primary" size="md" onPress={() => {}}>Medium</Button>
      <Button variant="primary" size="lg" onPress={() => {}}>Large</Button>
    </View>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button variant="primary" fullWidth onPress={() => {}}>Join Event</Button>
      <Button variant="outline" fullWidth onPress={() => {}}>Save to Favourites</Button>
    </View>
  ),
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Loading...' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Sold Out' },
};
