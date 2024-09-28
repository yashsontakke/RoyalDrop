import React from 'react';
import { View, Text } from 'react-native';
import Inventory from '../../components/Inventory';

const InventoryPage = () => {
  return (
    <View>
      <Text>Inventory Management</Text>
      <Inventory />
    </View>
  );
};

export default InventoryPage;