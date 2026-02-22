import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, alignItems: 'flex-start', gap: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    count: { control: { type: 'number' } },
    dot: { control: 'boolean' },
    max: { control: { type: 'number' } },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: { count: 5 },
};

export const Dot: Story = {
  args: { dot: true },
};

export const Overflow: Story = {
  args: { count: 128, max: 99 },
};

export const AllStates: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', gap: 20, alignItems: 'center' }}>
      <Badge dot />
      <Badge count={1} />
      <Badge count={9} />
      <Badge count={99} />
      <Badge count={100} max={99} />
    </View>
  ),
};

export const CustomColor: Story = {
  args: { count: 7, color: '#0066CC' },
};
