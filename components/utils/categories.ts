export interface CategoryDefinition {
  id: string;
  label: string;
  emoji: string;
}

// 7 categories matching backend EventCategory type
export const CATEGORIES: CategoryDefinition[] = [
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'food', label: 'Food & Drink', emoji: '🍽️' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'arts', label: 'Arts', emoji: '🎨' },
  { id: 'tech', label: 'Tech', emoji: '💻' },
  { id: 'community', label: 'Community', emoji: '🤝' },
  { id: 'other', label: 'Other', emoji: '🎉' },
];

// Extended for Browse tab (non-backend categories included)
export const BROWSE_CATEGORIES: CategoryDefinition[] = [
  ...CATEGORIES.filter((c) => c.id !== 'other'),
  { id: 'nightlife', label: 'Nightlife', emoji: '🌙' },
  { id: 'outdoors', label: 'Outdoors', emoji: '🌿' },
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
  { id: 'wellness', label: 'Wellness', emoji: '🧘' },
  { id: 'comedy', label: 'Comedy', emoji: '😂' },
  { id: 'other', label: 'Other', emoji: '🎉' },
];

// Emoji lookup for any component (HeroEventCard, CategoryChip, etc.)
export const CATEGORY_EMOJI_MAP: Record<string, string> = Object.fromEntries(
  BROWSE_CATEGORIES.map((c) => [c.id, c.emoji])
);
