
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native'; // Optional for showing a loading spinner
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api/deliveries'; // Replace with your actual API base URL
const AGENT_ID = 2; // Hardcoded agent ID for now

// Define the delivery type
interface Delivery {
    id: number;
    status: string;
    customerName: string;
    customerAddress: string;
    expectedDateOfDelivery: string;
    productId: number;
    customerMobileNumber: string;
}

const DeliveryAgentDashboard: React.FC = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]); // State to store deliveries
    const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
    const [currentEndpoint, setCurrentEndpoint] = useState<string>('');
    // Function to fetch deliveries from API
    // Function to fetch deliveries using Axios
    const fetchDeliveries = async (endpoint: string) => {
        setLoading(true);
        setCurrentEndpoint(endpoint);
        try {
            const response = await axios.get<Delivery[]>(`${API_BASE_URL}${endpoint}`);
            setDeliveries(response.data);
        } catch (error) {
            console.error('Error fetching deliveries:', error);
            if (axios.isAxiosError(error)) {
                console.error(`Axios error: ${error.message}`);
                alert(`Failed to fetch deliveries: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const changeDeliveryStatus = async (id: number) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/delivery-agents/deliveries/${id}/status`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Failed to update status');
            }

            Alert.alert('Success', 'Delivery status updated to Delivered!');
            fetchDeliveries(currentEndpoint); // Refresh deliveries after update
        } catch (error) {
            console.error('Error updating delivery status:', error);
            Alert.alert('Error', 'Failed to update delivery status.');
        }
    };

    // Render individual delivery item
    const renderDeliveryItem = ({ item }: { item: Delivery }) => (
        <View style={styles.deliveryItem}>
            <Text>Delivery ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Customer: {item.customerName}</Text>
            <Text>Address: {item.customerAddress}</Text>
            <Text>Delivery Date: {item.expectedDateOfDelivery}</Text>
            {/* Add more delivery details as needed */}
            <Text>Mobile Number: {item.customerMobileNumber}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => changeDeliveryStatus(item.id)}
            >
                <Text style={styles.buttonText}>Mark as Delivered</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Delivery Agent Dashboard</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetchDeliveries(`/agent/${AGENT_ID}/today-pending`)}
                >
                    <Text style={styles.buttonText}>Today's Pending Deliveries</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetchDeliveries(`/agent/${AGENT_ID}/other-pending`)}
                >
                    <Text style={styles.buttonText}>Overall Pending Deliveries</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetchDeliveries(`/agent/${AGENT_ID}/delayed`)}
                >
                    <Text style={styles.buttonText}>Delayed Deliveries</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <FlatList
                    data={deliveries}
                    renderItem={renderDeliveryItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.deliveryList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    deliveryList: {
        flex: 1,
    },
    deliveryItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});

export default DeliveryAgentDashboard;
