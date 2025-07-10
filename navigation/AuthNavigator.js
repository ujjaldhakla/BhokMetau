import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/Login';
import SignupScreen from '../screens/auth/Signup';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        gestureEnabled: true,
        animationEnabled: true
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          animationTypeForReplace: 'pop'
        }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;