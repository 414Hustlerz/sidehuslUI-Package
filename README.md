# @414hustlerz/sidehusl-ui

React Native UI component library for the Sidehusl ecosystem. 47+ production-ready components with a dark-theme design system, built for Expo.

## Installation

### 1. Configure GitHub Packages

Create or update `.npmrc` in your project root:

```
@414hustlerz:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### 2. Install the package

```bash
npm install @414hustlerz/sidehusl-ui @414hustlerz/types
```

### 3. Install peer dependencies

Most of these are already present in a standard Expo project:

```bash
npx expo install expo-linear-gradient expo-image expo-blur expo-haptics \
  react-native-reanimated react-native-gesture-handler react-native-svg \
  react-native-safe-area-context @react-native-masked-view/masked-view \
  @react-navigation/bottom-tabs react-native-qrcode-svg date-fns
```

## Usage

```tsx
import {
  // UI primitives
  Button, Card, Avatar, Input, SearchBar,
  // Atoms
  Text, Icon, Badge, Pill, Divider, GradientView, Skeleton,
  // Molecules
  CategoryChip, FilterChipBar, GreetingHeader, NotificationBell,
  // Organisms
  GradientButton, ScreenHeader, HeroEventCard, FeaturedCarousel,
  // Cards
  VendorCard, OrderCard, MenuItemCard, PollCard, NotificationCard,
  // Display
  EventHero, OrderTimeline, QRCodeDisplay,
  // Layout
  Screen, ProfileHeader,
  // Navigation
  WavyTabBar,
  // Theme
  colors, spacing, radius, typography, gradients, shadows,
  // Utilities
  formatCurrency, formatDate, getInitials,
} from '@414hustlerz/sidehusl-ui';
```

### Example: Home Screen

```tsx
import { Screen, ScreenHeader, GreetingHeader, SectionHeader,
         FeaturedCarousel, VendorCard, GradientButton } from '@414hustlerz/sidehusl-ui';

export default function HomeScreen() {
  return (
    <Screen>
      <ScreenHeader title="Home" />
      <GreetingHeader name="Vhutshilo" />

      <SectionHeader title="Featured Events" />
      <FeaturedCarousel events={events} onEventPress={handlePress} />

      <SectionHeader title="Nearby Vendors" />
      {vendors.map(v => (
        <VendorCard key={v.id} store={v} onPress={() => nav.push('Vendor', { id: v.id })} />
      ))}

      <GradientButton label="Explore All" onPress={handleExplore} />
    </Screen>
  );
}
```

### Example: Custom Tab Bar

```tsx
import { WavyTabBar } from '@414hustlerz/sidehusl-ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <WavyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

### Example: Using Theme Tokens

```tsx
import { colors, spacing, radius, typography } from '@414hustlerz/sidehusl-ui';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h2.size,
    fontWeight: typography.h2.weight,
  },
});
```

## Component Catalog

| Category | Components |
|----------|-----------|
| **UI Primitives** | `Avatar`, `BottomSheet`, `Button`, `Card`, `EmptyState`, `ErrorState`, `Input`, `LoadingState`, `SearchBar`, `SectionHeader`, `StatusBadge` |
| **Atoms** | `Text`, `Icon`, `GradientView`, `GradientIcon`, `GradientText`, `Badge`, `Pill`, `Divider`, `PaginationDots`, `Skeleton`, `SkeletonText`, `SkeletonCard` |
| **Molecules** | `CategoryChip`, `FilterChipBar`, `IconInfoRow`, `InfoRow`, `AttendeeAvatarStack`, `GreetingHeader`, `NotificationBell`, `CartButton`, `MenuGroup`, `MenuRow` |
| **Organisms** | `GradientButton`, `OutlinedButton`, `ScreenHeader`, `HeroEventCard`, `EventListCard`, `EventGridCard`, `EventCarouselCard`, `FeaturedCarousel`, `AnnouncementBanner`, `CartSummaryBar` |
| **Cards** | `MenuItemCard`, `NotificationCard`, `OrderCard`, `PollCard`, `VendorCard` |
| **Display** | `EventHero`, `OrderTimeline`, `QRCodeDisplay` |
| **Layout** | `ProfileHeader`, `Screen` |
| **Navigation** | `WavyTabBar` |

## Theme Tokens

The design system exports these token objects:

- **`colors`** — Dark-theme color palette with semantic status colors
- **`gradients`** — Predefined gradient color arrays
- **`spacing`** — Consistent spacing scale (`xs` 4px → `4xl` 48px)
- **`radius`** — Border radius values (`sm` 8px → `full` 9999px)
- **`typography`** — Font size, line-height, and weight presets
- **`shadows`** — Shadow styles including glow effects

## Peer Dependencies

| Package | Required |
|---------|----------|
| `react` & `react-native` | Yes |
| `expo-linear-gradient` | Yes |
| `expo-image` | Yes |
| `expo-blur` | Yes |
| `expo-haptics` | Yes |
| `@expo/vector-icons` | Yes |
| `react-native-reanimated` | Yes |
| `react-native-gesture-handler` | Yes |
| `react-native-svg` | Yes |
| `react-native-safe-area-context` | Yes |
| `@react-native-masked-view/masked-view` | Yes |
| `date-fns` | Yes |
| `@414hustlerz/types` | Yes |
| `@react-navigation/bottom-tabs` | Optional (for `WavyTabBar`) |
| `react-native-qrcode-svg` | Optional (for `QRCodeDisplay`) |

## License

MIT
