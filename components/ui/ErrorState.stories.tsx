import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'UI/ErrorState',
  component: ErrorState,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    message: 'We couldn\'t load the events. Please check your connection and try again.',
  },
};

export const WithRetry: Story = {
  args: {
    message: 'Failed to load your orders.',
    onRetry: () => {},
  },
};

export const NetworkError: Story = {
  args: {
    message: 'No internet connection. Please check your network settings.',
    onRetry: () => {},
  },
};
