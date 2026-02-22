import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text } from 'react-native';
import { CartSummaryBar } from './CartSummaryBar';

// CartSummaryBar is absolutely positioned, so we need a fixed-height
// relative container to render it correctly in Storybook.
function CartSummaryBarDemo(props: React.ComponentProps<typeof CartSummaryBar>) {
  return (
    <View style={{ height: 120, position: 'relative', backgroundColor: '#0A0A0F' }}>
      <Text style={{ color: '#4A4A5A', textAlign: 'center', marginTop: 20, fontSize: 13 }}>
        Screen content here
      </Text>
      <CartSummaryBar {...props} />
    </View>
  );
}

const meta: Meta<typeof CartSummaryBarDemo> = {
  title: 'Organisms/CartSummaryBar',
  component: CartSummaryBarDemo,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    itemCount: { control: { type: 'number', min: 0, max: 20 } },
    total: { control: { type: 'number' } },
    storeName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CartSummaryBarDemo>;

export const Playground: Story = {
  args: { itemCount: 3, total: 44.00, storeName: 'The Braai Shack' },
};

export const WithStoreName: Story = {
  args: { itemCount: 2, total: 28.50, storeName: 'The Braai Shack' },
};

export const WithoutStoreName: Story = {
  args: { itemCount: 5, total: 67.00 },
};

export const SingleItem: Story = {
  args: { itemCount: 1, total: 12.00, storeName: 'Drinks Bar' },
};

export const Hidden: Story = {
  args: { itemCount: 0, total: 0 },
};
