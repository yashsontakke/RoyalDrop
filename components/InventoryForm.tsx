import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox'; // Update this line

  
const InventoryForm = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [isPerishable, setIsPerishable] = useState(false);
  const [isDamaged, setIsDamaged] = useState(false);
  const [file, setFile] = useState(null); // Note: Handling file uploads may vary in React Native

  const handleFileChange = () => {
    // Handle file selection (for React Native, consider using libraries like react-native-document-picker)
    Alert.alert("File selection not implemented");
  };
  
  const handleSubmit = () => {
    const inventoryData = {
      productName,
      productCategory,
      quantity,
      expiryDate,
      isPerishable,
      isDamaged,
      file,
    };

    // Submit the form data
    console.log('Inventory Data Submitted:', inventoryData);
    // Here you would typically make an API call to save this data
    Alert.alert("Inventory Data Submitted", JSON.stringify(inventoryData));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory Form</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}

      />

      <Picker
        selectedValue={productCategory}
        style={styles.picker}
        onValueChange={(itemValue) => setProductCategory(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Furniture" value="furniture" />
        <Picker.Item label="Clothing" value="clothing" />
        <Picker.Item label="Food" value="food" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={String(quantity)}
        onChangeText={(value) => setQuantity(Number(value))}
        keyboardType="numeric"

      />

      <TextInput
        style={styles.input}
        placeholder="Expiry Date (YYYY-MM-DD)"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isPerishable}
          onValueChange={setIsPerishable}
        />
        <Text style={styles.checkboxLabel}>Is Perishable</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isDamaged}
          onValueChange={setIsDamaged}
        />
        <Text style={styles.checkboxLabel}>Is Damaged</Text>
      </View>

      <Button title="Upload Inventory File" onPress={handleFileChange} />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
});

export default InventoryForm;
