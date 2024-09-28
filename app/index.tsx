import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

const HomePage = () => {
  return (
    <View>
      <Text>Welcome to DLVery Logistics</Text>
      <Link href="/login">
        <Button title="Login" />
      </Link>
      <Link href="/inventory">
        <Button title="Go to Inventory" />
      </Link>
      <Link href="/delivery">
        <Button title="Go to Delivery" />
      </Link>
    </View>
  );
};

export default HomePage;