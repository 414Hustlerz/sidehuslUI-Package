import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text } from 'react-native';
import { GradientView } from './GradientView';

const meta: Meta<typeof GradientView> = {
  title: 'Atoms/GradientView',
  component: GradientView,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'card', 'subtle', 'hero'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GradientView>;

export const Primary: Story = {
  render: () => (
    <GradientView
      variant="primary"
      style={{ height: 80, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>Primary Gradient</Text>
    </GradientView>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 12 }}>
      {(['primary', 'card', 'subtle', 'hero'] as const).map((variant) => (
        <GradientView
          key={variant}
          variant={variant}
          style={{ height: 64, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '600', textTransform: 'capitalize', fontSize: 15 }}>
            {variant}
          </Text>
        </GradientView>
      ))}
    </View>
  ),
};

export const AsCard: Story = {
  render: () => (
    <GradientView
      variant="card"
      style={{ padding: 20, borderRadius: 16, gap: 8 }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>Summer Vibes Festival</Text>
      <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Sat 14 Jun · Brixton Academy</Text>
    </GradientView>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <GradientView
      colors={['#6200EA', '#0091EA']}
      style={{ height: 80, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>Custom Gradient</Text>
    </GradientView>
  ),
};
