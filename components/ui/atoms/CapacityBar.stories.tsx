import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text } from 'react-native';
import { CapacityBar } from './CapacityBar';

const meta: Meta<typeof CapacityBar> = {
  title: 'Atoms/CapacityBar',
  component: CapacityBar,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    sold: { control: { type: 'number', min: 0 } },
    total: { control: { type: 'number', min: 1 } },
    showLabel: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CapacityBar>;

export const Playground: Story = {
  args: { sold: 158, total: 500, showLabel: true },
};

export const LowCapacity: Story = {
  args: { sold: 50, total: 500 },
};

export const MidCapacity: Story = {
  args: { sold: 350, total: 500 },
};

export const HighCapacity: Story = {
  args: { sold: 480, total: 500 },
};

export const SoldOut: Story = {
  args: { sold: 500, total: 500 },
};

export const NoLabel: Story = {
  args: { sold: 200, total: 500, showLabel: false },
};

export const AllStages: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 24 }}>
      <View style={{ gap: 4 }}>
        <Text style={{ color: '#8A8A9A', fontSize: 12 }}>Low (30%)</Text>
        <CapacityBar sold={150} total={500} />
      </View>
      <View style={{ gap: 4 }}>
        <Text style={{ color: '#8A8A9A', fontSize: 12 }}>Medium (60%)</Text>
        <CapacityBar sold={300} total={500} />
      </View>
      <View style={{ gap: 4 }}>
        <Text style={{ color: '#8A8A9A', fontSize: 12 }}>High (95%)</Text>
        <CapacityBar sold={475} total={500} />
      </View>
      <View style={{ gap: 4 }}>
        <Text style={{ color: '#8A8A9A', fontSize: 12 }}>Sold Out (100%)</Text>
        <CapacityBar sold={500} total={500} />
      </View>
    </View>
  ),
};
