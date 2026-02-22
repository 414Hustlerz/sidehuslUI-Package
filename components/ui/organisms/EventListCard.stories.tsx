import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { EventListCard } from './EventListCard';
import { mockEvents } from '../../__mocks__';

const meta: Meta<typeof EventListCard> = {
  title: 'Organisms/EventListCard',
  component: EventListCard,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 16, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EventListCard>;

export const Default: Story = {
  render: () => (
    <EventListCard event={mockEvents[0]} onPress={() => {}} />
  ),
};

export const NoImage: Story = {
  render: () => (
    <EventListCard
      event={{ ...mockEvents[0], image_url: null }}
      onPress={() => {}}
    />
  ),
};

export const NoVenue: Story = {
  render: () => (
    <EventListCard
      event={{ ...mockEvents[0], venue_name: null }}
      onPress={() => {}}
    />
  ),
};

export const AsList: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 16, gap: 12 }}>
      {mockEvents.slice(0, 4).map((event) => (
        <EventListCard key={event.id} event={event} onPress={() => {}} />
      ))}
    </View>
  ),
};
