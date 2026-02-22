import type { Event, EventWithOrganiser, Profile, Announcement } from '@sidehusl/types';

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Summer Music Festival',
    image_url: 'https://picsum.photos/seed/event1/800/400',
    start_date: '2026-03-15T18:00:00Z',
    venue_name: 'Constitution Hill',
    category: 'music',
  },
  {
    id: 'evt-2',
    title: 'Street Food Market',
    image_url: 'https://picsum.photos/seed/event2/800/400',
    start_date: '2026-03-20T10:00:00Z',
    venue_name: 'Neighbourgoods Market',
    category: 'food',
  },
  {
    id: 'evt-3',
    title: 'Tech Meetup: AI & Beyond',
    image_url: 'https://picsum.photos/seed/event3/800/400',
    start_date: '2026-04-02T17:30:00Z',
    venue_name: 'Workshop 17, Sandton',
    category: 'tech',
  },
  {
    id: 'evt-4',
    title: 'Art Exhibition Opening',
    image_url: 'https://picsum.photos/seed/event4/800/400',
    start_date: '2026-04-10T19:00:00Z',
    venue_name: 'Zeitz MOCAA',
    category: 'arts',
  },
  {
    id: 'evt-5',
    title: 'Comedy Night Live',
    image_url: null,
    start_date: '2026-04-18T20:00:00Z',
    venue_name: 'Parker\'s Comedy & Jive',
    category: 'comedy',
  },
];

export const mockEventsWithOrganiser: EventWithOrganiser[] = mockEvents.map((e) => ({
  ...e,
  organiser: {
    id: 'org-1',
    name: 'Sidehusl Events',
    avatar_url: 'https://api.dicebear.com/7.x/thumbs/png?seed=organiser',
  },
}));

export const mockProfile: Profile = {
  id: 'usr-1',
  full_name: 'Vhutshilo Khomola',
  email: 'vhutshilo@example.com',
  avatar_url: 'https://api.dicebear.com/7.x/thumbs/png?seed=vhutshilo',
};

export const mockAnnouncement: Announcement = {
  id: 'ann-1',
  message: 'The venue gate opens 30 minutes early today!',
  priority: 'normal',
  created_at: new Date().toISOString(),
};
