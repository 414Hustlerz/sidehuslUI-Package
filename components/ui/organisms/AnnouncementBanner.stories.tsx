import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { AnnouncementBanner } from './AnnouncementBanner';

const normalAnnouncement = {
  id: 'ann-1',
  message: 'Stage 2 opens at 8 PM. Make your way to the main arena — doors close at 8:15 PM sharp.',
  priority: 'normal' as const,
  created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
};

const emergencyAnnouncement = {
  id: 'ann-2',
  message: 'Due to severe weather, the outdoor stage has been temporarily suspended. All attendees please move to the indoor venue immediately.',
  priority: 'emergency' as const,
  created_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
};

const meta: Meta<typeof AnnouncementBanner> = {
  title: 'Organisms/AnnouncementBanner',
  component: AnnouncementBanner,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 16, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AnnouncementBanner>;

export const Normal: Story = {
  render: () => (
    <AnnouncementBanner announcement={normalAnnouncement} />
  ),
};

export const Emergency: Story = {
  render: () => (
    <AnnouncementBanner announcement={emergencyAnnouncement} />
  ),
};

export const WithDismiss: Story = {
  render: () => (
    <AnnouncementBanner
      announcement={normalAnnouncement}
      onDismiss={() => {}}
    />
  ),
};

export const EmergencyWithDismiss: Story = {
  render: () => (
    <AnnouncementBanner
      announcement={emergencyAnnouncement}
      onDismiss={() => {}}
    />
  ),
};

export const Stack: Story = {
  render: () => (
    <View style={{ backgroundColor: '#0A0A0F', padding: 16, gap: 10 }}>
      <AnnouncementBanner announcement={emergencyAnnouncement} onDismiss={() => {}} />
      <AnnouncementBanner announcement={normalAnnouncement} onDismiss={() => {}} />
    </View>
  ),
};
