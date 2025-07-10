// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppNavigator from './navigation/AppNavigator';
import colors from './constants/colors';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <StatusBar 
              barStyle="dark-content" 
              backgroundColor={colors.background}
            />
            <AppNavigator />
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </View>
  );
}