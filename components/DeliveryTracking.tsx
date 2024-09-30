import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Alert } from 'react-native';

import axios from 'axios';


const DeliveryTracking = () => {
  const [agentId, setAgentId] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  const [deliveries, setDeliveries] = useState<any[]>([]);

  const handleTrackDeliveries = async () => {
    // First check if the agent exists
    try {
      const agentResponse = await axios.get(`http://localhost:8080/api/delivery-agents/${agentId}`);
      if (agentResponse.status === 200) {
        const foundAgent = agentResponse.data;

        console.log(foundAgent);

        // If the agent exists, fetch their deliveries
        const deliveriesResponse = await axios.get(`http://localhost:8080/api/deliveries/agent/${agentId}`);

        if (deliveriesResponse.status === 200) {
          setDeliveries(deliveriesResponse.data);
          console.log(deliveries);
          setSelectedAgent(foundAgent); // Store the agent info
        } else {
          Alert.alert('Error', 'No deliveries found for this agent.');
          setDeliveries([]);
          setSelectedAgent(null);
        }
      } else {
        Alert.alert('Error', 'Delivery agent not found.');
        setSelectedAgent(null);
      }
    } catch (error) {
      console.error("Error fetching agent or deliveries:", error);
      Alert.alert('Error', 'Something went wrong while fetching the agent or deliveries.');
      setSelectedAgent(null);
    }

  };

  const renderDeliveryItem = ({ item }: { item: any }) => {
    return (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontWeight: 'bold' }}>Customer: {item.customerName}</Text>
            <Text>Expected Delivery Date: {item.expectedDateOfDelivery}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Address: {item.customerAddress}</Text>
            <Text>Mobile: {item.customerMobileNumber}</Text>
        </View>
    );
};

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
          <Text style={styles.agentId}>Agent Name: {selectedAgent.agentName}</Text>
          <FlatList
            data={deliveries} // Use deliveries state to show the list
            keyExtractor={(deliveryItem) => deliveryItem.deliveryId.toString()} // Ensure deliveryId is a string
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
