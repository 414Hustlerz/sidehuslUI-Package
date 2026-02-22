import { View, Modal, Text, ScrollView, Dimensions, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useEffect, type ReactNode } from 'react';
import { colors, radius, gradients } from '../../theme/tokens';
import { GradientButton } from './organisms/GradientButton';
import { OutlinedButton } from './organisms/OutlinedButton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = 80;

export type BottomSheetVariant = 'action' | 'select' | 'preview';

export interface BottomSheetCTA {
  label: string;
  onPress: () => void;
  type?: 'gradient' | 'outlined';
  loading?: boolean;
  disabled?: boolean;
}

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: BottomSheetVariant;
  title?: string;
  showTitle?: boolean;
  showHandle?: boolean;
  ctaButton?: BottomSheetCTA;
  /** Expand sheet to near-full screen height */
  fullScreen?: boolean;
}

export function BottomSheet({
  visible,
  onClose,
  title,
  children,
  variant = 'action',
  showTitle,
  showHandle,
  ctaButton,
  fullScreen,
}: BottomSheetProps) {
  const isPreview = variant === 'preview';
  const resolvedFullScreen = fullScreen ?? isPreview;
  const resolvedShowHandle = showHandle ?? true;
  const resolvedShowTitle = showTitle ?? !isPreview;
  const translateY = useSharedValue(0);

  // Reset position when sheet opens
  useEffect(() => {
    if (visible) {
      translateY.value = 0;
    }
  }, [visible]);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((e) => {
      translateY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_THRESHOLD) {
        // Slide off-screen, then close the modal after animation completes
        translateY.value = withTiming(SCREEN_HEIGHT, {
          duration: 250,
          easing: Easing.out(Easing.cubic),
        });
        setTimeout(onClose, 260);
      } else {
        // Snap back
        translateY.value = withSpring(0, { damping: 25, stiffness: 400 });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Content padding based on variant + CTA presence
  const contentPaddingBottom = isPreview ? 0 : ctaButton ? 8 : 32;
  const hasTitle = resolvedShowTitle && !!title;
  const contentPaddingTop = !hasTitle && resolvedShowHandle && !isPreview ? 36 : 0;

  const CTAButton = ctaButton?.type === 'outlined' ? OutlinedButton : GradientButton;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable
        style={{ height: resolvedFullScreen ? 60 : undefined, flex: resolvedFullScreen ? undefined : 1 }}
        onPress={onClose}
      >
        <BlurView
          intensity={20}
          tint="dark"
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}
        />
      </Pressable>

      {/* Sheet */}
      <Animated.View
        style={[
          {
            flex: resolvedFullScreen ? 1 : undefined,
            maxHeight: resolvedFullScreen ? SCREEN_HEIGHT - 60 : undefined,
            backgroundColor: colors.surface,
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
            borderTopWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden',
          },
          sheetStyle,
        ]}
      >
        {/* Swipeable drag handle — floats on top of content */}
        {resolvedShowHandle && (
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                alignItems: 'center',
                paddingTop: 12,
                paddingBottom: 14,
              }}
            >
              <MaskedView
                maskElement={
                  <Svg width={44} height={10} viewBox="0 0 44 10">
                    <Path
                      d="M2 2 L22 8 L42 2"
                      stroke="black"
                      strokeWidth={5.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </Svg>
                }
              >
                <LinearGradient
                  colors={gradients.primary as unknown as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ width: 44, height: 10 }}
                />
              </MaskedView>
            </Animated.View>
          </GestureDetector>
        )}

        {resolvedShowTitle && title && (
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: '600',
              lineHeight: 26,
              textAlign: 'center',
              marginTop: 36,
              marginBottom: 16,
              paddingHorizontal: 16,
            }}
          >
            {title}
          </Text>
        )}

        {resolvedFullScreen ? (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingTop: contentPaddingTop, paddingBottom: ctaButton ? 8 : 40 }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={{ paddingTop: contentPaddingTop, paddingHorizontal: isPreview ? 0 : 16, paddingBottom: contentPaddingBottom }}>
            {children}
          </View>
        )}

        {/* Pinned CTA footer */}
        {ctaButton && (
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 34,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            <CTAButton
              onPress={ctaButton.onPress}
              loading={ctaButton.loading}
              disabled={ctaButton.disabled}
            >
              {ctaButton.label}
            </CTAButton>
          </View>
        )}
      </Animated.View>
    </Modal>
  );
}
