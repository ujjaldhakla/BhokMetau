// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   SafeAreaView, 
//     TouchableOpacity
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import colors from '../constants/colors';

// const OrderDetails = ({ route, navigation }) => {
//   const { orderId } = route.params;
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const orderRef = doc(db, 'orders', orderId);
//         const orderSnap = await getDoc(orderRef);
        
//         if (orderSnap.exists()) {
//           const orderData = orderSnap.data();
//           setOrder({
//             id: orderSnap.id,
//             ...orderData,
//             date: new Date(orderData.createdAt).toLocaleDateString(),
//             time: new Date(orderData.createdAt).toLocaleTimeString(),
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching order:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   if (loading || !order) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color={colors.primary} />
//         </TouchableOpacity>
//         <Text style={styles.title}>Order Details</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Order Summary</Text>
//           <View style={styles.orderInfo}>
//             <Text style={styles.orderLabel}>Order ID:</Text>
//             <Text style={styles.orderValue}>#{order.id.substring(0, 8)}</Text>
//           </View>
//           <View style={styles.orderInfo}>
//             <Text style={styles.orderLabel}>Date:</Text>
//             <Text style={styles.orderValue}>{order.date} at {order.time}</Text>
//           </View>
//           <View style={styles.orderInfo}>
//             <Text style={styles.orderLabel}>Status:</Text>
//             <View style={[styles.statusBadge, { 
//               backgroundColor: getStatusColor(order.status)
//             }]}>
//               <Text style={styles.statusText}>{order.status}</Text>
//             </View>
//           </View>
//           <View style={styles.orderInfo}>
//             <Text style={styles.orderLabel}>Total:</Text>
//             <Text style={styles.orderTotal}>Rs {order.total.toFixed(2)}</Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Items</Text>
//           {order.items.map((item, index) => (
//             <View key={`${item.id}-${index}`} style={styles.item}>
//               <View style={styles.itemInfo}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemPrice}>Rs {item.price.toFixed(2)} x {item.quantity}</Text>
//               </View>
//               <Text style={styles.itemTotal}>
//                 Rs {(item.price * item.quantity).toFixed(2)}
//               </Text>
//             </View>
//           ))}
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Customer Information</Text>
//           <View style={styles.infoRow}>
//             <Ionicons name="person" size={16} color={colors.primary} />
//             <Text style={styles.infoText}>{order.customer.name}</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Ionicons name="call" size={16} color={colors.primary} />
//             <Text style={styles.infoText}>{order.customer.phone}</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Ionicons name="location" size={16} color={colors.primary} />
//             <Text style={styles.infoText}>{order.customer.address}</Text>
//           </View>
//           {order.notes && (
//             <View style={styles.infoRow}>
//               <Ionicons name="document-text" size={16} color={colors.primary} />
//               <Text style={styles.infoText}>{order.notes}</Text>
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const getStatusColor = (status) => {
//   switch(status.toLowerCase()) {
//     case 'pending': return colors.warning;
//     case 'completed': return colors.success;
//     case 'cancelled': return colors.error;
//     case 'delivered': return colors.success;
//     default: return colors.gray;
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.lightGray,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: colors.text,
//   },
//   scrollContainer: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   section: {
//     backgroundColor: colors.white,
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.text,
//     marginBottom: 15,
//   },
//   orderInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   orderLabel: {
//     fontSize: 16,
//     color: colors.darkGray,
//   },
//   orderValue: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: colors.text,
//   },
//   orderTotal: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: colors.primary,
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 15,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: colors.white,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.lightGray,
//   },
//   itemInfo: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 16,
//     color: colors.text,
//   },
//   itemPrice: {
//     fontSize: 14,
//     color: colors.gray,
//     marginTop: 5,
//   },
//   itemTotal: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: colors.text,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   infoText: {
//     fontSize: 16,
//     color: colors.text,
//     marginLeft: 10,
//   },
// });

// export default OrderDetails;

// === OrderDetails.js ===

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import colors from '../constants/colors';

const OrderDetails = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const orderData = orderSnap.data();
          setOrder({
            id: orderSnap.id,
            ...orderData,
            date: new Date(orderData.createdAt).toLocaleDateString(),
            time: new Date(orderData.createdAt).toLocaleTimeString(),
            userStatus: orderData.userStatus || 'pending',
          });
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const updateUserStatus = async (newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { userStatus: newStatus });
      setOrder((prev) => ({ ...prev, userStatus: newStatus }));
      Alert.alert("Status Updated", `You marked this order as \"${newStatus}\"`);
    } catch (error) {
      console.error('Error updating user status:', error);
      Alert.alert("Update Failed", "Unable to update order status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return colors.warning;
      case 'completed':
      case 'delivered':
      case 'received': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.gray;
    }
  };

  if (loading || !order) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Order Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.orderInfo}>
            <Text style={styles.orderLabel}>Order ID:</Text>
            <Text style={styles.orderValue}>#{order.id.substring(0, 8)}</Text>
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.orderLabel}>Date:</Text>
            <Text style={styles.orderValue}>{order.date} at {order.time}</Text>
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.orderLabel}>Admin Status:</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.orderLabel}>Your Status:</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.userStatus) }]}>
              <Text style={styles.statusText}>{order.userStatus}</Text>
            </View>
          </View>

          <View style={styles.statusActions}>
            {['pending', 'received', 'cancelled'].map((statusOption) => (
              <TouchableOpacity
                key={statusOption}
                style={[
                  styles.statusButton,
                  order.userStatus === statusOption && styles.activeStatusButton,
                ]}
                onPress={() => updateUserStatus(statusOption)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    order.userStatus === statusOption && styles.activeStatusButtonText,
                  ]}
                >
                  {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.orderLabel}>Total:</Text>
            <Text style={styles.orderTotal}>Rs {order.total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.items.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.item}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rs {item.price.toFixed(2)} x {item.quantity}</Text>
              </View>
              <Text style={styles.itemTotal}>
                Rs {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person" size={16} color={colors.primary} />
            <Text style={styles.infoText}>{order.customer.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call" size={16} color={colors.primary} />
            <Text style={styles.infoText}>{order.customer.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={16} color={colors.primary} />
            <Text style={styles.infoText}>{order.customer.address}</Text>
          </View>
          {order.notes && (
            <View style={styles.infoRow}>
              <Ionicons name="document-text" size={16} color={colors.primary} />
              <Text style={styles.infoText}>{order.notes}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: colors.lightGray,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  section: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 15,
  },
  orderInfo: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,
  },
  orderLabel: { fontSize: 16, color: colors.darkGray },
  orderValue: { fontSize: 16, fontWeight: '500', color: colors.text },
  orderTotal: { fontSize: 16, fontWeight: 'bold', color: colors.primary },
  statusBadge: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15,
  },
  statusText: { fontSize: 14, fontWeight: 'bold', color: colors.white },
  item: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,
    paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.lightGray,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, color: colors.text },
  itemPrice: { fontSize: 14, color: colors.gray, marginTop: 5 },
  itemTotal: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  infoRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 10,
  },
  infoText: { fontSize: 16, color: colors.text, marginLeft: 10 },
  statusActions: {
    flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10,
  },
  statusButton: {
    paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.lightGray, borderRadius: 20,
  },
  activeStatusButton: {
    backgroundColor: colors.primary,
  },
  statusButtonText: {
    fontSize: 14, color: colors.text,
  },
  activeStatusButtonText: {
    color: colors.white, fontWeight: 'bold',
  },
});

export default OrderDetails;
