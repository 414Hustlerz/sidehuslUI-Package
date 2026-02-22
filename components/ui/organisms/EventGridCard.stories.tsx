import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { EventGridCard } from './EventGridCard';
import { mockEvents } from '../../__mocks__';

const meta: Meta<typeof EventGridCard> = {
  title: 'Organisms/EventGridCard',
  component: EventGridCard,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EventGridCard>;

export const Default: Story = {
  render: () => (
    <EventGridCard event={mockEvents[0]} onPress={() => {}} />
  ),
};

export const NoImage: Story = {
  render: () => (
    <EventGridCard
      event={{ ...mockEvents[0], image_url: null }}
      onPress={() => {}}
    />
  ),
};

export const AsGrid: Story = {
  render: () => (
    <View
      style={{
        backgroundColor: '#0A0A0F',
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      {mockEvents.slice(0, 4).map((event) => (
        <EventGridCard key={event.id} event={event} onPress={() => {}} />
      ))}
    </View>
  ),
};
