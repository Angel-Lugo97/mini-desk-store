import {
  Redirect,
  router,
} from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useCartStore } from '../src/store/cartStore';

export default function SuccessScreen() {
  const checkoutCompleted = useCartStore(
    (state) => state.checkoutCompleted,
  );

  const resetCheckout = useCartStore(
    (state) => state.resetCheckout,
  );

  if (!checkoutCompleted) {
    return <Redirect href="/catalog" />;
  }

  const handleContinueShopping = () => {
    resetCheckout();
    router.dismissTo('/catalog');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          ✓
        </Text>
      </View>

      <Text style={styles.title}>
        Payment completed
      </Text>

      <Text style={styles.message}>
        Your mock payment was processed successfully.
      </Text>

      <Text style={styles.secondaryMessage}>
        The cart has been cleared and you can continue shopping.
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleContinueShopping}
        accessibilityRole="button"
        accessibilityLabel="Continue shopping"
      >
        <Text style={styles.buttonText}>
          Continue Shopping
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#dcfce7',
    borderRadius: 40,
  },
  icon: {
    color: '#16a34a',
    fontSize: 44,
    fontWeight: '700',
  },
  title: {
    marginBottom: 12,
    color: '#111827',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  secondaryMessage: {
    marginTop: 8,
    marginBottom: 28,
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  button: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
