import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { useState } from 'react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'UI/SearchBar',
  component: SearchBar,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

function StatefulSearchBar(props: { placeholder?: string }) {
  const [value, setValue] = useState('');
  return <SearchBar value={value} onChangeText={setValue} placeholder={props.placeholder} />;
}

export const Playground: Story = {
  render: (args) => <StatefulSearchBar placeholder={args.placeholder} />,
  args: { placeholder: 'Search events, venues...' },
};

export const Empty: Story = {
  render: () => <StatefulSearchBar placeholder="Search events, venues..." />,
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('Cape Town');
    return <SearchBar value={value} onChangeText={setValue} />;
  },
};

export const CustomPlaceholder: Story = {
  render: () => <StatefulSearchBar placeholder="Search by artist, venue..." />,
};

export const WithFilter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <SearchBar value={value} onChangeText={setValue} placeholder="Search events, venues..." onFilter={() => {}} />;
  },
};

export const WithFilterAndValue: Story = {
  render: () => {
    const [value, setValue] = useState('Cape Town');
    return <SearchBar value={value} onChangeText={setValue} onFilter={() => {}} />;
  },
};

export const WithActiveFilters: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <SearchBar value={value} onChangeText={setValue} placeholder="Search events, venues..." onFilter={() => {}} filterCount={3} />;
  },
};
