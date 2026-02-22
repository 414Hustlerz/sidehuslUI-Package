import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { CategoryChip } from './CategoryChip';

// Stateful wrapper so selection actually works in the playground
function CategoryChipDemo({
  label,
  emoji,
  initialSelected = false,
}: {
  label: string;
  emoji?: string;
  initialSelected?: boolean;
}) {
  const [selected, setSelected] = useState(initialSelected);
  return (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, alignItems: 'flex-start' }}>
      <CategoryChip
        label={label}
        emoji={emoji}
        selected={selected}
        onPress={() => setSelected((s) => !s)}
      />
    </View>
  );
}

const meta: Meta<typeof CategoryChipDemo> = {
  title: 'Molecules/CategoryChip',
  component: CategoryChipDemo,
  argTypes: {
    label: { control: 'text' },
    emoji: { control: 'text' },
    initialSelected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryChipDemo>;

export const Playground: Story = {
  args: { label: 'Music', emoji: '🎵', initialSelected: false },
};

export const Selected: Story = {
  args: { label: 'Music', emoji: '🎵', initialSelected: true },
};

export const WithoutEmoji: Story = {
  args: { label: 'Sports', initialSelected: false },
};

export const AllCategories: Story = {
  render: () => {
    const [selected, setSelected] = useState('all');
    const chips = [
      { id: 'all', label: 'All', emoji: '✨' },
      { id: 'music', label: 'Music', emoji: '🎵' },
      { id: 'food', label: 'Food & Drink', emoji: '🍔' },
      { id: 'sports', label: 'Sports', emoji: '⚽' },
      { id: 'art', label: 'Art', emoji: '🎨' },
      { id: 'comedy', label: 'Comedy', emoji: '😂' },
    ];
    return (
      <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {chips.map((chip) => (
          <CategoryChip
            key={chip.id}
            label={chip.label}
            emoji={chip.emoji}
            selected={selected === chip.id}
            onPress={() => setSelected(chip.id)}
          />
        ))}
      </View>
    );
  },
};
