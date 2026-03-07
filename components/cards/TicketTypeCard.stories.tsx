import type { Meta, StoryObj } from '@storybook/react-native';
import { View, ScrollView } from 'react-native';
import { useState } from 'react';
import { TicketTypeCard } from './TicketTypeCard';
import type { TicketType } from '@414hustlerz/types';

const baseTicketType: TicketType = {
  id: 'tt-1',
  created_at: '2026-01-01T00:00:00Z',
  event_id: 'evt-1',
  name: 'General Admission',
  description: null,
  price: 20000,
  quantity_total: 500,
  quantity_sold: 158,
  max_per_order: 10,
  sale_starts_at: null,
  sale_ends_at: null,
  is_active: true,
  sort_order: 0,
};

const vipTicketType: TicketType = {
  ...baseTicketType,
  id: 'tt-2',
  name: 'VIP',
  description: 'Includes backstage access and complimentary drinks',
  price: 80000,
  quantity_total: 50,
  quantity_sold: 38,
  max_per_order: 4,
  sort_order: 1,
};

const soldOutTicketType: TicketType = {
  ...baseTicketType,
  id: 'tt-3',
  name: 'Early Bird',
  price: 15000,
  quantity_total: 100,
  quantity_sold: 100,
  sort_order: 2,
};

const futureTicketType: TicketType = {
  ...baseTicketType,
  id: 'tt-4',
  name: 'Late Release',
  price: 25000,
  quantity_total: 200,
  quantity_sold: 0,
  sale_starts_at: '2026-06-01T00:00:00Z',
  sort_order: 3,
};

const endedTicketType: TicketType = {
  ...baseTicketType,
  id: 'tt-5',
  name: 'Super Early Bird',
  price: 10000,
  quantity_total: 50,
  quantity_sold: 50,
  sale_ends_at: '2025-12-31T23:59:59Z',
  sort_order: 4,
};

const freeTicketType: TicketType = {
  ...baseTicketType,
  id: 'tt-6',
  name: 'General Admission',
  price: 0,
  quantity_total: 200,
  quantity_sold: 142,
  sort_order: 0,
};

const meta: Meta<typeof TicketTypeCard> = {
  title: 'Cards/TicketTypeCard',
  component: TicketTypeCard,
  decorators: [
    (Story) => (
      <ScrollView style={{ flex: 1, backgroundColor: '#0A0A0F' }} contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Story />
      </ScrollView>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TicketTypeCard>;

export const Available: Story = {
  render: () => {
    const [qty, setQty] = useState(0);
    return <TicketTypeCard ticketType={baseTicketType} quantity={qty} onQuantityChange={setQty} />;
  },
};

export const VIPWithDescription: Story = {
  render: () => {
    const [qty, setQty] = useState(0);
    return <TicketTypeCard ticketType={vipTicketType} quantity={qty} onQuantityChange={setQty} />;
  },
};

export const SoldOut: Story = {
  render: () => (
    <TicketTypeCard ticketType={soldOutTicketType} quantity={0} onQuantityChange={() => {}} />
  ),
};

export const SalesNotStarted: Story = {
  render: () => (
    <TicketTypeCard ticketType={futureTicketType} quantity={0} onQuantityChange={() => {}} />
  ),
};

export const SalesEnded: Story = {
  render: () => (
    <TicketTypeCard ticketType={endedTicketType} quantity={0} onQuantityChange={() => {}} />
  ),
};

export const FreeEvent: Story = {
  render: () => {
    const [qty, setQty] = useState(0);
    return <TicketTypeCard ticketType={freeTicketType} quantity={qty} onQuantityChange={setQty} isFreeEvent />;
  },
};

export const FullListing: Story = {
  render: () => {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const tiers = [baseTicketType, vipTicketType, soldOutTicketType];

    return (
      <View style={{ gap: 12 }}>
        {tiers.map((tier) => (
          <TicketTypeCard
            key={tier.id}
            ticketType={tier}
            quantity={quantities[tier.id] ?? 0}
            onQuantityChange={(q) => setQuantities((prev) => ({ ...prev, [tier.id]: q }))}
          />
        ))}
      </View>
    );
  },
};
