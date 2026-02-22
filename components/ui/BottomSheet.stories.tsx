import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomSheet } from './BottomSheet';
import { Card } from './Card';
import { CategoryChip } from './molecules/CategoryChip';
import { AttendeeAvatarStack } from './molecules/AttendeeAvatarStack';
import { GradientIcon } from './atoms/GradientIcon';
import { GradientText } from './atoms/GradientText';
import { colors, gradients } from '../../theme/tokens';
import { mockEvents } from '../__mocks__';
import { format } from 'date-fns';

const meta: Meta = {
  title: 'UI/BottomSheet',
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 24, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj;

function OpenButton({ onPress, label = 'Open Bottom Sheet' }: { onPress: () => void; label?: string }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.elevated,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        alignSelf: 'center',
      }}
    >
      <GradientText style={{ fontSize: 15, fontWeight: '600' }}>{label}</GradientText>
    </TouchableOpacity>
  );
}

/* ─── Radio dot (gradient filled when selected) ─────────────────────── */
function RadioDot({ selected }: { selected: boolean }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: selected ? colors.primary : colors.border,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {selected && (
        <LinearGradient
          colors={gradients.primary as unknown as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 12, height: 12, borderRadius: 6 }}
        />
      )}
    </View>
  );
}

/* ─── Checkbox (gradient fill when checked) ─────────────────────────── */
function Checkbox({ checked }: { checked: boolean }) {
  if (!checked) {
    return (
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: colors.border,
        }}
      />
    );
  }
  return (
    <LinearGradient
      colors={gradients.primary as unknown as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <GradientIcon name="checkmark" size={14} />
      {/* White checkmark on gradient bg */}
      <View style={{ position: 'absolute' }}>
        <Text style={{ color: colors.textPrimary, fontSize: 14, fontWeight: '700' }}>✓</Text>
      </View>
    </LinearGradient>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STORIES
   ═══════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <OpenButton onPress={() => setVisible(true)} />
        <BottomSheet visible={visible} onClose={() => setVisible(false)} title="Select Option">
          <View style={{ gap: 10 }}>
            {[
              { icon: 'star' as const, label: 'Option A' },
              { icon: 'heart' as const, label: 'Option B' },
              { icon: 'rocket' as const, label: 'Option C' },
            ].map(({ icon, label }) => (
              <Card key={label} onPress={() => setVisible(false)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                  <GradientIcon name={icon} size={20} />
                  <Text style={{ color: colors.textPrimary, fontSize: 15, flex: 1 }}>{label}</Text>
                </View>
              </Card>
            ))}
          </View>
        </BottomSheet>
      </>
    );
  },
};

export const SingleSelect: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState('medium');
    const options = [
      { key: 'small', icon: 'resize-outline' as const, label: 'Small', desc: 'Serves 1' },
      { key: 'medium', icon: 'resize' as const, label: 'Medium', desc: 'Serves 2' },
      { key: 'large', icon: 'expand' as const, label: 'Large', desc: 'Serves 3–4' },
      { key: 'family', icon: 'people' as const, label: 'Family', desc: 'Serves 5+' },
    ];
    return (
      <>
        <OpenButton onPress={() => setVisible(true)} label="Choose Size" />
        <BottomSheet visible={visible} onClose={() => setVisible(false)} variant="select" title="Select Size">
          <View style={{ gap: 10 }}>
            {options.map(({ key, icon, label, desc }) => (
              <Card key={key} onPress={() => setSelected(key)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                  <GradientIcon name={icon} size={20} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '500' }}>{label}</Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>{desc}</Text>
                  </View>
                  <RadioDot selected={selected === key} />
                </View>
              </Card>
            ))}
          </View>
        </BottomSheet>
      </>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState<Set<string>>(new Set(['music']));
    const options = [
      { key: 'music', icon: 'musical-notes' as const, label: 'Music' },
      { key: 'food', icon: 'restaurant' as const, label: 'Food & Drink' },
      { key: 'sports', icon: 'football' as const, label: 'Sports' },
      { key: 'art', icon: 'color-palette' as const, label: 'Art & Culture' },
      { key: 'tech', icon: 'code-slash' as const, label: 'Tech & Innovation' },
    ];
    const toggle = (key: string) => {
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
    };
    return (
      <>
        <OpenButton onPress={() => setVisible(true)} label="Filter Categories" />
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          variant="select"
          title="Select Categories"
          ctaButton={{
            label: 'Apply Filters',
            onPress: () => setVisible(false),
          }}
        >
          <View style={{ gap: 10 }}>
            {options.map(({ key, icon, label }) => (
              <Card key={key} onPress={() => toggle(key)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                  <GradientIcon name={icon} size={20} />
                  <Text style={{ color: colors.textPrimary, fontSize: 15, flex: 1 }}>{label}</Text>
                  <Checkbox checked={checked.has(key)} />
                </View>
              </Card>
            ))}
          </View>
        </BottomSheet>
      </>
    );
  },
};

