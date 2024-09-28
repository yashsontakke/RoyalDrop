import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Reports = () => {
  // Simulated reports data
  const reports = [
    { id: '1', title: 'Goods Delivered in Last 30 Days', count: 120 },
    { id: '2', title: 'Damaged Goods in Transit', count: 5 },
    { id: '3', title: 'Pending Deliveries', count: 15 },
  ];

  const renderItem = ({ item }: { item: { title: string; count: number } }) => (
    <View style={styles.item}>
      <Text>{item.title}: {item.count}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
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

export default Reports;
