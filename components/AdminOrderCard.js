// import React from 'react';
// import { 
//   View, Text, StyleSheet, TouchableOpacity, Alert 
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import colors from '../constants/colors';
// import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { db } from '../firebase';

// const AdminOrderCard = ({ order, onPress }) => {
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   const totalItems = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

//   const handleUpdateStatus = async () => {
//     try {
//       const orderRef = doc(db, 'orders', order.id);
//       await updateDoc(orderRef, {
//         status: 'completed',
//         updatedAt: new Date(),
//       });
//     } catch (error) {
//       console.error("Failed to update order status:", error);
//     }
//   };

//   const handleDelete = () => {
//     Alert.alert(
//       "Delete Order",
//       "Are you sure you want to delete this order?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               await deleteDoc(doc(db, 'orders', order.id));
//             } catch (error) {
//               console.error("Error deleting order:", error);
//             }
//           }
//         }
//       ]
//     );
//   };

//   return (
//     <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
//       <View style={styles.header}>
//         <Text style={styles.orderId}>Order #{order.id.substring(0, 8).toUpperCase()}</Text>
//         <View style={[
//           styles.statusBadge,
//           {
//             backgroundColor:
//               order.status === 'completed' ? colors.successLight :
//               order.status === 'cancelled' ? colors.errorLight :
//               colors.warningLight
//           }
//         ]}>
//           <Text style={[
//             styles.statusText,
//             {
//               color:
//                 order.status === 'completed' ? colors.success :
//                 order.status === 'cancelled' ? colors.error :
//                 colors.warning
//             }
//           ]}>
//             {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.details}>
//         <Text style={styles.customerName}>{order.customer?.name || 'No name provided'}</Text>
//         <Text style={styles.customerInfo}>
//           Ph: {order.customer?.phone} Address: {order.customer?.address}
//         </Text>

//         {order.notes && (
//           <Text style={styles.notes} numberOfLines={2}>
//             <Text style={{ fontWeight: 'bold' }}>Notes: </Text>{order.notes}
//           </Text>
//         )}
//       </View>

//       <View style={styles.footer}>
//         <View style={styles.summary}>
//           <Text style={styles.itemsText}>{totalItems} items</Text>
//           <Text style={styles.totalText}>${order.total?.toFixed(2) || '0.00'}</Text>
//         </View>
//         <View style={styles.dateContainer}>
//           <Ionicons name="time-outline" size={14} color={colors.gray} style={styles.timeIcon} />
//           <Text style={styles.dateText}>{formatDate(order.createdAt)}</Text>
//           <Ionicons name="chevron-forward" size={18} color={colors.gray} />
//         </View>

