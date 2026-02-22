import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { FilterChipBar } from './FilterChipBar';

const EVENT_FILTERS = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'food', label: 'Food & Drink', emoji: '🍔' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'art', label: 'Art', emoji: '🎨' },
  { id: 'comedy', label: 'Comedy', emoji: '😂' },
  { id: 'tech', label: 'Tech', emoji: '💻' },
  { id: 'wellness', label: 'Wellness', emoji: '🧘' },
];

const SIMPLE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Today' },
  { id: 'weekend', label: 'Weekend' },
  { id: 'free', label: 'Free' },
];

function FilterChipBarDemo({ initialSelected = 'all' }: { initialSelected?: string }) {
  const [selected, setSelected] = useState(initialSelected);
  return (
    <View style={{ backgroundColor: '#0A0A0F', paddingVertical: 16 }}>
      <FilterChipBar options={EVENT_FILTERS} selected={selected} onSelect={setSelected} />
    </View>
  );
}

const meta: Meta<typeof FilterChipBarDemo> = {
  title: 'Molecules/FilterChipBar',
  component: FilterChipBarDemo,
  argTypes: {
    initialSelected: {
      control: { type: 'select' },
      options: EVENT_FILTERS.map((f) => f.id),
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterChipBarDemo>;

export const Playground: Story = {
  args: { initialSelected: 'all' },
};

export const WithEmojis: Story = {
  render: () => {
    const [selected, setSelected] = useState('music');
    return (
      <View style={{ backgroundColor: '#0A0A0F', paddingVertical: 16 }}>
        <FilterChipBar options={EVENT_FILTERS} selected={selected} onSelect={setSelected} />
      </View>
    );
  },
};

export const WithoutEmojis: Story = {
  render: () => {
    const [selected, setSelected] = useState('all');
    return (
      <View style={{ backgroundColor: '#0A0A0F', paddingVertical: 16 }}>
        <FilterChipBar options={SIMPLE_FILTERS} selected={selected} onSelect={setSelected} />
      </View>
    );
  },
};
