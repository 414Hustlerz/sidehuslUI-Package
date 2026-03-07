import type { Meta, StoryObj } from '@storybook/react-native';
import { View, ScrollView } from 'react-native';
import { TicketCard } from './TicketCard';
import type { Ticket } from '@414hustlerz/types';

const baseTicket: Ticket = {
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
};

const checkedInTicket: Ticket = {
  ...baseTicket,
  id: 'tkt-2',
  ticket_code: 'SH-B7C2-M4N8',
  checked_in_at: '2026-03-15T14:32:00Z',
};

const transferredTicket: Ticket = {
  ...baseTicket,
  id: 'tkt-3',
  ticket_code: 'SH-X1Y2-Z3W4',
  status: 'transferred',
  transferred_to: 'usr-2',
};

const refundedTicket: Ticket = {
  ...baseTicket,
  id: 'tkt-4',
  ticket_code: 'SH-D4E5-F6G7',
  status: 'refunded',
};

const vipTicket: Ticket = {
  ...baseTicket,
  id: 'tkt-5',
  ticket_code: 'SH-V1P2-Q3R4',
  ticket_type_name: 'VIP',
  ticket_type_price: 80000,
};

const freeTicket: Ticket = {
  ...baseTicket,
  id: 'tkt-6',
  ticket_code: 'SH-F1R2-E3E4',
  ticket_type_price: 0,
};

const eventProps = {
  eventTitle: 'AfroBeats Festival 2026',
  eventDate: 'Mar 15, 2026 \u00B7 14:00',
  venueName: 'Cape Town Stadium',
  holderName: 'Thabo Mokoena',
};

const meta: Meta<typeof TicketCard> = {
  title: 'Cards/TicketCard',
  component: TicketCard,
  decorators: [
    (Story) => (
      <ScrollView style={{ flex: 1, backgroundColor: '#0A0A0F' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Story />
      </ScrollView>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TicketCard>;

export const Active: Story = {
  render: () => <TicketCard ticket={baseTicket} {...eventProps} />,
};

export const CheckedIn: Story = {
  render: () => <TicketCard ticket={checkedInTicket} {...eventProps} />,
};

export const Transferred: Story = {
  render: () => (
    <TicketCard ticket={transferredTicket} {...eventProps} transferRecipient="Thandi Nkosi" />
  ),
};

export const Refunded: Story = {
  render: () => <TicketCard ticket={refundedTicket} {...eventProps} />,
};

export const VIP: Story = {
  render: () => <TicketCard ticket={vipTicket} {...eventProps} />,
};

export const FreeEvent: Story = {
  render: () => <TicketCard ticket={freeTicket} {...eventProps} />,
};

export const NoVenue: Story = {
  render: () => (
    <TicketCard
      ticket={baseTicket}
      eventTitle="Online Workshop"
      eventDate="Mar 20, 2026 \u00B7 10:00"
      holderName="Thabo Mokoena"
    />
  ),
};
