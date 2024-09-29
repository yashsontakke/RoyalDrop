import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Alert } from 'react-native';

const dummyDeliveryRecords = [
    {
        deliveryAgentId: 'A001',
        deliveries: [
            { id: '1', productName: 'Apples', quantity: 20, status: 'Delivered' },
            { id: '2', productName: 'Canned Beans', quantity: 10, status: 'Returned' },
        ],
    },
    {
        deliveryAgentId: 'A002',
        deliveries: [
            { id: '3', productName: 'Milk', quantity: 15, status: 'Delivered' },
            { id: '4', productName: 'Bread', quantity: 5, status: 'Returned' },
        ],
    },
    {
        deliveryAgentId: 'A003',
        deliveries: [
            { id: '5', productName: 'Chicken Breast', quantity: 10, status: 'Delivered' },
            { id: '6', productName: 'Rice', quantity: 25, status: 'Returned' },
        ],
    },
];

const DeliveryTracking = () => {
    const [agentId, setAgentId] = useState('');
    const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

    const handleTrackDeliveries = () => {
        const foundAgent = dummyDeliveryRecords.find((record) => record.deliveryAgentId === agentId);
        if (foundAgent) {
            setSelectedAgent(foundAgent);
        } else {
            Alert.alert('Error', 'Delivery agent not found.');
            setSelectedAgent(null);
        }
    };

    const renderDeliveryItem = ({ item }: { item: any }) => (
        <View style={styles.deliveryItem}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Status: {item.status}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Delivery Tracking</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Delivery Agent ID"
                value={agentId}
                onChangeText={setAgentId}
            />
            <Button title="Track Deliveries" onPress={handleTrackDeliveries} />

            {selectedAgent && (
                <View style={styles.agentContainer}>
                    <Text style={styles.agentId}>Agent ID: {selectedAgent.deliveryAgentId}</Text>
                    <FlatList
                        data={selectedAgent.deliveries}
                        keyExtractor={(deliveryItem) => deliveryItem.id}
                        renderItem={renderDeliveryItem}
                    />
                    <Button title="Clear Selection" onPress={() => setSelectedAgent(null)} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 8,
    },
    agentContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e6f7ff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#b3e0ff',
    },
    agentId: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    deliveryItem: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DeliveryTracking;
