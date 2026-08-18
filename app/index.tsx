import { StyleSheet, Text, View } from 'react-native';

export default function ProductsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Products</Text>

            <Text style={styles.description}>
                The product catalog will be displayed here.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f7f7f7',
    },
    title: {
        marginBottom: 8,
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#6b7280',
    },
});