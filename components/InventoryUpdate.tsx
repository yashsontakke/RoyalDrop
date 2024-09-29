import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { InventoryItem } from '../app/types/InventoryTypes';
import { Picker } from '@react-native-picker/picker';
type InventoryListProps = {
    products: InventoryItem[];
};    

const InventoryUpdate = ({ products }: InventoryListProps) => {
    const [productId, setProductId] = useState('');
    const [deliveryAgentId, setDeliveryAgentId] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
    const [deliveryAction, setDeliveryAction] = useState('');
    const [quantity, setQuantity] = useState('');

    const searchProductById = () => {
        const product = products.find(item => item.id === productId);
        if (product) {
            setSelectedProduct(product);
        } else {
            Alert.alert('Product not found');
            setSelectedProduct(null);
        }
    };

    const updateDeliveryStatus = () => {
        if (selectedProduct) {
            const qty = parseInt(quantity, 10);
            if (isNaN(qty) || qty <= 0) {
                Alert.alert('Please enter a valid quantity');
                return;
            }

            if (deliveryAction === 'out') {

                if (qty > selectedProduct.quantity) {
                    Alert.alert('Quantity exceeds available stock');
                    return;
                }

                Alert.alert(`Product ${selectedProduct.productName} taken out for delivery by Agent ID: ${deliveryAgentId}`);
                // Logic to decrease quantity if necessary
            } else if (deliveryAction === 'returned') {
                Alert.alert(`Product ${selectedProduct.productName} returned to warehouse by Agent ID: ${deliveryAgentId}`);
                // Logic to increase quantity if necessary
            } else {
                Alert.alert('Please select a delivery action');
            }

            // Reset states after update
            setProductId('');
            setDeliveryAgentId('');
            setDeliveryAction('');
            setSelectedProduct(null);
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
            <TextInput
                style={styles.input}
                placeholder="Enter Delivery Agent ID"
                value={deliveryAgentId}
                onChangeText={setDeliveryAgentId}
            />
            <Button title="Search" onPress={searchProductById} />
            {selectedProduct && (
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