import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NotificationBell } from './NotificationBell';

const meta: Meta<typeof NotificationBell> = {
  title: 'Molecules/NotificationBell',
  component: NotificationBell,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    unreadCount: { control: { type: 'number', min: 0, max: 200 } },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationBell>;

export const Playground: Story = {
  args: { unreadCount: 3 },
};

export const NoUnread: Story = {
  args: { unreadCount: 0 },
};

export const SingleUnread: Story = {
  args: { unreadCount: 1 },
};

export const ManyUnread: Story = {
  args: { unreadCount: 99 },
};

export const Overflow: Story = {
  args: { unreadCount: 150 },
};

export const InHeader: Story = {
  render: () => (
    <View
      style={{
        backgroundColor: '#0A0A0F',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <NotificationBell unreadCount={5} />
    </View>
  ),
};
