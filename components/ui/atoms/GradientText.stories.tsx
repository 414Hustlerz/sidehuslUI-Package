import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { GradientText } from './GradientText';

const meta: Meta = {
  title: 'Atoms/GradientText',
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <GradientText style={{ fontSize: 15, fontWeight: '400' }}>
      Gradient Text
    </GradientText>
  ),
};

export const Typography: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <GradientText style={{ fontSize: 32, fontWeight: '700', lineHeight: 40 }}>
        Display
      </GradientText>
      <GradientText style={{ fontSize: 26, fontWeight: '700', lineHeight: 34 }}>
        Heading 1
      </GradientText>
      <GradientText style={{ fontSize: 22, fontWeight: '600', lineHeight: 30 }}>
        Heading 2
      </GradientText>
      <GradientText style={{ fontSize: 18, fontWeight: '600', lineHeight: 26 }}>
        Heading 3
      </GradientText>
      <GradientText style={{ fontSize: 16, fontWeight: '400', lineHeight: 24 }}>
        Body Large
      </GradientText>
      <GradientText style={{ fontSize: 15, fontWeight: '400', lineHeight: 22 }}>
        Body
      </GradientText>
      <GradientText style={{ fontSize: 13, fontWeight: '500', lineHeight: 18 }}>
        Label
      </GradientText>
      <GradientText style={{ fontSize: 12, fontWeight: '400', lineHeight: 16 }}>
        Caption
      </GradientText>
    </View>
  ),
};

export const InContext: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <GradientText style={{ fontSize: 13, fontWeight: '500' }}>
        Good evening
      </GradientText>
      <GradientText style={{ fontSize: 13, fontWeight: '500' }}>
        Date & Time
      </GradientText>
      <GradientText style={{ fontSize: 13, fontWeight: '500' }}>
        Location
      </GradientText>
      <GradientText style={{ fontSize: 15, fontWeight: '600' }}>
        See all
      </GradientText>
    </View>
  ),
};
