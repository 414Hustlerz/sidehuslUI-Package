import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { ProfileHeader } from './ProfileHeader';
import type { Profile } from '@sidehusl/types';

const meta: Meta<typeof ProfileHeader> = {
  title: 'Layout/ProfileHeader',
  component: ProfileHeader,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileHeader>;

const baseUser: Profile = {
  id: '1',
  email: 'jordan@example.com',
  full_name: 'Jordan Smith',
  avatar_url: null,
  phone: '+27 123 456 7890',
  role: 'customer',
  created_at: '2024-01-01T00:00:00Z',
};

export const WithInitials: Story = {
  render: () => <ProfileHeader user={baseUser} />,
};

export const WithAvatar: Story = {
  render: () => (
    <ProfileHeader
      user={{
        ...baseUser,
        avatar_url: 'https://api.dicebear.com/7.x/thumbs/png?seed=jordan',
      }}
    />
  ),
};

export const WithEditButton: Story = {
  render: () => (
    <ProfileHeader
      user={baseUser}
      onEditPress={() => {}}
    />
  ),
};

export const NoEmail: Story = {
  render: () => (
    <ProfileHeader
      user={{ ...baseUser, email: '' }}
      onEditPress={() => {}}
    />
  ),
};

export const Guest: Story = {
  render: () => <ProfileHeader user={null} />,
};

export const LongName: Story = {
  render: () => (
    <ProfileHeader
      user={{
        ...baseUser,
        full_name: 'Alexandria Bartholomew-Richardson III',
        email: 'alex.bartholomew.richardson@longdomain.co.za',
      }}
      onEditPress={() => {}}
    />
  ),
};
