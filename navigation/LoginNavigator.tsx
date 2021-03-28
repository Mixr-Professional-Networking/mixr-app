import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../screens/LoginScreen';

const Login = createStackNavigator();

export default function LoginNavigator() {
  return (
    <Login.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Login.Screen name="Login" component={LoginScreen} />
    </Login.Navigator>
  );
}
