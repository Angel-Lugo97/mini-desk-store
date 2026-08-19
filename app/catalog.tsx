import { Stack, router } from 'expo-router';
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
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Welcome to Mini Desk Store
          </Text>

          <Text style={styles.description}>
            Discover our products and find something for your desk.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleEnterCatalog}
        >
          <Text style={styles.buttonText}>
            Browse Catalog
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  textContainer: {
    marginBottom: 40,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },

  description: {
    fontSize: 17,
    lineHeight: 24,
    color: '#6b7280',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
