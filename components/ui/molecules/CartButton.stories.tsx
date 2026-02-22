import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { CartButton } from './CartButton';

const meta: Meta<typeof CartButton> = {
  title: 'Molecules/CartButton',
  component: CartButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    itemCount: { control: { type: 'number', min: 0, max: 99 } },
  },
};

export default meta;
type Story = StoryObj<typeof CartButton>;

export const Playground: Story = {
  args: { itemCount: 2 },
};

export const Empty: Story = {
  args: { itemCount: 0 },
};

export const WithItems: Story = {
  args: { itemCount: 4 },
};

export const ManyItems: Story = {
  args: { itemCount: 99 },
};

export const BothHeaderButtons: Story = {
  render: () => (
    <View
      style={{
        backgroundColor: '#0A0A0F',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <CartButton itemCount={3} />
    </View>
  ),
};
