import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { InventoryItem } from '../app/types/InventoryTypes';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

type InventoryListProps = {
    products: InventoryItem[];
};

const InventoryUpdate = ({ products }: InventoryListProps) => {
    const [productId, setProductId] = useState('');
    const [isProductValid, setIsProductValid] = useState(false);
    const [isAgentValid, setIsAgentValid] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
    const [deliveryAction, setDeliveryAction] = useState('');
    const [quantity, setQuantity] = useState('');
    const [deliveryAgentId, setDeliveryAgentId] = useState('');

    const validateProductId = async () => {
        const productResponse = await fetch(`http://localhost:8080/api/inventory/${productId}`);

        if (productResponse.ok) {
            const productData = await productResponse.json();
            console.log(productData);
            setSelectedProduct(productData);
            setIsProductValid(true);
            Alert.alert('Success', 'Product ID is valid. Please enter Delivery Agent ID to validate.');
        } else {

            Alert.alert('Error', 'Product ID is not valid.');
            setSelectedProduct(null);
            setIsProductValid(false);
        }
    };

    const validateDeliveryAgentId = async () => {
        if (!isProductValid) {
            Alert.alert('Error', 'Please validate the Product ID first.');
            return;
        }

        const agentResponse = await fetch(`http://localhost:8080/api/delivery-agents/${deliveryAgentId}`);


        if (agentResponse.ok) {
            const agentData = await agentResponse.json();
            console.log(agentData);
            console.log("coming here");
            setIsAgentValid(true);
            Alert.alert('Success', 'Delivery Agent ID is valid. You can now update delivery status.');
        } else {
            Alert.alert('Error', 'Delivery Agent ID is not valid.');
            setIsAgentValid(false);
        }
    };

    const updateDeliveryStatus = async () => {
        if (selectedProduct) {
            const qty = parseInt(quantity, 10);
            if (isNaN(qty) || qty <= 0) {
                Alert.alert('Please enter a valid quantity');
                return;
            }

            if (deliveryAction === 'out') {

                if (qty > selectedProduct.quantity) {
                    alert('Quantity exceeds available stock');
                    Alert.alert('Quantity exceeds available stock');

                    return;
                }

                // Send request to decrease product quantity using axios
                try {
                    const response = await axios.post('http://localhost:8080/api/inventory/out-for-delivery', {
                        productId: selectedProduct.id,
                        agentId: deliveryAgentId,
                        quantity: qty,
                    });

                    if (response.status === 200) {
                        alert('Delivery status updated successfully');
                    } else {
                        alert(`Failed to update delivery status: ${response.data.message}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while updating delivery status');
                }
                setProductId('');
                setDeliveryAgentId('');
                setSelectedProduct(null);

                // Logic to decrease quantity if necessary
            } else if (deliveryAction === 'returned') {
                try {
                    const response = await axios.post('http://localhost:8080/api/inventory/returned-to-warehouse', {
                        productId: selectedProduct.id,
                        agentId: deliveryAgentId,
                        quantity: qty,
                    });

                    if (response.status === 200) {
                        alert('Return status updated successfully');
                    } else {
                        alert(`Failed to update return status: ${response.data.message}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while updating return status');
                }
                setProductId('');
                setDeliveryAgentId('');
                setSelectedProduct(null);
            } else {
                alert('Please select a delivery action');
                Alert.alert('Please select a delivery action');
            }

            // Reset states after update
            setDeliveryAction('');
            // setSelectedProduct(null);
            setQuantity('');
        }
    };

    return (
        <View style={styles.updateContainer}>
            <Text style={styles.title}>Update Delivery Status</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Product ID"
                value={productId}
                onChangeText={setProductId}
            />
            <Button title="Validate Product ID" onPress={validateProductId} />
            {isProductValid && (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Delivery Agent ID"
                        value={deliveryAgentId}
                        onChangeText={setDeliveryAgentId}
                    />
                    <Button title="Validate Delivery Agent ID" onPress={validateDeliveryAgentId} />
                </View>
            )}
            {isAgentValid && selectedProduct && (
                <View style={styles.productInfoContainer}>
                    <Text style={styles.productInfo}>Product Name: {selectedProduct.productName}</Text>
                    <Text style={styles.productInfo}>Current Quantity: {selectedProduct.quantity}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Quantity"
                        value={quantity}
                        keyboardType="numeric"
                        onChangeText={setQuantity}
                    />
                    <Picker
                        selectedValue={deliveryAction}
                        style={styles.picker}
                        onValueChange={(itemValue) => setDeliveryAction(itemValue)}
                    >
                        <Picker.Item label="Select Action" value="" />
                        <Picker.Item label="Out for Delivery" value="out" />
                        <Picker.Item label="Returned to Warehouse" value="returned" />
                    </Picker>
                    <Button title="Update Delivery Status" onPress={updateDeliveryStatus} />
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    updateContainer: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    productInfoContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#e6f7ff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#b3e0ff',
    },
    productInfo: {
        fontSize: 18,
        color: '#0077b6',
        marginBottom: 10,
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 10,
    },
});


export default InventoryUpdate;