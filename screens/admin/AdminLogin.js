// // screens/admin/AdminLogin.js
// import React, { useState, useContext } from 'react';
// import {
//   View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator
// } from 'react-native';
// import colors from '../../constants/colors';
// import { AuthContext } from '../../context/AuthContext';

// export const ADMIN_CREDENTIALS = {
//   email: "udhakal61@gmail.com",
//   password: "1234567"
// };

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { loginAsAdmin } = useContext(AuthContext);

//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       try {
//         if (
//           email !== ADMIN_CREDENTIALS.email ||
//           password !== ADMIN_CREDENTIALS.password
//         ) {
//           throw new Error('Invalid admin credentials');
//         }

//         loginAsAdmin(email); // context triggers navigation automatically
//       } catch (error) {
//         Alert.alert('Login Error', error.message);
//       } finally {
//         setLoading(false);
//       }
//     }, 1000);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Admin Portal</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Admin Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         editable={!loading}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Admin Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         editable={!loading}
//       />

//       {loading ? (
//         <View style={styles.button}>
//           <ActivityIndicator color="white" />
//         </View>
//       ) : (
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//       )}
     
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: colors.background,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//     color: colors.primary,
//   },
//   input: {
//     height: 50,
//     borderColor: colors.lightGray,
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     backgroundColor: colors.white,
//   },
//   button: {
//     backgroundColor: colors.primary,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 50,
//   },
//   buttonText: {
//     color: colors.white,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default AdminLogin;
