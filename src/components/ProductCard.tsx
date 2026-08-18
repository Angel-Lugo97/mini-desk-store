import { router } from 'expo-router';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useCartStore } from '../store/cartStore';
import type { Product } from '../types/product';
import { QuantityControl } from './QuantityControl';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({
  product,
}: ProductCardProps) {
  const quantity = useCartStore(
    (state) =>
      state.items.find(
        (item) => item.product.id === product.id,
      )?.quantity ?? 0,
  );

  const increment = useCartStore(
    (state) => state.increment,
  );

  const decrement = useCartStore(
    (state) => state.decrement,
  );

  const openProductDetail = () => {
    router.push({
      pathname: '/product/[id]',
      params: {
        id: product.id.toString(),
      },
    });
  };

  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [
          styles.productInfo,
          pressed && styles.productInfoPressed,
        ]}
        onPress={openProductDetail}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${product.title}`}
      >
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.content}>
          <Text style={styles.category}>
            {product.category}
          </Text>

          <Text
            style={styles.title}
            numberOfLines={2}
          >
            {product.title}
          </Text>

          <Text style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>

          <Text style={styles.rating}>
            ★ {product.rating.rate.toFixed(1)} ({product.rating.count})
          </Text>

          <Text style={styles.detailsText}>
            View details
          </Text>
        </View>
      </Pressable>

      <View style={styles.quantityContainer}>
        <QuantityControl
          quantity={quantity}
          onIncrement={() => increment(product)}
          onDecrement={() => decrement(product.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  productInfo: {
    flexDirection: 'row',
  },
  productInfoPressed: {
    opacity: 0.7,
  },
  image: {
    width: 100,
    height: 120,
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  category: {
    marginBottom: 6,
    color: '#6b7280',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 8,
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    marginBottom: 6,
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
  },
  rating: {
    color: '#6b7280',
    fontSize: 14,
  },
  detailsText: {
    marginTop: 8,
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  quantityContainer: {
    alignItems: 'flex-end',
  },
});
