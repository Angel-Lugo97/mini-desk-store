import { router } from 'expo-router';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { QuantityControl } from '../src/components/QuantityControl';
import { useCartStore } from '../src/store/cartStore';
import type { CartItem } from '../src/types/cart';

export default function CartScreen() {
  const items = useCartStore(
    (state) => state.items,
  );

  const increment = useCartStore(
    (state) => state.increment,
  );

  const decrement = useCartStore(
    (state) => state.decrement,
  );

  const remove = useCartStore(
    (state) => state.remove,
  );

  const total = items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0,
  );

  const renderCartItem = ({
    item,
  }: {
    item: CartItem;
  }) => {
    const subtotal =
      item.product.price * item.quantity;

    return (
      <View style={styles.itemCard}>
        <Text
          style={styles.itemTitle}
          numberOfLines={2}
        >
          {item.product.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.label}>
            Unit price
          </Text>

          <Text style={styles.value}>
            ${item.product.price.toFixed(2)}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.label}>
            Quantity
          </Text>

          <Text style={styles.value}>
            {item.quantity}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.subtotalLabel}>
            Subtotal
          </Text>

          <Text style={styles.subtotal}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.actions}>
          <QuantityControl
            quantity={item.quantity}
            onIncrement={() =>
              increment(item.product)
            }
            onDecrement={() =>
              decrement(item.product.id)
            }
          />

          <Pressable
            style={({ pressed }) => [
              styles.removeButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() =>
              remove(item.product.id)
            }
            accessibilityRole="button"
            accessibilityLabel={`Remove ${item.product.title} from cart`}
          >
            <Text style={styles.removeButtonText}>
              Remove
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Your cart is empty
        </Text>

        <Text style={styles.emptyMessage}>
          Add products from the catalog to see them here.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.navigate('/')}
          accessibilityRole="button"
          accessibilityLabel="Continue shopping"
        >
          <Text style={styles.primaryButtonText}>
            Continue shopping
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) =>
          item.product.id.toString()
        }
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.summary}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Total
              </Text>

              <Text style={styles.totalValue}>
                ${total.toFixed(2)}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.checkoutButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push('/checkout')}
              accessibilityRole="button"
              accessibilityLabel="Proceed to checkout"
            >
              <Text style={styles.checkoutButtonText}>
                Proceed to Checkout
              </Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 12,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  itemTitle: {
    marginBottom: 16,
    color: '#111827',
    fontSize: 17,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#6b7280',
    fontSize: 14,
  },
  value: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  subtotalLabel: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  subtotal: {
    color: '#2563eb',
    fontSize: 17,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  removeButton: {
    minHeight: 38,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dc2626',
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  removeButtonText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  summary: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 20,
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
  checkoutButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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
