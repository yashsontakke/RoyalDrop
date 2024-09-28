import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList ,Switch } from 'react-native';
type InventoryItem = {
    name: string;
    quantity: string; // Adjust type if necessary (e.g., number)
    category: string; // Product Category
    isDamaged: boolean; // Damaged or Not Damaged
    isPerishable: boolean; // Perishable
    expiryDate?: Date; // Expiry Date (optional)
};
const Inventory = () => {
    const [inventoryList, setInventoryList] = useState<InventoryItem[]>([]);

const[itemName, setItemName] = useState('');
const [itemQuantity, setItemQuantity] = useState('');
const [category, setCategory] = useState('');
const [isDamaged, setIsDamaged] = useState(false);
const [isPerishable, setIsPerishable] = useState(false);
const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);

    const addItem = () => {
        if (itemName && itemQuantity) {
            setInventoryList([...inventoryList, { 
                name: itemName, 
                quantity: itemQuantity, 
                category, 
                isDamaged, 
                isPerishable, 
                expiryDate 
            }]);
            setItemName('');
            setItemQuantity('');
            setCategory('');
            setIsDamaged(false);
            setIsPerishable(false);
            setExpiryDate(undefined);
    }
}

    return (
        <View>
        {/* Existing input fields for itemName and itemQuantity */}
        <TextInput 
            value={itemName} 
            onChangeText={setItemName} 
            placeholder="Item Name" 
        />
        <TextInput 
            value={itemQuantity} 
            onChangeText={setItemQuantity} 
            placeholder="Item Quantity" 
        />
        <TextInput 
            value={category} 
            onChangeText={setCategory} 
            placeholder="Product Category" 
        />
        <Text>Damaged:</Text>
        <Switch 
            value={isDamaged} 
            onValueChange={setIsDamaged} 
        />
        <Text>Perishable:</Text>
        <Switch 
            value={isPerishable} 
            onValueChange={setIsPerishable} 
        />
        <TextInput 
            placeholder="Expiry Date" 
            onChangeText={(text) => setExpiryDate(text ? new Date(text) : undefined)} 
        />
        
        <Button title="Add Item" onPress={addItem} />
    </View>
    );
};


const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, marginBottom: 20 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
    item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default Inventory;