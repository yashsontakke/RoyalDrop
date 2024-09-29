import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type LoginProps = {
    onLogin: (username: string, password: string) => void;
};

const Login = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // New state for role selection

    const handleLogin = () => {
        if (username && password) {
            onLogin(username, password);
        } else {
            alert('Please enter both username and password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Who are you?</Text>
            <Picker
                selectedValue={role}
                style={styles.picker}
                onValueChange={(itemValue) => setRole(itemValue)}
            >
                <Picker.Item label="Select Role" value="" />
                <Picker.Item label="Inventory Team (InvTeam)" value="InvTeam" />
                <Picker.Item label="Delivery Team (DLTeam)" value="DLTeam" />
            </Picker>

            {role && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button title="Login" onPress={handleLogin} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    label: { fontSize: 18, marginBottom: 10 },
    picker: { height: 50, width: '100%', marginBottom: 20 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
});

export default Login;
