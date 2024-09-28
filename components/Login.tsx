import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Login = ({ onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
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
            <Button title="Login" onPress={() => onLogin(username, password)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
});

export default Login;