import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { LoadingState } from './LoadingState';

const meta: Meta<typeof LoadingState> = {
  title: 'UI/LoadingState',
  component: LoadingState,
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
type Story = StoryObj<typeof LoadingState>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    message: 'Fetching events...',
  },
};

export const OrderLoading: Story = {
  args: {
    message: 'Loading your orders...',
  },
};

export const ProfileLoading: Story = {
  args: {
    message: 'Loading profile...',
  },
};
