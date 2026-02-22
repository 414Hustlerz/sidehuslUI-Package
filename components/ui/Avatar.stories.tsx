import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    name: { control: 'text' },
    imageUrl: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  args: {
    name: 'Jordan Smith',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    imageUrl: 'https://api.dicebear.com/7.x/thumbs/png?seed=jordan',
    size: 'md',
  },
};

export const Initials: Story = {
  args: {
    name: 'Jordan Smith',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Avatar name="JS" size="xs" />
      <Avatar name="JS" size="sm" />
      <Avatar name="JS" size="md" />
      <Avatar name="JS" size="lg" />
      <Avatar name="JS" size="xl" />
    </View>
  ),
};

export const AllSizesWithImage: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Avatar imageUrl="https://api.dicebear.com/7.x/thumbs/png?seed=a" size="xs" />
      <Avatar imageUrl="https://api.dicebear.com/7.x/thumbs/png?seed=b" size="sm" />
      <Avatar imageUrl="https://api.dicebear.com/7.x/thumbs/png?seed=c" size="md" />
      <Avatar imageUrl="https://api.dicebear.com/7.x/thumbs/png?seed=d" size="lg" />
      <Avatar imageUrl="https://api.dicebear.com/7.x/thumbs/png?seed=e" size="xl" />
    </View>
  ),
};

export const NoName: Story = {
  args: { size: 'md' },
};
