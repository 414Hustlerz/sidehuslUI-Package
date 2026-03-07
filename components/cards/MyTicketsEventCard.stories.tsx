import type { Meta, StoryObj } from '@storybook/react-native';
import { View, ScrollView } from 'react-native';
import { MyTicketsEventCard } from './MyTicketsEventCard';
import type { MyTicketsEvent, Ticket } from '@414hustlerz/types';

const makeTicket = (overrides: Partial<Ticket> = {}): Ticket => ({
  id: 'tkt-1',
  created_at: '2026-03-07T10:00:00Z',
  purchase_id: 'pur-1',
  ticket_type_id: 'tt-1',
  event_id: 'evt-1',
  holder_id: 'usr-1',
  ticket_code: 'SH-A3F9-K7M2',
  status: 'active',
  checked_in_at: null,
  transferred_to: null,
  ticket_type_name: 'General Admission',
  ticket_type_price: 20000,
  ...overrides,
});

const upcomingEvent: MyTicketsEvent = {
  event: {
    id: 'evt-1',
    title: 'AfroBeats Festival 2026',
    venue_name: 'Cape Town Stadium',
    start_date: '2026-03-15T14:00:00Z',
    end_date: '2026-03-15T23:00:00Z',
    image_url: null,
    status: 'published',
  },
  tickets: [
    makeTicket({ id: 'tkt-1', ticket_code: 'SH-A3F9-K7M2' }),
    makeTicket({ id: 'tkt-2', ticket_code: 'SH-B7C2-M4N8' }),
    makeTicket({ id: 'tkt-3', ticket_code: 'SH-C1D2-E3F4' }),
  ],
};

const singleTicketEvent: MyTicketsEvent = {
  event: {
    id: 'evt-2',
    title: 'Jazz in the Park',
    venue_name: 'Emmarentia Dam',
    start_date: '2026-04-02T16:00:00Z',
    end_date: '2026-04-02T21:00:00Z',
    image_url: null,
    status: 'published',
  },
  tickets: [makeTicket({ id: 'tkt-4', ticket_code: 'SH-J1K2-L3M4', ticket_type_name: 'VIP', ticket_type_price: 80000 })],
};

const pastEvent: MyTicketsEvent = {
  event: {
    id: 'evt-3',
    title: 'Summer Fest 2025',
    venue_name: 'Newlands Cricket Ground',
    start_date: '2025-12-14T12:00:00Z',
    end_date: '2025-12-14T22:00:00Z',
    image_url: null,
    status: 'completed',
  },
  tickets: [
    makeTicket({ id: 'tkt-5', ticket_code: 'SH-P1Q2-R3S4', checked_in_at: '2025-12-14T12:15:00Z' }),
    makeTicket({ id: 'tkt-6', ticket_code: 'SH-T1U2-V3W4', checked_in_at: '2025-12-14T12:20:00Z' }),
  ],
};

const meta: Meta<typeof MyTicketsEventCard> = {
  title: 'Cards/MyTicketsEventCard',
  component: MyTicketsEventCard,
  decorators: [
    (Story) => (
      <ScrollView style={{ flex: 1, backgroundColor: '#0A0A0F' }} contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Story />
      </ScrollView>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MyTicketsEventCard>;

export const Upcoming: Story = {
  render: () => <MyTicketsEventCard data={upcomingEvent} onPress={() => {}} />,
};

export const SingleTicket: Story = {
  render: () => <MyTicketsEventCard data={singleTicketEvent} onPress={() => {}} />,
};

export const Past: Story = {
  render: () => <MyTicketsEventCard data={pastEvent} onPress={() => {}} isPast />,
};

export const FullList: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <MyTicketsEventCard data={upcomingEvent} onPress={() => {}} />
      <MyTicketsEventCard data={singleTicketEvent} onPress={() => {}} />
      <MyTicketsEventCard data={pastEvent} onPress={() => {}} isPast />
    </View>
  ),
};
