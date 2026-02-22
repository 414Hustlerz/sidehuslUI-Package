import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ReactNode } from 'react';
import { colors } from '../../theme/tokens';

interface ScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  style?: object;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  withOrbs?: boolean;
}

export function Screen({
  children,
  scrollable = false,
  style,
  edges,
  withOrbs = false,
}: ScreenProps) {
  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ flex: 1 }}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      {withOrbs && (
        <View style={styles.orbContainer} pointerEvents="none">
          {/* Top-left orb */}
          <View
            style={{
              position: 'absolute',
              top: -80,
              left: -80,
              width: 260,
              height: 260,
              borderRadius: 130,
              backgroundColor: 'rgba(0, 102, 204, 0.12)',
            }}
          />
          {/* Bottom-right orb */}
          <View
            style={{
              position: 'absolute',
              bottom: 100,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: 'rgba(0, 201, 177, 0.08)',
            }}
          />
        </View>
      )}
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  orbContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
});
