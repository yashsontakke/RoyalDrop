import React from 'react';
import { View, Text } from 'react-native';
import Login from '../../components/Login';

const LoginPage = () => {
    const handleLogin = (username: string, password: string) => {
        // Handle login logic here
        console.log('Logged in with:', username, password);
    };

    return (
        <View>
            <Text>Login</Text>
            <Login onLogin={handleLogin} />
        </View>
    );
};

export default LoginPage;