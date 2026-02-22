import { View, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, gradients } from '../../theme/tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 70;
const WAVE_WIDTH = 80;
const WAVE_HEIGHT = 44; // deeper valley

// Must be module-level — do not create inside a component
const AnimatedPath = Animated.createAnimatedComponent(Path);

const TAB_ICONS: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  index:     { active: 'home',    inactive: 'home' },
  search:    { active: 'search',  inactive: 'search' },
  favorites: { active: 'heart',   inactive: 'heart' },
  orders:    { active: 'receipt', inactive: 'receipt' },
  profile:   { active: 'person',  inactive: 'person' },
};

const TAB_LABELS: Record<string, string> = {
  index:     'Home',
  search:    'Search',
  favorites: 'Favorites',
  orders:    'Orders',
  profile:   'Profile',
};

// 'worklet' directive lets this run on the UI thread inside useAnimatedProps
function buildWavePath(cx: number, barHeight: number): string {
  'worklet';
  const halfWave = WAVE_WIDTH / 2;
  const curve = WAVE_HEIGHT;
  return (
    'M 0 0 ' +
    'L ' + (cx - halfWave - 20) + ' 0 ' +
    'C ' + (cx - halfWave - 10) + ' 0 ' + (cx - halfWave) + ' ' + curve + ' ' + cx + ' ' + curve + ' ' +
    'C ' + (cx + halfWave) + ' ' + curve + ' ' + (cx + halfWave + 10) + ' 0 ' + (cx + halfWave + 20) + ' 0 ' +
    'L ' + SCREEN_WIDTH + ' 0 ' +
    'L ' + SCREEN_WIDTH + ' ' + barHeight + ' ' +
    'L 0 ' + barHeight + ' Z'
  );
}

function getTabCenter(index: number, tabCount: number): number {
  const tabWidth = SCREEN_WIDTH / tabCount;
  return tabWidth * index + tabWidth / 2;
}

export function WavyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const tabCount = state.routes.length;
  const tabWidth = SCREEN_WIDTH / tabCount;
  const barHeight = TAB_BAR_HEIGHT + insets.bottom;

  const waveX = useSharedValue(getTabCenter(state.index, tabCount));

  useEffect(() => {
    waveX.value = withSpring(getTabCenter(state.index, tabCount), {
      mass: 1,
      damping: 18,
      stiffness: 130,
    });
  }, [state.index]);

  // Runs on UI thread — reacts to waveX changes without going through JS bridge
  const animatedWaveProps = useAnimatedProps(() => ({
    d: buildWavePath(waveX.value, barHeight),
  }));

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: barHeight,
        backgroundColor: 'transparent',
      }}
    >
      {/* Animated SVG wave background */}
      <Svg
        width={SCREEN_WIDTH}
        height={barHeight}
        style={{ position: 'absolute', top: 0 }}
      >
        <AnimatedPath
          animatedProps={animatedWaveProps}
          fill={colors.surface}
        />
      </Svg>

      {/* Tab items */}
      <View
        style={{
          flexDirection: 'row',
          height: TAB_BAR_HEIGHT,
          alignItems: 'flex-end',
          paddingBottom: 8,
        }}
      >
        {state.routes.map((route: { key: string; name: string }, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconSet = TAB_ICONS[route.name] ?? { active: 'ellipse', inactive: 'ellipse-outline' };
          const label = TAB_LABELS[route.name] ?? route.name;

          return (
            <TabItem
              key={route.key}
              width={tabWidth}
              isFocused={isFocused}
              iconName={isFocused ? iconSet.active : iconSet.inactive}
              label={label}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

interface TabItemProps {
  width: number;
  isFocused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

function TabItem({ width, isFocused, iconName, label, onPress }: TabItemProps) {
  const translateY = useSharedValue(isFocused ? -24 : 0);
  const scale = useSharedValue(isFocused ? 1.1 : 1);

  useEffect(() => {
    translateY.value = withSpring(isFocused ? -24 : 0, {
      mass: 0.8,
      damping: 14,
      stiffness: 140,
    });
    scale.value = withSpring(isFocused ? 1.1 : 1, {
      mass: 0.8,
      damping: 14,
      stiffness: 140,
    });
  }, [isFocused]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width, alignItems: 'center', justifyContent: 'center', height: 62 }}
      activeOpacity={0.8}
    >
      <Animated.View style={animStyle}>
        {isFocused ? (
          <LinearGradient
            colors={gradients.primary as unknown as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Ionicons name={iconName} size={28} color="#FFFFFF" />
          </LinearGradient>
        ) : (
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name={iconName} size={28} color={colors.textTertiary} />
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}
