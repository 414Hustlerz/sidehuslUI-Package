import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { ScreenHeader } from './ScreenHeader';
import { NotificationBell } from '../molecules/NotificationBell';
import { CartButton } from '../molecules/CartButton';

const meta: Meta<typeof ScreenHeader> = {
  title: 'Organisms/ScreenHeader',
  component: ScreenHeader,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    transparent: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ScreenHeader>;

// --- Tab-style headers (no back button — large 26px title) ---

export const HomeStyle: Story = {
  render: () => (
    <ScreenHeader
      title="Home"
      rightActions={<NotificationBell unreadCount={3} />}
    />
  ),
};

export const DiscoverStyle: Story = {
  render: () => (
    <ScreenHeader
      title="Discover"
      rightActions={<NotificationBell unreadCount={0} />}
    />
  ),
};

export const FavouritesStyle: Story = {
  render: () => (
    <ScreenHeader
      title="Favourites"
      rightActions={<CartButton itemCount={2} />}
    />
  ),
};

export const OrdersStyle: Story = {
  render: () => <ScreenHeader title="My Orders" />,
};

export const WithSubtitle: Story = {
  render: () => (
    <ScreenHeader
      title="Discover"
      subtitle="156 events near you"
      rightActions={<NotificationBell unreadCount={1} />}
    />
  ),
};

// --- Detail-style headers (with back button — smaller 20px title) ---

export const DetailWithBack: Story = {
  render: () => (
    <ScreenHeader title="Event Details" onBack={() => {}} />
  ),
};

export const DetailWithBackAndAction: Story = {
  render: () => (
    <ScreenHeader
      title="Menu"
      onBack={() => {}}
      rightActions={<CartButton itemCount={3} />}
    />
  ),
};

export const Transparent: Story = {
  render: () => (
    <View style={{ backgroundColor: '#1C1C28', height: 80 }}>
      <ScreenHeader title="Festival Details" onBack={() => {}} transparent />
    </View>
  ),
};
