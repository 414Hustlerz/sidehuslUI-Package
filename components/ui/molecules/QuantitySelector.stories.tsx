import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { useState } from 'react';
import { QuantitySelector } from './QuantitySelector';

const meta: Meta<typeof QuantitySelector> = {
  title: 'Molecules/QuantitySelector',
  component: QuantitySelector,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    value: { control: { type: 'number', min: 0 } },
    min: { control: { type: 'number', min: 0 } },
    max: { control: { type: 'number', min: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof QuantitySelector>;

export const Playground: Story = {
  args: { value: 2, min: 0, max: 10 },
};

export const AtMinimum: Story = {
  args: { value: 0, min: 0, max: 10 },
};

export const AtMaximum: Story = {
  args: { value: 10, min: 0, max: 10 },
};

export const SmallRange: Story = {
  args: { value: 1, min: 0, max: 2 },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <QuantitySelector value={value} max={10} onValueChange={setValue} />;
  },
};
