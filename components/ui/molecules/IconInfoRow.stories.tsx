import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { IconInfoRow } from './IconInfoRow';
import { colors } from '../../../theme/tokens';

const meta: Meta<typeof IconInfoRow> = {
  title: 'Molecules/IconInfoRow',
  component: IconInfoRow,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    icon: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    iconColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof IconInfoRow>;

export const Playground: Story = {
  args: {
    icon: 'calendar-outline',
    label: 'Date',
    value: 'Saturday, 14 June 2025',
  },
};

export const LabelOnly: Story = {
  args: {
    icon: 'location-outline',
    label: 'Location not available',
  },
};

export const EventDetails: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 24, gap: 16 }}>
      <IconInfoRow icon="calendar-outline" label="Date" value="Saturday, 14 June 2025" />
      <IconInfoRow icon="time-outline" label="Time" value="6:00 PM – 11:00 PM" />
      <IconInfoRow icon="location-outline" label="Venue" value="Brixton Academy, London" />
      <IconInfoRow icon="ticket-outline" label="Ticket type" value="General Admission" />
      <IconInfoRow icon="person-outline" label="Organiser" value="SideHusl Events" />
    </View>
  ),
};

export const CustomIconColor: Story = {
  args: {
    icon: 'star-outline',
    label: 'Category',
    value: 'Music & Nightlife',
    iconColor: colors.primary,
  },
};
