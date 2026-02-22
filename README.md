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

### Atoms (`components/ui/atoms/`)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Text` | Themed text with design-system typography and color presets | `variant` (`display` · `h1` · `h2` · `h3` · `body-lg` · `body` · `label` · `caption`), `color`, `weight` |
| `Icon` | Ionicons wrapper with named size presets | `name`, `size` (`sm` · `md` · `lg` · `xl` or number), `color` |
| `GradientView` | LinearGradient wrapper with variant-driven gradient presets | `variant` (`primary` · `card` · `subtle` · `hero`), `colors`, `children` |
| `GradientIcon` | Ionicon rendered with a primary gradient fill via MaskedView | `name`, `size` |
| `GradientText` | Text rendered with a horizontal primary gradient fill | `children` (string), `style` |
| `Badge` | Numeric badge or dot indicator, overlaid on icons | `count`, `dot`, `color`, `max` |
| `Pill` | Rounded label chip with semantic color variants | `label`, `variant` (`default` · `primary` · `accent` · `success` · `error` · `warning` · `pending`), `size` |
| `Divider` | Horizontal or vertical 1px divider line | `color`, `spacing` (`none` · `sm` · `md` · `lg`), `vertical` |
| `PaginationDots` | Animated carousel pagination dots driven by Reanimated SharedValue | `total`, `activeIndex` (SharedValue) |
| `Skeleton` | Animated shimmer loading placeholder | `width`, `height`, `borderRadius` |
| `SkeletonText` | Multiple skeleton lines simulating text | `lines`, `spacing` |
| `SkeletonCard` | Full-width skeleton rectangle simulating a card | `height` |

### Molecules (`components/ui/molecules/`)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `CategoryChip` | Pressable category filter chip with gradient border | `label`, `selected`, `onPress`, `emoji` |
| `FilterChipBar` | Horizontally scrollable row of CategoryChips | `options` (`{id, label, emoji}[]`), `selected`, `onSelect` |
| `IconInfoRow` | Gradient label with a value underneath | `icon`, `label`, `value` |
| `InfoRow` | Key/value row with label left, value right | `label`, `value`, `valueColor`, `last` |
| `AttendeeAvatarStack` | Overlapping row of attendee avatars with "+N" overflow | `avatars` (string[]), `count`, `size`, `overlap` |
| `GreetingHeader` | Time-aware greeting ("Good morning, Name 👋") | `name`, `subtitle` |
| `NotificationBell` | Bell icon button with Badge overlay | `unreadCount`, `onPress` |
| `CartButton` | Bag icon button with Badge overlay | `itemCount`, `onPress` |
| `MenuGroup` | Groups MenuRow children under an optional section title | `title`, `children` |
| `MenuRow` | Settings/profile row with icon, label, chevron | `icon`, `label`, `description`, `onPress`, `destructive`, `showChevron` |

### Organisms (`components/ui/organisms/`)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `GradientButton` | Primary CTA button with gradient background and haptic feedback | `onPress`, `children`, `loading`, `disabled`, `size` (`sm` · `md` · `lg`), `fullWidth` |
| `OutlinedButton` | Secondary button with colored outline border | `onPress`, `children`, `loading`, `disabled`, `size`, `color` (`primary` · `accent` · `error`) |
| `ScreenHeader` | Top navigation bar with back button, title, and action slots | `title`, `subtitle`, `onBack`, `rightActions`, `transparent` |
| `HeroEventCard` | Large hero-sized event card with gradient overlay and attendees | `event`, `onPress`, `attendeeAvatars`, `attendeeCount`, `activeIndex`, `total` |
| `EventListCard` | Compact horizontal event card for list views | `event`, `onPress` |
| `EventGridCard` | Half-width event card for 2-column grid layouts | `event`, `onPress` |
| `EventCarouselCard` | Swipeable carousel event card with favourite toggle | `event`, `onPress`, `attendeeCount`, `attendeeAvatars`, `activeIndex` (SharedValue) |
| `FeaturedCarousel` | Horizontal carousel with snap scrolling and animated scaling | `events` (Event[]), `onEventPress` |
| `AnnouncementBanner` | Dismissable announcement banner with priority-based styling | `announcement`, `onDismiss`, `onPress` |
| `CartSummaryBar` | Sticky bottom bar with cart total and checkout CTA | `itemCount`, `total`, `onCheckout`, `storeName` |

