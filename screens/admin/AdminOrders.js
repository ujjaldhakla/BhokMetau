// // import React, { useState, useEffect } from 'react';
// // import { 
// //   View, 
// //   Text, 
// //   StyleSheet, 
// //   FlatList, 
// //   ActivityIndicator,
// //   RefreshControl 
// // } from 'react-native';
// // import { 
// //   collection, 
// //   query, 
// //   orderBy, 
// //   onSnapshot, 
// //   Timestamp 
// // } from 'firebase/firestore';
// // import { db } from '../../firebase';
// // import AdminOrderCard from '../../components/AdminOrderCard';
// // import colors from '../../constants/colors';
// // import { Ionicons } from '@expo/vector-icons';

// // const AdminOrders = ({ navigation }) => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);

// //   const fetchOrders = () => {
// //     setLoading(true);
// //     const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    
// //     const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
// //       const ordersList = snapshot.docs.map(doc => {
// //         const data = doc.data();
        
// //         // Format Firestore timestamp
// //         const formatTimestamp = (timestamp) => {
// //           if (!timestamp) return null;
// //           try {
// //             if (timestamp instanceof Timestamp) {
// //               return timestamp.toDate().toISOString();
// //             }
// //             if (timestamp?.toDate) {
// //               return timestamp.toDate().toISOString();
// //             }
// //             return new Date(timestamp).toISOString();
// //           } catch (e) {
// //             console.warn('Date formatting error:', e);
// //             return null;
// //           }
// //         };

// //         return {
// //           id: doc.id,
// //           ...data,
// //           createdAt: formatTimestamp(data.createdAt) || data.createdAt,
// //           updatedAt: formatTimestamp(data.updatedAt) || data.updatedAt
// //         };
// //       });
      
// //       setOrders(ordersList);
// //       setLoading(false);
// //       setRefreshing(false);
// //     }, (error) => {
// //       console.error("Error fetching orders:", error);
// //       setLoading(false);
// //       setRefreshing(false);
// //     });

// //     return unsubscribe;
// //   };

// //   useEffect(() => {
// //     const unsubscribe = fetchOrders();
// //     return unsubscribe;
// //   }, []);

// //   const onRefresh = () => {
// //     setRefreshing(true);
// //     fetchOrders();
// //   };

// //   const handleOrderPress = (order) => {
// //     navigation.navigate('OrderDetails', { order });
// //   };

// //   if (loading && !refreshing) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <ActivityIndicator size="large" color={colors.primary} />
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.headerContainer}>
// //         <Text style={styles.headerTitle}>Orders Management</Text>
// //         <Text style={styles.headerSubtitle}>
// //           {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
// //         </Text>
// //       </View>
      
// //       <FlatList
// //         data={orders}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <AdminOrderCard 
// //             order={item} 
// //             onPress={() => handleOrderPress(item)}
// //           />
// //         )}
// //         contentContainerStyle={styles.listContent}
// //         refreshControl={
// //           <RefreshControl
// //             refreshing={refreshing}
// //             onRefresh={onRefresh}
// //             colors={[colors.primary]}
// //             tintColor={colors.primary}
// //           />
// //         }
// //         ListEmptyComponent={
// //           <View style={styles.emptyContainer}>
// //             <Ionicons 
// //               name="receipt-outline" 
// //               size={60} 
// //               color={colors.gray} 
// //               style={styles.emptyIcon}
// //             />
// //             <Text style={styles.emptyText}>No orders yet</Text>
// //             <Text style={styles.emptySubtext}>
// //               New orders will appear here when customers place them
// //             </Text>
// //           </View>
// //         }
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: colors.background,
// //   },
// //   headerContainer: {
// //     padding: 20,
// //     paddingBottom: 10,
// //     backgroundColor: colors.white,
// //     borderBottomWidth: 1,
// //     borderBottomColor: colors.lightGray,
// //   },
// //   headerTitle: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     color: colors.text,
// //     marginBottom: 4,
// //   },
// //   headerSubtitle: {
// //     fontSize: 14,
// //     color: colors.darkGray,
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: colors.background,
// //   },
// //   listContent: {
// //     padding: 16,
// //     paddingBottom: 30,
// //   },
// //   emptyContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 40,
// //   },
// //   emptyIcon: {
// //     marginBottom: 16,
// //     opacity: 0.5,
// //   },
// //   emptyText: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: colors.darkGray,
// //     marginBottom: 8,
// //     textAlign: 'center',
// //   },
// //   emptySubtext: {
// //     fontSize: 14,
// //     color: colors.gray,
// //     textAlign: 'center',
// //     lineHeight: 20,
// //   },
// // });

// // export default AdminOrders;

// // AdminOrders.js
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
// } from 'react-native';
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   Timestamp,
// } from 'firebase/firestore';
// import { db } from '../../firebase';
// import AdminOrderCard from '../../components/AdminOrderCard';
// import colors from '../../constants/colors';
// import { Ionicons } from '@expo/vector-icons';

