import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { HeroEventCard } from './HeroEventCard';
import { mockEvents } from '../../__mocks__';

const MOCK_AVATARS = [
  'https://api.dicebear.com/7.x/thumbs/png?seed=alice',
  'https://api.dicebear.com/7.x/thumbs/png?seed=bob',
  'https://api.dicebear.com/7.x/thumbs/png?seed=carol',
];

const meta: Meta<typeof HeroEventCard> = {
  title: 'Organisms/HeroEventCard',
  component: HeroEventCard,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeroEventCard>;

export const Default: Story = {
  render: () => (
    <HeroEventCard
      event={mockEvents[0]}
      onPress={() => {}}
      attendeeCount={1240}
      attendeeAvatars={MOCK_AVATARS}
    />
  ),
};

export const HighAttendance: Story = {
  render: () => (
    <HeroEventCard
      event={mockEvents[1]}
      onPress={() => {}}
      attendeeCount={25000}
      attendeeAvatars={MOCK_AVATARS}
    />
  ),
};

export const NoAttendees: Story = {
  render: () => (
    <HeroEventCard event={mockEvents[0]} onPress={() => {}} />
  ),
};

export const NoImage: Story = {
  render: () => (
    <HeroEventCard
      event={{ ...mockEvents[0], image_url: null }}
      onPress={() => {}}
      attendeeCount={320}
      attendeeAvatars={MOCK_AVATARS}
    />
  ),
};

export const NoVenue: Story = {
  render: () => (
    <HeroEventCard
      event={{ ...mockEvents[0], venue_name: null }}
      onPress={() => {}}
      attendeeCount={800}
      attendeeAvatars={MOCK_AVATARS}
    />
  ),
};

export const LongTitle: Story = {
  render: () => (
    <HeroEventCard
      event={{
        ...mockEvents[0],
        title: 'The Annual Cape Town Summer Food, Music & Arts Cultural Spectacular Festival',
      }}
      onPress={() => {}}
      attendeeCount={4500}
      attendeeAvatars={MOCK_AVATARS}
    />
  ),
};
