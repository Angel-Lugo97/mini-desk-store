import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useCartStore } from '../src/store/cartStore';

export default function CheckoutScreen() {
  const items = useCartStore(
    (state) => state.items,
  );

  const clearCart = useCartStore(
    (state) => state.clearCart,
  );

  const markCheckoutCompleted = useCartStore(
    (state) => state.markCheckoutCompleted,
  );

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const total = items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0,
  );

  const handleConfirmPayment = () => {
    if (items.length === 0) {
      return;
    }

    clearCart();
    markCheckoutCompleted();

    router.replace('/success');
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Checkout unavailable
        </Text>

        <Text style={styles.emptyMessage}>
          Your cart is empty. Add at least one product before checking out.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.replace('/cart')}
          accessibilityRole="button"
          accessibilityLabel="Return to cart"
        >
          <Text style={styles.primaryButtonText}>
            Return to Cart
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Order Summary
      </Text>

      <Text style={styles.description}>
        Review your order before confirming the mock payment.
      </Text>

      <View style={styles.summaryCard}>
        {items.map((item) => {
          const subtotal =
            item.product.price * item.quantity;

          return (
            <View
              key={item.product.id}
              style={styles.productRow}
            >
              <View style={styles.productInfo}>
                <Text
                  style={styles.productTitle}
                  numberOfLines={2}
                >
                  {item.product.title}
                </Text>

                <Text style={styles.productQuantity}>
                  {item.quantity} × ${item.product.price.toFixed(2)}
                </Text>
              </View>

              <Text style={styles.productSubtotal}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>
          );
        })}

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Items
          </Text>

          <Text style={styles.infoValue}>
            {totalItems}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.totalValue}>
            ${total.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.paymentCard}>
        <Text style={styles.paymentTitle}>
          Mock Payment
        </Text>

        <Text style={styles.paymentText}>
          No real payment will be processed. This action only simulates a successful checkout.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.confirmButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleConfirmPayment}
        accessibilityRole="button"
        accessibilityLabel="Confirm mock payment"
      >
        <Text style={styles.confirmButtonText}>
          Confirm Payment
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 8,
    color: '#111827',
    fontSize: 26,
    fontWeight: '700',
  },
  description: {
    marginBottom: 24,
    color: '#6b7280',
    fontSize: 15,
    lineHeight: 22,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productInfo: {
    flex: 1,
    marginRight: 16,
  },
  productTitle: {
    marginBottom: 4,
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
  productQuantity: {
    color: '#6b7280',
    fontSize: 13,
  },
  productSubtotal: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginBottom: 16,
    backgroundColor: '#e5e7eb',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#6b7280',
    fontSize: 15,
  },
  infoValue: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
  },
  totalValue: {
    color: '#2563eb',
    fontSize: 24,
    fontWeight: '700',
  },
  paymentCard: {
    marginTop: 20,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    padding: 16,
  },
  paymentTitle: {
    marginBottom: 6,
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '700',
  },
  paymentText: {
    color: '#1e40af',
    fontSize: 14,
    lineHeight: 20,
  },
  confirmButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  emptyTitle: {
    marginBottom: 8,
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyMessage: {
    marginBottom: 24,
    color: '#6b7280',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  primaryButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
