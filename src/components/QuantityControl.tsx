import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          quantity === 0 && styles.disabledButton,
          pressed && quantity > 0 && styles.pressedButton,
        ]}
        onPress={onDecrement}
        disabled={quantity === 0}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
      >
        <Text style={styles.buttonText}>−</Text>
      </Pressable>

      <Text style={styles.quantity}>
        {quantity}
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressedButton,
        ]}
        onPress={onIncrement}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  button: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  pressedButton: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  quantity: {
    minWidth: 44,
    color: '#111827',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
