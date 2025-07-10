
import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import colors from '../constants/colors';
import { auth } from '../firebase';

const Profile = ({ navigation, route }) => {
  const { logout, isAdmin } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          isAdmin: isAdmin // Include admin status from context
        });
      } else {
        // Redirect to login if no user
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigation, isAdmin]); // Include isAdmin in dependencies

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return null; // Or a loading indicator, as the navigation will happen automatically
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={60} color={colors.white} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.displayName || 'User'}</Text>
              <Text style={styles.email}>{user.email || 'No email'}</Text>
              {user.isAdmin && (
                <Text style={styles.adminBadge}>ADMIN</Text>
              )}
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="mail-outline" size={24} color={colors.primary} />
              <Text style={styles.detailText}>{user.email || 'No email'}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="person-outline" size={24} color={colors.primary} />
              <Text style={styles.detailText}>{user.displayName || 'Guest'}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.orderButton} 
            onPress={() => navigation.navigate('UserOrders')}
          >
            <Ionicons name="receipt-outline" size={24} color={colors.primary} />
            <Text style={styles.orderButtonText}>My Orders</Text>
          </TouchableOpacity>

          {user.isAdmin && (
            <TouchableOpacity 
              style={[styles.orderButton, { borderColor: colors.success }]}
              onPress={() => navigation.navigate('AdminDashboard')}
            >
              <Ionicons name="shield-outline" size={24} color={colors.success} />
              <Text style={[styles.orderButtonText, { color: colors.success }]}>Admin Dashboard</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: colors.darkGray,
  },
  adminBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.success,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.lightSuccess,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.error,
    marginTop: 'auto',
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginBottom: 20,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Profile;