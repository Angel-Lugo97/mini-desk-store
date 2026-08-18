import { useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { QuantityControl } from '../../src/components/QuantityControl';
import { useProduct } from '../../src/hooks/useProduct';
import { useCartStore } from '../../src/store/cartStore';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const parsedId = Number(id);

  const productId =
    Number.isInteger(parsedId) && parsedId > 0
      ? parsedId
      : undefined;

  const {
    data: product,
    error,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useProduct(productId);

  const quantity = useCartStore(
    (state) =>
      state.items.find(
        (item) => item.product.id === productId,
      )?.quantity ?? 0,
  );

  const increment = useCartStore(
    (state) => state.increment,
  );

  const decrement = useCartStore(
    (state) => state.decrement,
  );

  if (productId === undefined) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorTitle}>
          Invalid product
        </Text>

        <Text style={styles.errorMessage}>
          The product ID is not valid.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator
          size="large"
          color="#2563eb"
        />

        <Text style={styles.statusText}>
          Loading product...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorTitle}>
          Unable to load product
        </Text>

        <Text style={styles.errorMessage}>
          {error instanceof Error
            ? error.message
            : 'An unexpected error occurred.'}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed,
          ]}
          onPress={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.retryButtonText}>
              Try again
            </Text>
          )}
        </Pressable>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorTitle}>
          Product not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.category}>
        {product.category}
      </Text>

      <Text style={styles.title}>
        {product.title}
      </Text>

      <Text style={styles.price}>
        ${product.price.toFixed(2)}
      </Text>

      <Text style={styles.rating}>
        ★ {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
      </Text>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>
        Description
      </Text>

      <Text style={styles.description}>
        {product.description}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>
        Quantity
      </Text>

      <QuantityControl
        quantity={quantity}
        onIncrement={() => increment(product)}
        onDecrement={() => decrement(product.id)}
      />
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
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  category: {
    marginBottom: 8,
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 12,
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  price: {
    marginBottom: 8,
    color: '#111827',
    fontSize: 26,
    fontWeight: '700',
  },
  rating: {
    color: '#6b7280',
    fontSize: 15,
  },
  divider: {
    height: 1,
    marginVertical: 24,
    backgroundColor: '#e5e7eb',
  },
  sectionTitle: {
    marginBottom: 10,
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 24,
  },
  statusText: {
    marginTop: 12,
    color: '#4b5563',
    fontSize: 16,
  },
  errorTitle: {
    marginBottom: 8,
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorMessage: {
    marginBottom: 20,
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  retryButton: {
    minWidth: 120,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  retryButtonPressed: {
    opacity: 0.8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
