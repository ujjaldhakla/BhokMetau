import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersQuery = query(collection(db, 'users'), where('isAdmin', '==', false));

    const unsubscribe = onSnapshot(
      usersQuery,
      (snapshot) => {
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setLoading(false);
      },
      (error) => {
        Alert.alert('Error', 'Failed to fetch users.');
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const renderUserItem = ({ item }) => {
    return (
      <View style={styles.userCard}>
        <Text style={styles.userEmail}>{item.email || 'No email provided'}</Text>
        <Text style={styles.userName}>{item.name || 'No name'}</Text>
        {item.phone && <Text style={styles.userPhone}>📞 {item.phone}</Text>}
        {item.createdAt && (
          <Text style={styles.createdAt}>
            🕒 Joined: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Management</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="person-remove-outline" size={50} color={colors.gray} />
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  userName: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 4,
  },
  userPhone: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  createdAt: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
    fontStyle: 'italic',
  },
  listContent: {
    paddingBottom: 30,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.gray,
  },
});

export default AdminUsers;