//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
//           {order.status !== 'completed' && (
//             <TouchableOpacity
//               style={{ backgroundColor: colors.successLight, padding: 8, borderRadius: 8 }}
//               onPress={handleUpdateStatus}
//             >
//               <Text style={{ color: colors.success, fontWeight: 'bold' }}>Mark as Completed</Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             style={{ backgroundColor: colors.errorLight, padding: 8, borderRadius: 8 }}
//             onPress={handleDelete}
//           >
//             <Text style={{ color: colors.error, fontWeight: 'bold' }}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: colors.darkGray,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   orderId: {
//     fontWeight: 'bold',
//     color: colors.text,
//     fontSize: 16,
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusText: {
//     fontWeight: '600',
//     fontSize: 13,
//   },
//   details: {
//     marginBottom: 12,
//   },
//   customerName: {
//     fontWeight: '600',
//     color: colors.text,
//     fontSize: 15,
//     marginBottom: 4,
//   },
//   customerInfo: {
//     color: colors.darkGray,
//     fontSize: 13,
//     marginBottom: 8,
//   },
//   notes: {
//     color: colors.darkGray,
//     fontSize: 13,
//     fontStyle: 'italic',
//     marginTop: 6,
//   },
//   footer: {
//     borderTopWidth: 1,
//     borderTopColor: colors.lightGray,
//     paddingTop: 12,
//   },
//   summary: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   itemsText: {
//     color: colors.darkGray,
//     fontSize: 14,
//   },
//   totalText: {
//     fontWeight: 'bold',
//     color: colors.primary,
//     fontSize: 16,
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   timeIcon: {
//     marginRight: 4,
//   },
//   dateText: {
//     color: colors.gray,
//     fontSize: 12,
//     flex: 1,
//   },
// });

// export default AdminOrderCard;


import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Alert, 
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import colors from '../constants/colors';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';


const STATUS_OPTIONS = ['pending', 'preparing', 'delivered', 'completed', 'cancelled'];

const AdminOrderCard = ({ order, onPress }) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status || 'pending');

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // const totalItems = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const itemNames = order.items?.map(item => item.name).join(', ') || 'No items';


  const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus);
    try {
      const orderRef = doc(db, 'orders', order.id);
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Order",
      "Are you sure you want to delete this order?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'orders', order.id));
            } catch (error) {
              console.error("Error deleting order:", error);
            }
          }
        }
      ]
    );
  };

  const statusColor = {
    completed: colors.success,
    cancelled: colors.error,
    pending: colors.warning,
    preparing: colors.warning,
    delivered: colors.primary,
  }[selectedStatus] || colors.gray;

  const badgeBgColor = {
    completed: colors.successLight,
    cancelled: colors.errorLight,
    pending: colors.warningLight,
    preparing: colors.warningLight,
    delivered: colors.primaryLight,
  }[selectedStatus] || colors.lightGray;

  return (
   
    <View style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Order: </Text>
        <View style={[styles.statusBadge, { backgroundColor: badgeBgColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.customerName}>{order.customer?.name || 'No name provided'}</Text>
         {/* <Text style={{fontWeight:'bold', fontStyle:'italic', color:'green'}}>{itemNames}</Text> */}
        <Text style={styles.customerInfo}>
          Ph: {order.customer?.phone}, Address:<Text style={{color:'rgb(204, 53, 154)', fontWeight:'blod'}}>{order.customer?.address}</Text> 
        </Text>
        {order.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            <Text style={{ fontWeight: 'bold' }}>Notes: </Text>{order.notes}
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.summary}>
          {/* <Text >Item : {order.item?.name}</Text> */}
       {/* <Text style={styles.itemsText}><Text style={{fontWeight:'bold', color:'green'}}>{totalItems} </Text>items</Text>    */}
<View style={{ marginTop: 10 }}>
  {order.items?.map((item, index) => (
    <Text key={index} style={styles.itemText}>
      {index + 1}. {item.name} ({item.quantity}) - Rs{item.price.toFixed(2)}
    </Text>
  ))}
</View>

       
          <Text style={styles.totalText}>Rs{order.total?.toFixed(2) || '0.00'}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Ionicons name="time-outline" size={14} color={colors.gray} style={styles.timeIcon} />
          <Text style={styles.dateText}>{formatDate(order.createdAt)}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.gray} />
        </View>

        {/* Picker Dropdown for Status Update */}
        <View style={{ marginTop: 12, borderColor: colors.lightGray, borderWidth: 1, borderRadius: 8 }}>
          <Picker
            selectedValue={selectedStatus}
            onValueChange={(value) => handleStatusChange(value)}
            dropdownIconColor={colors.primary}
            style={{ height: 50 }}
          >
            {STATUS_OPTIONS.map((status) => (
              <Picker.Item
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                value={status}
                key={status}
              />
            ))}
          </Picker>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          style={{ backgroundColor: colors.errorLight, padding: 8, borderRadius: 8, marginTop: 10 }}
          onPress={handleDelete}
        >
          <Text style={{ color: colors.error, fontWeight: 'bold', textAlign: 'center' }}>Delete Order</Text>
        </TouchableOpacity>
      </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontWeight: 'bold',
    color: colors.text,
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 13,
  },
  details: {
    marginBottom: 12,
  },
  customerName: {
    fontWeight: '600',
    color: colors.text,
    fontSize: 15,
    marginBottom: 4,
  },
  customerInfo: {
    color: colors.darkGray,
    fontSize: 13,
    marginBottom: 8,
  },
  notes: {
    color: colors.darkGray,
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 6,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 12,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemsText: {
    color: colors.darkGray,
    fontSize: 14,
  },
  totalText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: 4,
  },
  dateText: {
    color: colors.gray,
    fontSize: 12,
    flex: 1,
  },
  itemText: {
  fontSize: 14,
  color: colors.darkGray,
  marginBottom: 4,
}

});

export default AdminOrderCard;
