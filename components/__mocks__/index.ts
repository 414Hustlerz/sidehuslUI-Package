import type { Event, EventWithOrganiser, Profile, Announcement } from '@414hustlerz/types';

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    created_at: '2026-01-01T00:00:00Z',
    organiser_id: 'org-1',
    title: 'Summer Music Festival',
    description: 'A celebration of live music in the heart of Johannesburg',
    category: 'music',
    venue_name: 'Constitution Hill',
    venue_address: 'Braamfontein, Johannesburg',
    start_date: '2026-03-15T18:00:00Z',
    end_date: '2026-03-15T23:00:00Z',
    image_url: 'https://picsum.photos/seed/event1/800/400',
    status: 'published',
    vendor_fee: null,
    vendor_application_deadline: null,
    max_vendors: null,
    code_pattern: null,
    transfers_enabled: false,
    max_transfers_per_ticket: null,
    cancellation_reason: null,
    admin_notes: null,
    is_free: false,
    ticket_price: null,
    refund_policy: null,
    refund_cutoff_hours: null,
  },
  {
    id: 'evt-2',
    created_at: '2026-01-02T00:00:00Z',
    organiser_id: 'org-1',
    title: 'Street Food Market',
    description: 'The best street food vendors in one place',
    category: 'food',
    venue_name: 'Neighbourgoods Market',
    venue_address: 'Braamfontein, Johannesburg',
    start_date: '2026-03-20T10:00:00Z',
    end_date: '2026-03-20T18:00:00Z',
    image_url: 'https://picsum.photos/seed/event2/800/400',
    status: 'published',
    vendor_fee: null,
    vendor_application_deadline: null,
    max_vendors: null,
    code_pattern: null,
    transfers_enabled: false,
    max_transfers_per_ticket: null,
    cancellation_reason: null,
    admin_notes: null,
    is_free: false,
    ticket_price: null,
    refund_policy: null,
    refund_cutoff_hours: null,
  },
  {
    id: 'evt-3',
    created_at: '2026-01-03T00:00:00Z',
    organiser_id: 'org-2',
    title: 'Tech Meetup: AI & Beyond',
    description: 'Exploring the frontiers of artificial intelligence',
    category: 'tech',
    venue_name: 'Workshop 17, Sandton',
    venue_address: 'Sandton, Johannesburg',
    start_date: '2026-04-02T17:30:00Z',
    end_date: '2026-04-02T21:00:00Z',
    image_url: 'https://picsum.photos/seed/event3/800/400',
    status: 'published',
    vendor_fee: null,
    vendor_application_deadline: null,
    max_vendors: null,
    code_pattern: null,
    transfers_enabled: false,
    max_transfers_per_ticket: null,
    cancellation_reason: null,
    admin_notes: null,
    is_free: false,
    ticket_price: null,
    refund_policy: null,
    refund_cutoff_hours: null,
  },
  {
    id: 'evt-4',
    created_at: '2026-01-04T00:00:00Z',
    organiser_id: 'org-3',
    title: 'Art Exhibition Opening',
    description: 'Contemporary African art showcase',
    category: 'arts',
    venue_name: 'Zeitz MOCAA',
    venue_address: 'V&A Waterfront, Cape Town',
    start_date: '2026-04-10T19:00:00Z',
    end_date: '2026-04-10T22:00:00Z',
    image_url: 'https://picsum.photos/seed/event4/800/400',
    status: 'published',
    vendor_fee: null,
    vendor_application_deadline: null,
    max_vendors: null,
    code_pattern: null,
    transfers_enabled: false,
    max_transfers_per_ticket: null,
    cancellation_reason: null,
    admin_notes: null,
    is_free: false,
    ticket_price: null,
    refund_policy: null,
    refund_cutoff_hours: null,
  },
  {
    id: 'evt-5',
    created_at: '2026-01-05T00:00:00Z',
    organiser_id: 'org-2',
    title: 'Comedy Night Live',
    description: null,
    category: 'community',
    venue_name: "Parker's Comedy & Jive",
    venue_address: 'Melville, Johannesburg',
    start_date: '2026-04-18T20:00:00Z',
    end_date: '2026-04-18T23:00:00Z',
    image_url: null,
    status: 'published',
    vendor_fee: null,
    vendor_application_deadline: null,
    max_vendors: null,
    code_pattern: null,
    transfers_enabled: false,
    max_transfers_per_ticket: null,
    cancellation_reason: null,
    admin_notes: null,
    is_free: false,
    ticket_price: null,
    refund_policy: null,
    refund_cutoff_hours: null,
  },
];

