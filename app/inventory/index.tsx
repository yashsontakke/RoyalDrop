import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import InventoryForm from '../../components/InventoryForm';
import InventoryUpload from "../../components/InventoryUpload"
import InventoryList from "../../components/InventoryList"
import DeliveryTracking from '../../components/DeliveryTracking';
import Reports from '../../components/Reports';
import { InventoryItem } from '../types/InventoryTypes';
import InventoryUpdate from '../../components/InventoryUpdate';


const InventoryScreen = () => {
   
    const [view, setView] = useState('form'); // Track which view to display

    const renderContent = () => {
        switch (view) {
            case 'form':
                return <InventoryForm />;
            case 'upload':
                return <InventoryUpload />;
            case 'list':
                return (
                    <InventoryList products={dummyInventoryItems} />
                );
            case 'delivery':
                return <DeliveryTracking />;
            case 'reports':
                return <Reports />;
            case 'update': // New case for updating inventory
                return <InventoryUpdate  products={dummyInventoryItems} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inventory Management</Text>
            <View style={styles.buttonContainer}>
                <Button title="Add Item" onPress={() => setView('form')} />
                <Button title="Upload File" onPress={() => setView('upload')} />
                <Button title="View Inventory" onPress={() => setView('list')} />
                <Button title="Update Inventory" onPress={() => setView('update')} /> 
                <Button title="Track Deliveries" onPress={() => setView('delivery')} />
                <Button title="Generate Reports" onPress={() => setView('reports')} />
            </View>
            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});

export default InventoryScreen;

const dummyInventoryItems : InventoryItem[] = [
    {
        id: '1',
        productName: 'Apples',
        productCategory: 'Fruits',
        quantity: 100,
        expiryDate: '2024-10-01',
        isPerishable: true,
        isDamaged: false,
    },
    {
        id: '2',
        productName: 'Canned Beans',
        productCategory: 'Canned Goods',
        quantity: 50,
        expiryDate: '2025-03-15',
        isPerishable: false,
        isDamaged: false,
    },
    {
        id: '3',
        productName: 'Milk',
        productCategory: 'Dairy',
        quantity: 20,
        expiryDate: '2024-09-30',
        isPerishable: true,
        isDamaged: false,
    },
    {
        id: '4',
        productName: 'Bread',
        productCategory: 'Bakery',
        quantity: 10,
        expiryDate: '2024-09-29',
        isPerishable: true,
        isDamaged: true,
    },
    {
        id: '5',
        productName: 'Cereal',
        productCategory: 'Breakfast',
        quantity: 30,
        expiryDate: '2025-05-10',
        isPerishable: false,
        isDamaged: false,
    },
    {
        id: '6',
        productName: 'Chicken Breast',
        productCategory: 'Meat',
        quantity: 15,
        expiryDate: '2024-09-25',
        isPerishable: true,
        isDamaged: false,
    },
    {
        id: '7',
        productName: 'Rice',
        productCategory: 'Grains',
        quantity: 200,
        expiryDate: '2026-01-01',
        isPerishable: false,
        isDamaged: false,
    },
    {
        id: '8',
        productName: 'Tomatoes',
        productCategory: 'Vegetables',
        quantity: 50,
        expiryDate: '2024-10-05',
        isPerishable: true,
        isDamaged: true,
    },
    {
        id: '9',
        productName: 'Yogurt',
        productCategory: 'Dairy',
        quantity: 25,
        expiryDate: '2024-10-15',
        isPerishable: true,
        isDamaged: false,
    },
    {
        id: '10',
        productName: 'Peanut Butter',
        productCategory: 'Condiments',
        quantity: 40,
        expiryDate: '2025-12-31',
        isPerishable: false,
        isDamaged: false,
    },
];
