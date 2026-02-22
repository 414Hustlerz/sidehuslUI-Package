import type { Meta, StoryObj } from '@storybook/react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { PaginationDots } from './PaginationDots';

/** Wrapper needed because SharedValue can't be passed through Storybook args */
function PaginationDotsDemo({ total, initial = 0 }: { total: number; initial?: number }) {
  const activeIndex = useSharedValue(initial);

  return (
    <View style={{ alignItems: 'center', gap: 24 }}>
      <PaginationDots total={total} activeIndex={activeIndex} />
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {Array.from({ length: total }).map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => { activeIndex.value = i; }}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              backgroundColor: '#1C1C28',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Dot {i + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const meta: Meta = {
  title: 'Atoms/PaginationDots',
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          backgroundColor: '#0A0A0F',
          padding: 32,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/** Four dots — tap buttons to animate between them */
export const FourDots: Story = {
  render: () => <PaginationDotsDemo total={4} initial={0} />,
};

/** Three dots — starts on middle */
export const ThreeDots: Story = {
  render: () => <PaginationDotsDemo total={3} initial={1} />,
};

/** Two dots */
export const TwoDots: Story = {
  render: () => <PaginationDotsDemo total={2} initial={0} />,
};

/** Single dot edge case */
export const SingleDot: Story = {
  render: () => <PaginationDotsDemo total={1} initial={0} />,
};
