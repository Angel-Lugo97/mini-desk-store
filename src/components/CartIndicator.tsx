import { router } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useCartStore } from '../store/cartStore';

export function CartIndicator() {
  const totalItems = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={() => router.navigate('/cart')}
      accessibilityRole="button"
      accessibilityLabel={`Open cart with ${totalItems} items`}
    >
      <Text style={styles.label}>
        Cart
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {totalItems}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
  badge: {
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    paddingHorizontal: 6,
    backgroundColor: '#2563eb',
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