// const AdminOrders = ({ navigation, route }) => {
//   const userStatusFilter = route.params?.userStatusFilter || null;
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchOrders = () => {
//     setLoading(true);

//     const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
//     const unsubscribe = onSnapshot(
//       ordersQuery,
//       (snapshot) => {
//         const ordersList = snapshot.docs
//           .map((doc) => {
//             const data = doc.data();

//             const formatTimestamp = (timestamp) => {
//               if (!timestamp) return null;
//               try {
//                 if (timestamp instanceof Timestamp) {
//                   return timestamp.toDate().toISOString();
//                 }
//                 if (timestamp?.toDate) {
//                   return timestamp.toDate().toISOString();
//                 }
//                 return new Date(timestamp).toISOString();
//               } catch (e) {
//                 console.warn('Date formatting error:', e);
//                 return null;
//               }
//             };

//             return {
//               id: doc.id,
//               ...data,
//               createdAt: formatTimestamp(data.createdAt) || data.createdAt,
//               updatedAt: formatTimestamp(data.updatedAt) || data.updatedAt,
//             };
//           })
//           .filter((order) => {
//             if (!userStatusFilter) return true;
//             return order.userStatus?.toLowerCase() === userStatusFilter.toLowerCase();
//           });

//         setOrders(ordersList);
//         setLoading(false);
//         setRefreshing(false);
//       },
//       (error) => {
//         console.error('Error fetching orders:', error);
//         setLoading(false);
//         setRefreshing(false);
//       }
//     );

//     return unsubscribe;
//   };

//   useEffect(() => {
//     const unsubscribe = fetchOrders();
//     return unsubscribe;
//   }, [userStatusFilter]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchOrders();
//   };

//   const handleOrderPress = (order) => {
//     navigation.navigate('OrderDetails', { orderId: order.id });
//   };

//   const getTitle = () => {
//     if (!userStatusFilter) return 'Orders Management';
//     return `${userStatusFilter.charAt(0).toUpperCase() + userStatusFilter.slice(1)} Orders`;
//   };

//   if (loading && !refreshing) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>{getTitle()}</Text>
//         <Text style={styles.headerSubtitle}>
//           {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
//         </Text>
//       </View>

//       <FlatList
//         data={orders}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <AdminOrderCard order={item} onPress={() => handleOrderPress(item)} />
//         )}
//         contentContainerStyle={styles.listContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[colors.primary]}
//             tintColor={colors.primary}
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons
//               name="receipt-outline"
//               size={60}
//               color={colors.gray}
//               style={styles.emptyIcon}
//             />
//             <Text style={styles.emptyText}>No orders yet</Text>
//             <Text style={styles.emptySubtext}>
//               New orders will appear here when customers place them
//             </Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   headerContainer: {
//     padding: 20,
//     paddingBottom: 10,
//     backgroundColor: colors.white,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.lightGray,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: colors.text,
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: colors.darkGray,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.background,
//   },
//   listContent: {
//     padding: 16,
//     paddingBottom: 30,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//   },
//   emptyIcon: {
//     marginBottom: 16,
//     opacity: 0.5,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: colors.darkGray,
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: colors.gray,
//     textAlign: 'center',
//     lineHeight: 20,
//   },
// });

// export default AdminOrders;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebase';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc,
  doc
} from 'firebase/firestore';
import colors from '../../constants/colors';
import AdminOrderCard from '../../components/AdminOrderCard';

const AdminOrders = ({ navigation, route }) => {
  const userStatusFilter = route.params?.userStatusFilter || null;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = () => {
    setLoading(true);

    const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const ordersList = snapshot.docs.map((doc) => {
          const data = doc.data();
          const date = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
          
          return {
            id: doc.id,
            ...data,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            userStatus: data.userStatus || 'pending'
          };
        }).filter((order) => {
          if (!userStatusFilter) return true;
          return order.userStatus?.toLowerCase() === userStatusFilter.toLowerCase();
        });

        setOrders(ordersList);
        setLoading(false);
        setRefreshing(false);
      },
      (error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
        setRefreshing(false);
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchOrders();
    return unsubscribe;
  }, [userStatusFilter]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const updateUserStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { userStatus: newStatus });
      Alert.alert("Status Updated", `Order status changed to \"${newStatus}\"`);
    } catch (error) {
      console.error('Error updating user status:', error);
      Alert.alert("Update Failed", "Unable to update order status.");
    }
  };

  const handleOrderPress = (order) => {
    navigation.navigate('OrderDetails', { 
      orderId: order.id,
      onGoBack: fetchOrders
    });
  };

  const getTitle = () => {
    if (!userStatusFilter) return 'All Orders';
    return `${userStatusFilter.charAt(0).toUpperCase() + userStatusFilter.slice(1)} Orders`;
  };

  const renderOrderItem = ({ item }) => (
    <AdminOrderCard 
      order={item} 
      onPress={() => handleOrderPress(item)}
      onStatusChange={(newStatus) => updateUserStatus(item.id, newStatus)}
    />
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{getTitle()}</Text>
          <Text style={styles.headerSubtitle}>
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('OrderStatusFilter')}>
          <Ionicons name="filter" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="receipt-outline"
              size={60}
              color={colors.lightGray}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>No orders found</Text>
            <Text style={styles.emptySubtext}>
              {userStatusFilter 
                ? `No ${userStatusFilter} orders available`
                : 'No orders have been placed yet'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTextContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AdminOrders;