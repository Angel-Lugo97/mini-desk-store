import { router, Stack } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function WelcomeScreen() {
  const handleEnterCatalog = () => {
    router.replace('/catalog');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <View style={styles.brandContainer}>
          <Text style={styles.brand}>MINI DESK STORE</Text>

          <Text style={styles.title}>
            Welcome to your store
          </Text>

          <Text style={styles.description}>
            Discover products selected for your everyday needs.
          </Text>
        </View>

        <Pressable
          onPress={handleEnterCatalog}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            Go to Catalog
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7fb',
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 48,
  },

  brandContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  brand: {
    marginBottom: 12,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#4f46e5',
  },

  title: {
    maxWidth: 300,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '700',
    color: '#111827',
  },

  description: {
    maxWidth: 320,
    marginTop: 18,
    fontSize: 17,
    lineHeight: 25,
    color: '#6b7280',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: '#4f46e5',
    paddingHorizontal: 24,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