### UI Primitives (`components/ui/`)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Avatar` | Circular avatar with image support and initials fallback | `imageUrl`, `name`, `size` (`xs` · `sm` · `md` · `lg` · `xl`) |
| `BottomSheet` | Modal bottom sheet with gesture dismissal and blur backdrop | `visible`, `onClose`, `children`, `variant` (`action` · `select` · `preview`), `title` |
| `Button` | Multi-variant button with gradient primary and loading state | `onPress`, `children`, `variant`, `size`, `loading`, `disabled`, `icon`, `fullWidth` |
| `Card` | Themed card container with optional press handler | `children`, `onPress`, `variant` (`surface` · `elevated`) |
| `EmptyState` | Empty state placeholder with gradient icon and action button | `icon`, `title`, `description`, `actionLabel`, `onAction` |
| `ErrorState` | Error state placeholder with retry button | `message`, `onRetry` |
| `Input` | Animated floating-label text input with error/hint states | `label`, `error`, `hint`, `leftIcon`, + `TextInputProps` |
| `LoadingState` | Centered loading spinner with gradient mask | `message` |
| `SearchBar` | Search input with gradient icon, clear, and filter buttons | `value`, `onChangeText`, `placeholder`, `onClear`, `onFilter`, `filterCount` |
| `SectionHeader` | Section title with optional emoji/icon and action link | `title`, `emoji`, `icon`, `actionLabel`, `onAction` |
| `StatusBadge` | Semantic status badge with variant-based coloring | `label`, `variant` (`warning` · `success` · `error` · `pending` · `completed` · `info`) |

### Cards (`components/cards/`)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `MenuItemCard` | Food/drink menu item with image, price (ZAR), and quantity | `item` (MenuItem), `onPress`, `quantity` |
| `NotificationCard` | Notification with type-based icon, relative time, unread indicator | `notification` (Notification), `onPress` |
| `OrderCard` | Order summary with status badge, store name, and total | `order` (Order), `storeName`, `onPress` |
| `PollCard` | Interactive poll with vote counts/percentages and active/closed state | `poll` (Poll), `selectedOptionId`, `onVote`, `onPress` |
| `VendorCard` | Vendor/store card with logo, name, and status badge | `store` (StorePublic), `onPress` |

### Display (`components/display/`)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `EventHero` | Full-bleed event hero image with gradient overlay | `event` (EventWithOrganiser), `style` |
| `OrderTimeline` | Vertical step-by-step order progress timeline | `currentStatus` (OrderStatus), `style` |
| `QRCodeDisplay` | QR code via react-native-qrcode-svg with optional label | `value`, `size`, `label`, `style` |

### Layout (`components/layout/`)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `ProfileHeader` | User profile header with avatar, name, and edit button | `user` (Profile \| null), `onEditPress` |
| `Screen` | Root screen wrapper with safe area and themed background | `children`, `scrollable`, `style`, `edges`, `withOrbs` |

### Navigation (`components/navigation/`)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `WavyTabBar` | Custom animated bottom tab bar with SVG wavy notch | Accepts `BottomTabBarProps`; route icons mapped by name |

### Utilities (`components/utils/`)

| Export | Description |
|--------|-------------|
| `getInitials(name)` | Extracts uppercase initials ("John Doe" → "JD") |
| `formatCurrency(amount)` | Formats as ZAR currency ("R 49.99") |
| `formatRelative(date)` | Relative time string ("2 days ago") via date-fns |
| `formatDate(date)` | Formats as "dd MMM yyyy" ("15 Mar 2026") |
| `getCategoryLabel(category)` | Maps slug to display label ("food" → "Food & Drink") |
| `getOrderStatusLabel(status)` | Maps OrderStatus to readable label ("pending" → "Pending") |
| `ORDER_TIMELINE_STEPS` | Ordered status array: pending → confirmed → preparing → ready → collected |

## Theme Tokens

All tokens are exported from `theme/tokens.ts` as `const` objects.

| Token | Type | Contents |
|-------|------|----------|
| `colors` | Object | `background`, `surface`, `elevated`, `border`, `textPrimary`, `textSecondary`, `textTertiary`, `textInverse`, `primary`, `accent`, `gradientStart`, `gradientEnd`, `status` (warning/success/error/pending/completed/info — each with `bg`, `border`, `text`) |
| `gradients` | Object | `primary`, `primaryReversed`, `card`, `subtle`, `hero` — each a `[string, string]` color array |
| `spacing` | Object | `xs` (4), `sm` (8), `md` (12), `lg` (16), `xl` (20), `2xl` (24), `3xl` (32), `4xl` (48) |
| `radius` | Object | `sm` (8), `md` (12), `lg` (16), `xl` (24), `full` (9999) |
| `typography` | Object | `display`, `h1`, `h2`, `h3`, `bodyLg`, `body`, `label`, `caption` — each with `size`, `lineHeight`, `weight` |
| `shadows` | Object | `xs`, `sm`, `lg`, `glowPrimary` (blue glow), `glowAccent` (teal glow) |

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
