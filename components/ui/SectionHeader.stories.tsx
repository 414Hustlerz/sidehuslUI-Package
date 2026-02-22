import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { SectionHeader } from './SectionHeader';

const meta: Meta<typeof SectionHeader> = {
  title: 'UI/SectionHeader',
  component: SectionHeader,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    actionLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Playground: Story = {
  args: {
    title: 'Featured Events',
    actionLabel: 'See all',
  },
};

export const TitleOnly: Story = {
  args: { title: 'My Events' },
};

export const WithAction: Story = {
  args: { title: 'Popular Events', actionLabel: 'See all', onAction: () => {} },
};

export const LongTitle: Story = {
  args: { title: 'Happening This Weekend', actionLabel: 'See all', onAction: () => {} },
};

export const WithEmoji: Story = {
  args: { emoji: '🔥', title: 'Popular Events', actionLabel: 'See all', onAction: () => {} },
};

export const WithEmojiNoAction: Story = {
  args: { emoji: '🎟️', title: 'My Events' },
};

export const WithIcon: Story = {
  args: { icon: 'flame', title: 'Popular Events', actionLabel: 'See all', onAction: () => {} },
};

export const WithIconNoAction: Story = {
  args: { icon: 'calendar', title: 'Upcoming' },
};
