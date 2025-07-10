// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   FlatList, 
//   ActivityIndicator,
//   RefreshControl 
// } from 'react-native';
// import { 
//   collection, 
//   query, 
//   orderBy, 
//   onSnapshot, 
//   Timestamp 
// } from 'firebase/firestore';
// import { db } from '../../firebase';
// import AdminOrderCard from '../../components/AdminOrderCard';
// import colors from '../../constants/colors';
// import { Ionicons } from '@expo/vector-icons';

// const AdminOrders = ({ navigation }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchOrders = () => {
//     setLoading(true);
//     const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    
//     const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
//       const ordersList = snapshot.docs.map(doc => {
//         const data = doc.data();
        
//         // Format Firestore timestamp
//         const formatTimestamp = (timestamp) => {
//           if (!timestamp) return null;
//           try {
//             if (timestamp instanceof Timestamp) {
//               return timestamp.toDate().toISOString();
//             }
//             if (timestamp?.toDate) {
//               return timestamp.toDate().toISOString();
//             }
//             return new Date(timestamp).toISOString();
//           } catch (e) {
//             console.warn('Date formatting error:', e);
//             return null;
//           }
//         };

//         return {
//           id: doc.id,
//           ...data,
//           createdAt: formatTimestamp(data.createdAt) || data.createdAt,
//           updatedAt: formatTimestamp(data.updatedAt) || data.updatedAt
//         };
//       });
      
//       setOrders(ordersList);
//       setLoading(false);
//       setRefreshing(false);
//     }, (error) => {
//       console.error("Error fetching orders:", error);
//       setLoading(false);
//       setRefreshing(false);
//     });

//     return unsubscribe;
//   };

//   useEffect(() => {
//     const unsubscribe = fetchOrders();
//     return unsubscribe;
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchOrders();
//   };

//   const handleOrderPress = (order) => {
//     navigation.navigate('OrderDetails', { order });
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
//         <Text style={styles.headerTitle}>Orders Management</Text>
//         <Text style={styles.headerSubtitle}>
//           {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
//         </Text>
//       </View>
      
//       <FlatList
//         data={orders}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <AdminOrderCard 
//             order={item} 
//             onPress={() => handleOrderPress(item)}
//           />
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

// AdminOrders.js

import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, 
  SafeAreaView
} from 'react-native';
import { 
  collection, query, orderBy, onSnapshot, Timestamp 
} from 'firebase/firestore';
import { db } from '../../firebase';
import AdminOrderCard from '../../components/AdminOrderCard';
import colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const AdminOrders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = () => {
    setLoading(true);
    const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersList = snapshot.docs.map(doc => {
        const data = doc.data();
        
        const formatTimestamp = (timestamp) => {
          if (!timestamp) return null;
          try {
            if (timestamp instanceof Timestamp) {
              return timestamp.toDate().toISOString();
            }
            if (timestamp?.toDate) {
              return timestamp.toDate().toISOString();
            }
            return new Date(timestamp).toISOString();
          } catch (e) {
            console.warn('Date formatting error:', e);
            return null;
          }
        };

        return {
          id: doc.id,
          ...data,
          createdAt: formatTimestamp(data.createdAt) || data.createdAt,
          updatedAt: formatTimestamp(data.updatedAt) || data.updatedAt
        };
      });
      
      setOrders(ordersList);
      setLoading(false);
      setRefreshing(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
      setRefreshing(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchOrders();
    return unsubscribe;
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handleOrderPress = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Orders Management</Text>
        <Text style={styles.headerSubtitle}>
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
        </Text>
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AdminOrderCard 
            order={item} 
            onPress={() => handleOrderPress(item)}
          />
        )}
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
            <Ionicons name="receipt-outline" size={60} color={colors.gray} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>
              New orders will appear here when customers place them
            </Text>
          </View>
        }
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: colors.darkGray },
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background,
  },
  listContent: { padding: 16, paddingBottom: 30 },
  emptyContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40,
  },
  emptyIcon: { marginBottom: 16, opacity: 0.5 },
  emptyText: {
    fontSize: 18, fontWeight: '600', color: colors.darkGray, marginBottom: 8, textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14, color: colors.gray, textAlign: 'center', lineHeight: 20,
  },
});

export default AdminOrders;
