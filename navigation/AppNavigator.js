// import React, { useContext } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { AuthContext } from '../context/AuthContext';
// import AuthNavigator from './AuthNavigator';
// import TabNavigator from './TabNavigator';
// import LoadingScreen from '../components/LoadingScreen';
// import FoodDetails from '../screens/FoodDetails';
// import Cart from '../screens/Cart';
// import Checkout from '../screens/Checkout';

// // Add these imports
// import AdminLogin from '../screens/admin/AdminLogin';
// import AdminDashboard from '../screens/admin/AdminDashboard';
// import AdminOrders from '../screens/admin/AdminOrders';
// import AdminMenu from '../screens/admin/AdminMenu';
// import AdminUsers from '../screens/admin/AdminUsers';

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   const { currentUser, loading } = useContext(AuthContext);

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (

    
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {currentUser ? (
//         <>

// <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
// <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
// <Stack.Screen name="AdminOrders" component={AdminOrders} />
// <Stack.Screen name="AdminMenu" component={AdminMenu} />
// <Stack.Screen name="AdminUsers" component={AdminUsers} />

//           <Stack.Screen name="Main" component={TabNavigator} />
//           <Stack.Screen name="FoodDetails" component={FoodDetails} />
//           <Stack.Screen name="Cart" component={Cart} />
//           <Stack.Screen name="Checkout" component={Checkout} />
//         </>
//       ) : (
//         <Stack.Screen name="Auth" component={AuthNavigator} />
//       )}
//     </Stack.Navigator>
//   );
// }

// navigation/AppNavigator.js
// import React, { useContext } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { AuthContext } from '../context/AuthContext';
// import AuthNavigator from './AuthNavigator';
// import TabNavigator from './TabNavigator';
// import LoadingScreen from '../components/LoadingScreen';
// import FoodDetails from '../screens/FoodDetails';
// import Cart from '../screens/Cart';
// import Checkout from '../screens/Checkout';

// // Add these imports for admin screens
// import AdminLogin from '../screens/admin/AdminLogin';
// import AdminDashboard from '../screens/admin/AdminDashboard';
// import AdminOrders from '../screens/admin/AdminOrders';
// import AdminMenu from '../screens/admin/AdminMenu'; // Make sure this path is correct
// import AdminUsers from '../screens/admin/AdminUsers';

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   const { currentUser, loading } = useContext(AuthContext);

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {currentUser ? (
//         <>
//           {/* Regular user screens */}
//           <Stack.Screen name="Main" component={TabNavigator} />
//           <Stack.Screen name="FoodDetails" component={FoodDetails} />
//           <Stack.Screen name="Cart" component={Cart} />
//           <Stack.Screen name="Checkout" component={Checkout} />
          
//           {/* Admin screens */}
//           <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
//           <Stack.Screen name="AdminOrders" component={AdminOrders} />
//           <Stack.Screen name="AdminMenu" component={AdminMenu} />
//           <Stack.Screen name="AdminUsers" component={AdminUsers} />
//         </>
//       ) : (
//         <>
//           {/* Auth screens */}
//           <Stack.Screen name="Auth" component={AuthNavigator} />
//           <Stack.Screen name="AdminLogin" component={AdminLogin} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// navigation/AppNavigator.js
import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import LoadingScreen from '../components/LoadingScreen';

import FoodDetails from '../screens/FoodDetails';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';

import AdminLogin from '../screens/admin/AdminLogin';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminOrders from '../screens/admin/AdminOrders';
import AdminMenu from '../screens/admin/AdminMenu';
import AdminUsers from '../screens/admin/AdminUsers';
import UserOrders from '../screens/UserOrders';
import OrderDetails from '../screens/OrderDetails';

const Stack = createStackNavigator();

const AutoRedirect = () => {
  const { currentUser, isAdmin } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser && isAdmin) {
      navigation.navigate("AdminDashboard");
    }
  }, [currentUser, isAdmin]);

  return null;
};

export default function AppNavigator() {
  const { currentUser, loading, isAdmin } = useContext(AuthContext);

  if (loading) return <LoadingScreen />;

  return (
    <>
      {currentUser && isAdmin && <AutoRedirect />}

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!currentUser ? (
          <>
            <Stack.Screen name="Auth" component={AuthNavigator} />
            {/* <Stack.Screen name="AdminLogin" component={AdminLogin} /> */}
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="FoodDetails" component={FoodDetails} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="UserOrders" component={UserOrders} />
<Stack.Screen name="OrderDetails" component={OrderDetails} />

            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="AdminOrders" component={AdminOrders} />
            <Stack.Screen name="AdminMenu" component={AdminMenu} />
            <Stack.Screen name="AdminUsers" component={AdminUsers} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
