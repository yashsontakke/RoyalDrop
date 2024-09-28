import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { InventoryItem } from '../app/types/InventoryTypes';

  
  const InventoryList: React.FC= () => {
  const renderItem = ({ item }:{ item: InventoryItem }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Product Name: {item.productName}</Text>
      <Text style={styles.itemText}>Category: {item.category}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemText}>Expiry Date: {item.expiryDate}</Text>
      <Text style={styles.itemText}>Status: {item.isDamaged ? 'Damaged' : 'Not Damaged'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory List</Text>
      <FlatList
        data={inventoryData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const inventoryData = [
    {
      id: 1,
      productName: 'Apple',
      category: 'Fruits',
      quantity: 50,
      expiryDate: '2024-10-01',
      isDamaged: false,
    },
    {
      id: 2,
      productName: 'Milk',
      category: 'Dairy',
      quantity: 30,
      expiryDate: '2024-09-15',
      isDamaged: true,
    },
    {
      id: 3,
      productName: 'Bread',
      category: 'Bakery',
      quantity: 20,
      expiryDate: '2024-09-10',
      isDamaged: false,
    },
    // Add more items as needed
  ];
  

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default InventoryList;
