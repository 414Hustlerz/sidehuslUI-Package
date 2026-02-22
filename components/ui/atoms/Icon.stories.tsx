import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Icon } from './Icon';
import { colors } from '../../../theme/tokens';

const SAMPLE_ICONS = [
  'home', 'search', 'heart', 'bag-handle', 'person',
  'notifications', 'star', 'location', 'calendar', 'time',
  'ticket', 'camera', 'settings', 'chevron-forward', 'close',
] as const;

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: SAMPLE_ICONS,
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: { name: 'star', size: 'md', color: colors.textSecondary },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Icon name="star" size="sm" />
      <Icon name="star" size="md" />
      <Icon name="star" size="lg" />
      <Icon name="star" size="xl" />
    </View>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
      {SAMPLE_ICONS.map((name) => (
        <Icon key={name} name={name} size="lg" color={colors.textPrimary} />
      ))}
    </View>
  ),
};

export const Coloured: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, flexDirection: 'row', gap: 20, alignItems: 'center' }}>
      <Icon name="heart" size="xl" color="#FF4B4B" />
      <Icon name="star" size="xl" color="#FFD700" />
      <Icon name="checkmark-circle" size="xl" color="#00C9B1" />
      <Icon name="location" size="xl" color="#0066CC" />
    </View>
  ),
};
