import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { AttendeeAvatarStack } from './AttendeeAvatarStack';

// Stable placeholder avatars (via DiceBear — deterministic, no auth required)
const AVATARS = [
  'https://api.dicebear.com/7.x/thumbs/png?seed=alice',
  'https://api.dicebear.com/7.x/thumbs/png?seed=bob',
  'https://api.dicebear.com/7.x/thumbs/png?seed=carol',
];

const meta: Meta<typeof AttendeeAvatarStack> = {
  title: 'Molecules/AttendeeAvatarStack',
  component: AttendeeAvatarStack,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, gap: 24, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    count: { control: { type: 'number' } },
    size: { control: { type: 'number' } },
    overlap: { control: { type: 'number' } },
  },
};

export default meta;
type Story = StoryObj<typeof AttendeeAvatarStack>;

export const Playground: Story = {
  args: { avatars: AVATARS, count: 248, size: 28, overlap: 10 },
};

export const NoAvatars: Story = {
  args: { avatars: [], count: 1204 },
};

export const OneAvatar: Story = {
  args: { avatars: AVATARS.slice(0, 1), count: 12 },
};

export const ThreeAvatars: Story = {
  args: { avatars: AVATARS, count: 3 },
};

export const HighAttendance: Story = {
  args: { avatars: AVATARS, count: 12500 },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 20 }}>
      <AttendeeAvatarStack avatars={AVATARS} count={248} size={20} overlap={8} />
      <AttendeeAvatarStack avatars={AVATARS} count={248} size={28} overlap={10} />
      <AttendeeAvatarStack avatars={AVATARS} count={248} size={36} overlap={12} />
    </View>
  ),
};
