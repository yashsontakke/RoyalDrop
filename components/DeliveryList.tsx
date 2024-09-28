import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const DeliveryList = () => {
    const deliveries = [
        { id: '1', item: 'Package A', status: 'Pending' },
        { id: '2', item: 'Package B', status: 'Delivered' },
        { id: '3', item: 'Package C', status: 'In Transit' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Delivery List</Text>
            <FlatList
                data={deliveries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.item} - Status: {item.status}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, marginBottom: 20 },
    item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default DeliveryList;