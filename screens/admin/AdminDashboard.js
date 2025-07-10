import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');
const cardWidth = width * 0.44;

const AdminDashboard = ({ navigation }) => {
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const ordersQuery = query(collection(db, 'orders'));

    const ordersUnsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setOrdersCount(snapshot.size);

      // 💰 Calculate total revenue from all orders
      const total = snapshot.docs.reduce((sum, doc) => {
        const data = doc.data();
        return sum + (data.total || 0);
      }, 0);
      setTotalRevenue(total);
    });

    const usersQuery = query(collection(db, 'users'), where('isAdmin', '==', false));
    const usersUnsubscribe = onSnapshot(usersQuery, (snapshot) => {
      setUsersCount(snapshot.size);
    });

    return () => {
      ordersUnsubscribe();
      usersUnsubscribe();
    };
  }, []);


  const renderCard = (iconName, title, value, onPress) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name={iconName} size={28} color={colors.primary} style={styles.icon} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      <View style={styles.cardsContainer}>
        {renderCard('receipt-outline', 'Orders', ordersCount, () =>
          navigation.navigate('AdminOrders')
        )}
        {renderCard('people-outline', 'Users', usersCount, () =>
          navigation.navigate('AdminUsers')
        )}
        {renderCard('fast-food-outline', 'Menu Items', 'Manage', () =>
          navigation.navigate('AdminMenu')
        )}
        {renderCard('cash-outline', 'Revenue', `$${totalRevenue.toFixed(2)}`, null)}
      </View>
     

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.primary,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default AdminDashboard;
