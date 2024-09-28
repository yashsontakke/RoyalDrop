import React from 'react';
import { View, Text } from 'react-native';
import DeliveryList from '../../components/DeliveryList';

const DeliveryPage = () => {
  return (
    <View>
      <Text>Today's Delivery List</Text>
      <DeliveryList />
    </View>
  );
};

export default DeliveryPage;