export const ClickThrough: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const items = [
      { icon: 'person' as const, label: 'Edit Profile', desc: 'Name, photo, bio' },
      { icon: 'notifications' as const, label: 'Notifications', desc: 'Push, email, SMS' },
      { icon: 'lock-closed' as const, label: 'Privacy & Security', desc: 'Password, 2FA' },
      { icon: 'card' as const, label: 'Payment Methods', desc: 'Cards, wallets' },
      { icon: 'help-circle' as const, label: 'Help & Support', desc: 'FAQs, contact us' },
    ];
    return (
      <>
        <OpenButton onPress={() => setVisible(true)} label="Settings Menu" />
        <BottomSheet visible={visible} onClose={() => setVisible(false)} title="Settings">
          <View style={{ gap: 10 }}>
            {items.map(({ icon, label, desc }) => (
              <Card key={label} onPress={() => setVisible(false)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                  <GradientIcon name={icon} size={20} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '500' }}>{label}</Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>{desc}</Text>
                  </View>
                  <GradientIcon name="chevron-forward" size={18} />
                </View>
              </Card>
            ))}
          </View>
        </BottomSheet>
      </>
    );
  },
};

export const EventPreview: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const event = mockEvents[0];
    return (
      <>
        <OpenButton onPress={() => setVisible(true)} label="Event Details" />
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          variant="preview"
          ctaButton={{
            label: 'Get Tickets',
            onPress: () => setVisible(false),
          }}
        >
          {/* Full-width hero image with fade overlay containing category + title */}
          <View style={{ height: 260 }}>
            {event.image_url && (
              <Image
                source={{ uri: event.image_url }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            )}
            {/* Fade area — tall enough to hold attendees (top half) + title (bottom half) */}
            <LinearGradient
              colors={['transparent', colors.surface]}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 120,
                justifyContent: 'flex-end',
                paddingHorizontal: 16,
              }}
            >
              {/* Top half of fade — category + attendees */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                {event.category && <CategoryChip label={event.category} emoji="🍔" />}
                <AttendeeAvatarStack
                  avatars={[
                    'https://i.pravatar.cc/100?img=1',
                    'https://i.pravatar.cc/100?img=2',
                    'https://i.pravatar.cc/100?img=3',
                  ]}
                  count={142}
                  size={26}
                  overlap={9}
                />
              </View>
              {/* Bottom half of fade — title */}
              <Text
                style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', lineHeight: 28, marginBottom: 12 }}
                numberOfLines={2}
              >
                {event.title}
              </Text>
            </LinearGradient>
          </View>

          {/* Date + Venue */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, marginTop: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <GradientIcon name="calendar" size={13} />
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
                {format(new Date(event.start_date), 'EEE, MMM d')}
              </Text>
            </View>
            {event.venue_name && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 }}>
                <GradientIcon name="location" size={13} />
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }} numberOfLines={1}>
                  {event.venue_name}
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 15, lineHeight: 22 }}>
              {event.description}
            </Text>
          </View>

          {/* Detail cards */}
          <View style={{ paddingHorizontal: 16, gap: 10, marginTop: 14 }}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                <GradientIcon name="calendar" size={20} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '500' }}>Date & Time</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>Sat, 15 Mar 2026 · 10:00 – 22:00</Text>
                </View>
              </View>
            </Card>
            <Card onPress={() => {}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                <GradientIcon name="location" size={20} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '500' }}>Venue</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>{event.venue_name}</Text>
                </View>
                <GradientIcon name="chevron-forward" size={18} />
              </View>
            </Card>
            <Card onPress={() => {}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                <GradientIcon name="ticket" size={20} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '500' }}>Tickets</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>From R450 · 3 tiers available</Text>
                </View>
                <GradientIcon name="chevron-forward" size={18} />
              </View>
            </Card>
            <Card onPress={() => {}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                <GradientIcon name="people" size={20} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '500' }}>Lineup</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>30+ food vendors & live music</Text>
                </View>
                <GradientIcon name="chevron-forward" size={18} />
              </View>
            </Card>
            <Card onPress={() => {}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                <GradientIcon name="storefront" size={20} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '500' }}>Vendors</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>Browse food, drinks & merch</Text>
                </View>
                <GradientIcon name="chevron-forward" size={18} />
              </View>
            </Card>
          </View>
        </BottomSheet>
      </>
    );
  },
};

export const NoTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <OpenButton onPress={() => setVisible(true)} label="Open (no title)" />
        <BottomSheet visible={visible} onClose={() => setVisible(false)}>
          <Card>
            <View style={{ padding: 14 }}>
              <Text style={{ color: colors.textPrimary, fontSize: 15, lineHeight: 22 }}>
                This bottom sheet has no title — just content.
              </Text>
            </View>
          </Card>
        </BottomSheet>
      </>
    );
  },
};

export const SortFilter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <OpenButton onPress={() => setVisible(true)} label="Sort & Filter" />
        <BottomSheet visible={visible} onClose={() => setVisible(false)} title="Sort By">
          <View style={{ gap: 10 }}>
            {[
              { icon: 'time' as const, label: 'Most Recent' },
              { icon: 'flame' as const, label: 'Most Popular' },
              { icon: 'cash' as const, label: 'Price: Low to High' },
              { icon: 'calendar' as const, label: 'Date' },
            ].map(({ icon, label }) => (
              <Card key={label} onPress={() => setVisible(false)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                  <GradientIcon name={icon} size={20} />
                  <Text style={{ color: colors.textPrimary, fontSize: 15, flex: 1 }}>{label}</Text>
                  <GradientIcon name="chevron-forward" size={16} />
                </View>
              </Card>
            ))}
          </View>
        </BottomSheet>
      </>
    );
  },
};
