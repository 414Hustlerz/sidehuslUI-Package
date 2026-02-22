import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { WavyTabBar } from './WavyTabBar';

// ---------------------------------------------------------------------------
// Mock nav props — WavyTabBar only reads state.index, state.routes,
// navigation.emit, and navigation.navigate. Descriptors are unused.
// ---------------------------------------------------------------------------

const ROUTES = [
  { key: 'index', name: 'index' },
  { key: 'search', name: 'search' },
  { key: 'favorites', name: 'favorites' },
  { key: 'orders', name: 'orders' },
  { key: 'profile', name: 'profile' },
] as const;

function buildMockProps(activeIndex: number, onTabPress: (index: number) => void) {
  const state = {
    index: activeIndex,
    routes: ROUTES as unknown as typeof ROUTES[number][],
    history: [],
    routeNames: ROUTES.map((r) => r.name),
    type: 'tab' as const,
    stale: false as false,
    key: 'storybook-tab-state',
  };

  const descriptors = Object.fromEntries(
    ROUTES.map((route) => [
      route.key,
      { options: {}, navigation: {} as any, render: () => null, route },
    ])
  );

  const navigation = {
    emit: ({ target }: { type: string; target: string; canPreventDefault: boolean }) => {
      const index = ROUTES.findIndex((r) => r.key === target);
      if (index !== -1) onTabPress(index);
      return { defaultPrevented: false };
    },
    navigate: (name: string) => {
      const index = ROUTES.findIndex((r) => r.name === name);
      if (index !== -1) onTabPress(index);
    },
  };

  return { state, descriptors, navigation } as any;
}

// ---------------------------------------------------------------------------
// Wrapper component so we can hold local state for the active tab
// ---------------------------------------------------------------------------

interface DemoProps {
  initialIndex?: number;
}

function WavyTabBarDemo({ initialIndex = 0 }: DemoProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const props = buildMockProps(activeIndex, setActiveIndex);

  return (
    // Full-screen container so the absolutely-positioned tab bar renders correctly
    <View style={{ flex: 1, backgroundColor: '#0A0A0F' }}>
      <WavyTabBar {...props} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof WavyTabBarDemo> = {
  title: 'Navigation/WavyTabBar',
  component: WavyTabBarDemo,
  argTypes: {
    initialIndex: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4],
      mapping: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WavyTabBarDemo>;

export const Home: Story = { args: { initialIndex: 0 } };
export const Search: Story = { args: { initialIndex: 1 } };
export const Favorites: Story = { args: { initialIndex: 2 } };
export const Orders: Story = { args: { initialIndex: 3 } };
export const Profile: Story = { args: { initialIndex: 4 } };
