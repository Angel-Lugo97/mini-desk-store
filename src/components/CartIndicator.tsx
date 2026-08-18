import {
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
    <View style={styles.container}>
      <Text style={styles.label}>
        Cart
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {totalItems}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
