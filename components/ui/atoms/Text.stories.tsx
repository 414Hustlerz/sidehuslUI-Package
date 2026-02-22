import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['display', 'h1', 'h2', 'h3', 'body-lg', 'body', 'label', 'caption'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'inverse', 'accent'],
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Playground: Story = {
  args: { children: 'The quick brown fox', variant: 'body', color: 'primary' },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      <Text variant="display">Display</Text>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="body-lg">Body Large</Text>
      <Text variant="body">Body</Text>
      <Text variant="label">Label</Text>
      <Text variant="caption">Caption</Text>
    </View>
  ),
};

export const AllColors: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      <Text color="primary">Primary colour</Text>
      <Text color="secondary">Secondary colour</Text>
      <Text color="tertiary">Tertiary colour</Text>
      <Text color="accent">Accent colour</Text>
    </View>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      <Text weight="normal">Weight: normal</Text>
      <Text weight="medium">Weight: medium</Text>
      <Text weight="semibold">Weight: semibold</Text>
      <Text weight="bold">Weight: bold</Text>
    </View>
  ),
};
