import type { Meta, StoryObj } from '@storybook/react-native';
import { View, ScrollView } from 'react-native';
import { useState } from 'react';
import { OrganiserCard } from './OrganiserCard';
import type { OrganiserProfile, Event } from '@414hustlerz/types';

const mockOrganisers: OrganiserProfile[] = [
  { id: 'org-1', full_name: 'Events Cape Town', avatar_url: null, event_count: 12, location: 'Cape Town' },
  { id: 'org-2', full_name: 'TechSA Events', avatar_url: null, event_count: 8, location: 'Johannesburg' },
  { id: 'org-3', full_name: 'Coastal Events Co', avatar_url: null, event_count: 5, location: 'Durban' },
];

const mockEvents: (Event & { organiser_id: string })[] = [
  {
    id: 'fe-1', organiser_id: 'org-1', title: 'Cape Town Summer Market',
    category: 'community', venue_name: 'Green Point Urban Park',
    start_date: '2026-03-08T09:00:00Z', image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    status: 'published',
  } as any,
  {
    id: 'fe-2', organiser_id: 'org-2', title: 'AI & ML Workshop Series',
    category: 'tech', venue_name: 'The Innovation Hub',
    start_date: '2026-03-22T09:00:00Z', image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    status: 'published',
  } as any,
  {
    id: 'fe-3', organiser_id: 'org-3', title: 'Sunset Sessions Durban',
    category: 'music', venue_name: 'uShaka Beach',
    start_date: '2026-04-05T16:00:00Z', image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    status: 'published',
  } as any,
  {
    id: 'fe-4', organiser_id: 'org-1', title: 'Franschhoek Gourmet Weekend',
    category: 'food', venue_name: 'Franschhoek Village',
    start_date: '2026-04-18T10:00:00Z', image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    status: 'published',
  } as any,
];

const eventsByOrganiser = new Map<string, Event[]>();
for (const event of mockEvents) {
  const list = eventsByOrganiser.get(event.organiser_id) ?? [];
  list.push(event);
  eventsByOrganiser.set(event.organiser_id, list);
}

const meta: Meta<typeof OrganiserCard> = {
  title: 'Cards/OrganiserCard',
  component: OrganiserCard,
  decorators: [
    (Story) => (
      <ScrollView style={{ flex: 1, backgroundColor: '#0A0A0F' }} contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Story />
      </ScrollView>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OrganiserCard>;

export const Following: Story = {
  render: () => (
    <OrganiserCard
      organiser={mockOrganisers[0]}
      isFollowing={true}
      onToggleFollow={() => {}}
      onPress={() => {}}
      upcomingEvents={eventsByOrganiser.get(mockOrganisers[0].id)}
    />
  ),
};

export const NotFollowing: Story = {
  render: () => (
    <OrganiserCard
      organiser={mockOrganisers[1]}
      isFollowing={false}
      onToggleFollow={() => {}}
      onPress={() => {}}
      upcomingEvents={eventsByOrganiser.get(mockOrganisers[1].id)}
    />
  ),
};

export const NoEvents: Story = {
  render: () => (
    <OrganiserCard
      organiser={{ ...mockOrganisers[0], event_count: 0 }}
      isFollowing={true}
      onToggleFollow={() => {}}
      onPress={() => {}}
      upcomingEvents={[]}
    />
  ),
};

export const AsList: Story = {
  render: () => {
    const [followingIds, setFollowingIds] = useState<Set<string>>(
      new Set(mockOrganisers.map((o) => o.id)),
    );

    const toggle = (id: string) => {
      setFollowingIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    };

    return (
      <View style={{ gap: 12 }}>
        {mockOrganisers.map((org) => (
          <OrganiserCard
            key={org.id}
            organiser={org}
            isFollowing={followingIds.has(org.id)}
            onToggleFollow={() => toggle(org.id)}
            onPress={() => {}}
            upcomingEvents={eventsByOrganiser.get(org.id)}
          />
        ))}
      </View>
    );
  },
};
