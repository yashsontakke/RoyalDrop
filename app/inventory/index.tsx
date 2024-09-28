import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import InventoryForm from '../../components/InventoryForm';
import InventoryUpload from "../../components/InventoryUpload"
import InventoryList from "../../components/InventoryList"
import DeliveryTracking from '../../components/DeliveryTracking';
import Reports from '../../components/Reports';
import { InventoryItem } from '../types/InventoryTypes';


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
                    <InventoryList />
                );
            case 'delivery':
                return <DeliveryTracking />;
            case 'reports':
                return <Reports />;
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
