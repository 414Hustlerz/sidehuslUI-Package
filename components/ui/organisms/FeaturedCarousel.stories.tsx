import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { FeaturedCarousel } from './FeaturedCarousel';
import { mockEvents } from '../../__mocks__';

const MOCK_AVATARS = [
  'https://api.dicebear.com/7.x/thumbs/png?seed=alice',
  'https://api.dicebear.com/7.x/thumbs/png?seed=bob',
  'https://api.dicebear.com/7.x/thumbs/png?seed=carol',
];

const meta: Meta<typeof FeaturedCarousel> = {
  title: 'Organisms/FeaturedCarousel',
  component: FeaturedCarousel,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', paddingVertical: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeaturedCarousel>;

/** Auto-scrolls every 4 s. Active card centred, adjacent cards bleed in. */
export const Default: Story = {
  render: () => (
    <FeaturedCarousel
      events={mockEvents.slice(0, 4)}
      onEventPress={() => {}}
      attendeeCount={1240}
      attendeeAvatars={MOCK_AVATARS}
    />
  ),
};

export const NoAttendees: Story = {
  render: () => (
    <FeaturedCarousel
      events={mockEvents.slice(0, 4)}
      onEventPress={() => {}}
    />
  ),
};

export const SingleEvent: Story = {
  render: () => (
    <FeaturedCarousel
      events={[mockEvents[0]]}
      onEventPress={() => {}}
      attendeeCount={320}
      attendeeAvatars={MOCK_AVATARS}
    />
  ),
};
