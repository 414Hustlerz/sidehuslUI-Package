import { ScrollView, View } from 'react-native';
import { CategoryChip } from './CategoryChip';

interface FilterOption {
  id: string;
  label: string;
  emoji?: string;
}

interface FilterChipBarProps {
  options: FilterOption[];
  selected: string;
  onSelect: (id: string) => void;
  paddingHorizontal?: number;
}

export function FilterChipBar({
  options,
  selected,
  onSelect,
  paddingHorizontal = 16,
}: FilterChipBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal }}
    >
      {options.map((opt) => (
        <CategoryChip
          key={opt.id}
          label={opt.label}
          emoji={opt.emoji}
          selected={selected === opt.id}
          onPress={() => onSelect(opt.id)}
        />
      ))}
    </ScrollView>
  );
}
