import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { GreetingHeader } from './GreetingHeader';

const meta: Meta<typeof GreetingHeader> = {
  title: 'Molecules/GreetingHeader',
  component: GreetingHeader,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    name: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof GreetingHeader>;

export const Playground: Story = {
  args: {
    name: 'Jordan',
    subtitle: '3 events happening near you',
  },
};

export const WithName: Story = {
  args: { name: 'Jordan', subtitle: '3 events happening near you' },
};

export const WithoutName: Story = {
  args: { subtitle: 'Discover events near you' },
};

export const SubtitleOnly: Story = {
  args: { name: null, subtitle: 'What are you up to this weekend?' },
};

export const NoSubtitle: Story = {
  args: { name: 'Alex' },
};
