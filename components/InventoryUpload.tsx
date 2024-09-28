import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';

const InventoryUpload = () => {
  const [fileName, setFileName] = useState('');

  const handleUpload = () => {
    // Logic to handle file upload can be added here
    if (!fileName) {
      Alert.alert('Please enter a valid file name');
      return;
    }
    
    // Simulate file upload
    Alert.alert(`Uploaded ${fileName} successfully!`);
    setFileName(''); // Reset file name after upload
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Inventory File</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter file name"
        value={fileName}
        onChangeText={setFileName}
      />
      <Button title="Upload" onPress={handleUpload} />
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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default InventoryUpload;
