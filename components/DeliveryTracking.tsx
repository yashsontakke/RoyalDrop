import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const inventory = [
  { sku: 'SKU-1234', productName: 'Product 1' },
  { sku: 'SKU-5678', productName: 'Product 2' },
  { sku: 'SKU-91011', productName: 'Product 3' },
  { sku: 'SKU-12131', productName: 'Product 4' },
  { sku: 'SKU-41516', productName: 'Product 5' },
];


const DeliveryTracking = () => {
  // Simulated delivery tracking data
  const deliveries = inventory.map((item, index) => ({
    id: index,
    sku: item.sku || `SKU-${index + 1}`,
    deliveryAgent: `Agent ${index + 1}`,
    status: 'Delivered', // You can make this dynamic
  }));

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text>SKU: {item.sku}</Text>
      <Text>Delivery Agent: {item.deliveryAgent}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delivery Tracking</Text>
      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
});

export default DeliveryTracking;
