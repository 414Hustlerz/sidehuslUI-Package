import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView } from 'react-native';
import { PurchaseConfirmationCard } from './PurchaseConfirmationCard';
import type { TicketPurchase } from '@414hustlerz/types';

const basePurchase: TicketPurchase = {
  id: 'pur-1',
  created_at: '2026-03-07T10:00:00Z',
  user_id: 'usr-1',
  event_id: 'evt-1',
  ticket_type_id: 'tt-1',
  quantity: 3,
  total_amount: 60000,
  status: 'completed',
  checkout_id: 'abc123',
  checkout_url: null,
  purchase_number: 'SH-20260307-A3F9K',
};

const singlePurchase: TicketPurchase = {
  ...basePurchase,
  id: 'pur-2',
  quantity: 1,
  total_amount: 80000,
  ticket_type_id: 'tt-2',
  purchase_number: 'SH-20260307-B7C2M',
};

const freePurchase: TicketPurchase = {
  ...basePurchase,
  id: 'pur-3',
  quantity: 1,
  total_amount: 0,
  purchase_number: 'SH-20260307-F1R2E',
};

const meta: Meta<typeof PurchaseConfirmationCard> = {
  title: 'Cards/PurchaseConfirmationCard',
  component: PurchaseConfirmationCard,
  decorators: [
    (Story) => (
      <ScrollView style={{ flex: 1, backgroundColor: '#0A0A0F' }} contentContainerStyle={{ padding: 16 }}>
        <Story />
      </ScrollView>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PurchaseConfirmationCard>;

export const MultipleTickets: Story = {
  render: () => (
    <PurchaseConfirmationCard
      purchase={basePurchase}
      eventTitle="AfroBeats Festival 2026"
      eventDate="Mar 15"
      venueName="Cape Town Stadium"
      ticketTypeName="General Admission"
    />
  ),
};

export const SingleVIP: Story = {
  render: () => (
    <PurchaseConfirmationCard
      purchase={singlePurchase}
      eventTitle="Jazz in the Park"
      eventDate="Apr 2"
      venueName="Emmarentia Dam"
      ticketTypeName="VIP"
    />
  ),
};

export const FreeRSVP: Story = {
  render: () => (
    <PurchaseConfirmationCard
      purchase={freePurchase}
      eventTitle="Community Meetup"
      eventDate="Apr 10"
      ticketTypeName="General Admission"
    />
  ),
};
