import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox'; // Update this line
import axios from 'axios';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { Button as ExpoButton } from 'expo-ui-kit'; // For better web support


const InventoryForm = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [isPerishable, setIsPerishable] = useState(false);
  const [isDamaged, setIsDamaged] = useState(false);
  const [file, setFile] = useState(null); // Note: Handling file uploads may vary in React Native

  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    console.log(currentDate);
    setDate(currentDate);
  };

  const showDatepicker = (): void => {
    setShow(true);
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  };

  const handleWebDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newDate = new Date(e.target.value);
    console.log(newDate);
    setDate(newDate);
  };

  const handleFileChange = () => {
    // Handle file selection (for React Native, consider using libraries like react-native-document-picker)
    Alert.alert("File selection not implemented");
  };


  const handleSubmit = async () => {

    const inventoryData = {
      productName,
      productCategory,
      quantity,
      expiryDate: formatDate(date),
      isPerishable,
      isDamaged,
      file,
    };

    console.log(inventoryData);
    try {
      const response = await axios.post('http://localhost:8080/api/inventory/create', inventoryData);
      Alert.alert("Success", JSON.stringify(response.data)); // Show success message
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "There was an error submitting your data."); // Show error message
    }
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
        placeholder={quantity === 0 ? "Enter quantity" : String(quantity)} // Placeholder when quantity is 0
        value={quantity ? String(quantity) : ''} // Display quantity if available
        onChangeText={(value) => {
          if (value === '') {
            setQuantity(0); // Reset to 0 when input is cleared
          } else {
            setQuantity(Number(value));
          }
        }}
        keyboardType="numeric"
      />
      <View style={styles.container}>
        <TouchableOpacity onPress={showDatepicker} style={styles.button}>
          <Text style={styles.buttonText}>Select Expiry Date</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>Selected Date: {formatDate(date)}</Text>
        {Platform.OS === 'web' ? (
          <input
            type="date"
            value={formatDate(date)}
            onChange={handleWebDateChange}
            style={styles.webDatePicker}
          />
        ) : show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
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
  }, button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  dateText: {
    marginTop: 20,
    fontSize: 16,
  },
  webDatePicker: {
    marginTop: 20,
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
  }
});

export default InventoryForm;