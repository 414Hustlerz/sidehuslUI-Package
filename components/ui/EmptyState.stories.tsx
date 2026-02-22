import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'UI/EmptyState',
  component: EmptyState,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    actionLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Playground: Story = {
  args: {
    icon: 'search-outline',
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you are looking for.',
    actionLabel: 'Clear filters',
    onAction: () => {},
  },
};

export const NoFavourites: Story = {
  args: {
    icon: 'heart-outline',
    title: 'No favourites yet',
    description: 'Save events you love and they will appear here.',
  },
};

export const NoSearchResults: Story = {
  args: {
    icon: 'search-outline',
    title: 'No results found',
    description: 'Try a different keyword or browse categories.',
  },
};

export const NoEvents: Story = {
  args: {
    icon: 'calendar-outline',
    title: 'No events near you',
    description: 'Check back later or explore a different location.',
    actionLabel: 'Explore all events',
    onAction: () => {},
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Nothing here yet',
  },
};
