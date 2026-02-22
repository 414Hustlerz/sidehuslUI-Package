import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Skeleton, SkeletonText, SkeletonCard } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    width: { control: 'text' },
    height: { control: { type: 'number' } },
    borderRadius: { control: { type: 'number' } },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  args: { width: '100%', height: 16, borderRadius: 8 },
};

export const Circle: Story = {
  args: { width: 48, height: 48, borderRadius: 24 },
};

export const TextBlock: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24 }}>
      <SkeletonText lines={4} />
    </View>
  ),
};

export const Card: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24 }}>
      <SkeletonCard height={200} />
    </View>
  ),
};

export const EventCardLoader: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      <SkeletonCard height={180} />
      <Skeleton width="70%" height={20} borderRadius={6} />
      <Skeleton width="40%" height={14} borderRadius={6} />
      <SkeletonText lines={2} />
    </View>
  ),
};
