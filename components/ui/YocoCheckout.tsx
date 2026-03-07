import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/tokens';

interface YocoCheckoutProps {
  checkoutUrl: string;
  onCompleted: () => void;
  onCancelled: () => void;
  onFailed: (error?: string) => void;
}

export function YocoCheckout({ checkoutUrl, onCompleted, onCancelled, onFailed }: YocoCheckoutProps) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  const handleClose = () => {
    Alert.alert('Cancel payment?', 'Your payment will not be processed.', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', style: 'destructive', onPress: onCancelled },
    ]);
  };

  const handleNavigation = (navState: { url: string }) => {
    const url = navState.url;

    if (url.includes('sidehusl://payment-result') || url.includes('payment-result')) {
      const params = new URLSearchParams(url.split('?')[1] ?? '');
      const status = params.get('status');

      if (status === 'success') {
        onCompleted();
      } else if (status === 'cancelled') {
        onCancelled();
      } else if (status === 'failed') {
        onFailed(params.get('message') ?? undefined);
      }
      return false;
    }
    return true;
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity onPress={handleClose} hitSlop={12}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={{ color: colors.textPrimary, fontSize: 16, fontWeight: '600' }}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: checkoutUrl }}
        javaScriptEnabled
        domStorageEnabled
        cacheEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        key="checkout-webview"
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigation}
        onShouldStartLoadWithRequest={(request: { url: string }) => handleNavigation(request)}
        onError={() => onFailed('Failed to load checkout')}
        style={{ flex: 1 }}
      />

      {loading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={{ color: colors.textSecondary, fontSize: 14, marginTop: 12 }}>Loading checkout...</Text>
        </View>
      )}
    </View>
  );
}