export const mockEventsWithOrganiser: EventWithOrganiser[] = mockEvents.map((e) => ({
  ...e,
  organiser: {
    id: 'org-1',
    full_name: 'Sidehusl Events',
    avatar_url: 'https://api.dicebear.com/7.x/thumbs/png?seed=organiser',
  },
}));

export const mockProfile: Profile = {
  id: 'usr-1',
  created_at: '2026-01-01T00:00:00Z',
  full_name: 'Vhutshilo Khomola',
  email: 'vhutshilo@example.com',
  avatar_url: 'https://api.dicebear.com/7.x/thumbs/png?seed=vhutshilo',
  phone: null,
  role: 'customer',
};

export const mockAnnouncement: Announcement = {
  id: 'ann-1',
  created_at: new Date().toISOString(),
  event_id: 'evt-1',
  message: 'The venue gate opens 30 minutes early today!',
  priority: 'normal',
  sent_by: 'org-1',
  recipient_count: null,
};

// ─── Rating Mocks ───────────────────────────────────────────────

export const mockRating = {
  customerName: 'Thabo M.',
  rating: 4,
  comment: 'Great food and quick service!',
  date: '5 Mar 2026',
  storeName: "Thabo's Kitchen",
};

export const mockRatingSummary = {
  averageRating: 4.2,
  totalCount: 48,
  distribution: [
    { stars: 5, count: 22 },
    { stars: 4, count: 14 },
    { stars: 3, count: 8 },
    { stars: 2, count: 3 },
    { stars: 1, count: 1 },
  ],
};

// ─── Session Mocks ──────────────────────────────────────────────

export const mockSessions = [
  {
    deviceName: 'iPhone 15 Pro',
    deviceType: 'phone' as const,
    location: 'Johannesburg, SA',
    ipAddress: '102.134.xx.xx',
    lastActive: '5 Mar, 14:30',
    isCurrent: true,
  },
  {
    deviceName: 'MacBook Pro',
    deviceType: 'desktop' as const,
    location: 'Cape Town, SA',
    ipAddress: '41.185.xx.xx',
    lastActive: '4 Mar, 09:15',
    isCurrent: false,
  },
];

// ─── Stat Mocks ─────────────────────────────────────────────────

export const mockStats = [
  { icon: 'calendar', iconColor: '#0066CC', label: 'Active Events', value: 3, trend: { direction: 'up' as const, value: '12%' } },
  { icon: 'people', iconColor: '#00C9B1', label: 'Total Attendees', value: '1.2K', trend: { direction: 'up' as const, value: '8%' } },
  { icon: 'wallet', iconColor: '#FFD166', label: 'Revenue', value: 'R24.5K' },
  { icon: 'storefront', iconColor: '#06D6A0', label: 'Active Vendors', value: 18, trend: { direction: 'down' as const, value: '3%' } },
];

// ─── FAQ Mocks ──────────────────────────────────────────────────

export const mockFAQs = [
  { question: 'How do I create an event?', answer: 'Navigate to the dashboard and tap "Create Event". Fill in the details and publish.', category: 'Events' },
  { question: 'How do payouts work?', answer: 'Payouts are processed weekly via EFT to your registered bank account.', category: 'Payments' },
];
