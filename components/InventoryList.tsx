import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox'; // Update this line
// Dummy product data

import { InventoryItem } from '../app/types/InventoryTypes';
// Define the props to accept products array
type InventoryListProps = {
  products: InventoryItem[];
};

const InventoryList = ({ products }: InventoryListProps) => {
  const [showPerishable, setShowPerishable] = useState(false);
  const [showDamaged, setShowDamaged] = useState(false);
  const [showExpired, setShowExpired] = useState(false);

    // Function to check if a product is expired based on expiryDate
    const isExpired = (expiryDate: string): boolean => {
      const currentDate = new Date();
      const productExpiryDate = new Date(expiryDate);
      return productExpiryDate < currentDate;
    };

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    let isIncluded = true;
    if (showPerishable) {
      isIncluded = isIncluded && product.isPerishable;
    }
    if (showDamaged) {
      isIncluded = isIncluded && product.isDamaged;
    }
    if (showExpired) {
      isIncluded = isIncluded && isExpired(product.expiryDate);
    }
    return isIncluded;
  });

  return (
    <View style={styles.container}>
    {/* Filter options */}
    <View style={styles.filterOption}>
      <Checkbox value={showPerishable} onValueChange={setShowPerishable} />
      <Text>Perishable</Text>
    </View>
    <View style={styles.filterOption}>
      <Checkbox value={showDamaged} onValueChange={setShowDamaged} />
      <Text>Damaged</Text>
    </View>
    <View style={styles.filterOption}>
      <Checkbox value={showExpired} onValueChange={setShowExpired} />
      <Text>Expired</Text>
    </View>

    {/* Display filtered products */}
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          <Text style={styles.productName}>Product Name: {item.productName}</Text>
          <Text>Category: {item.productCategory}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Expiry Date: {item.expiryDate}</Text>
          <Text>Perishable: {item.isPerishable ? 'Yes' : 'No'}</Text>
          <Text>Damaged: {item.isDamaged ? 'Yes' : 'No'}</Text>
        </View>
      )}
    />
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ensures the container takes full screen height
    padding: 20,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productItem: {
    padding: 15,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InventoryList;
