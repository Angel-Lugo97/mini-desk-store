import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Stack } from 'expo-router';

import { CartIndicator } from '../src/components/CartIndicator';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="catalog"
          options={{
            title: 'Mini Desk Store',
            headerRight: () => <CartIndicator />,
          }}
        />

        <Stack.Screen
          name="product/[id]"
          options={{
            title: 'Product Details',
            headerRight: () => <CartIndicator />,
          }}
        />

        <Stack.Screen
          name="cart"
          options={{
            title: 'Shopping Cart',
          }}
        />

        <Stack.Screen
          name="checkout"
          options={{
            title: 'Checkout',
          }}
        />

        <Stack.Screen
          name="success"
          options={{
            title: 'Order Complete',
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
