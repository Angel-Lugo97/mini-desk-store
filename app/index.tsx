import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { ProductCard } from '../src/components/ProductCard';
import { useProducts } from '../src/hooks/useProducts';

export default function ProductsScreen() {
    const {
        data: products,
        error,
        isError,
        isFetching,
        isLoading,
        refetch,
    } = useProducts();

    if (isLoading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator
                    size="large"
                    color="#2563eb"
                />

                <Text style={styles.statusText}>
                    Loading products...
                </Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.errorTitle}>
                    Unable to load products
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

    return (
        <View style={styles.container}>
            <FlatList
                data={products ?? []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard product={item} />
                )}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No products available.
                    </Text>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        padding: 24,
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    separator: {
        height: 12,
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
    emptyText: {
        marginTop: 40,
        color: '#6b7280',
        fontSize: 16,
        textAlign: 'center',
    },
});