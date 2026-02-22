import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { useState } from 'react';
import { Input } from './Input';
import { GradientIcon } from './atoms/GradientIcon';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

function StatefulInput(props: React.ComponentProps<typeof Input>) {
  const [value, setValue] = useState((props.value as string) ?? '');
  return <Input {...props} value={value} onChangeText={setValue} />;
}

export const Default: Story = {
  render: () => <StatefulInput label="First Name" />,
};

export const WithIcon: Story = {
  render: () => (
    <StatefulInput
      label="First Name"
      leftIcon={<GradientIcon name="person" size={20} />}
    />
  ),
};

export const WithValue: Story = {
  render: () => (
    <StatefulInput
      label="Email"
      value="jordan@example.com"
      leftIcon={<GradientIcon name="mail" size={20} />}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <StatefulInput
      label="Email"
      value="invalid"
      leftIcon={<GradientIcon name="mail" size={20} />}
      error="Please enter a valid email address"
    />
  ),
};

export const WithHint: Story = {
  render: () => (
    <StatefulInput
      label="Password"
      secureTextEntry
      leftIcon={<GradientIcon name="lock-closed" size={20} />}
      rightIcon={<GradientIcon name="eye-off" size={20} />}
      hint="Must be at least 8 characters"
    />
  ),
};

export const FormExample: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <StatefulInput
        label="First Name"
        leftIcon={<GradientIcon name="person" size={20} />}
      />
      <StatefulInput
        label="Last Name"
        leftIcon={<GradientIcon name="person" size={20} />}
      />
      <StatefulInput
        label="Email"
        leftIcon={<GradientIcon name="mail" size={20} />}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <StatefulInput
        label="Password"
        secureTextEntry
        leftIcon={<GradientIcon name="lock-closed" size={20} />}
        rightIcon={<GradientIcon name="eye-off" size={20} />}
      />
      <StatefulInput
        label="Phone Number"
        leftIcon={<GradientIcon name="call" size={20} />}
        keyboardType="phone-pad"
      />
    </View>
  ),
};

export const NoIcon: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <StatefulInput label="First Name" />
      <StatefulInput label="Last Name" />
    </View>
  ),
};

export const NoLabel: Story = {
  render: () => (
    <StatefulInput
      placeholder="Type something..."
      leftIcon={<GradientIcon name="chatbubble" size={20} />}
    />
  ),
};
