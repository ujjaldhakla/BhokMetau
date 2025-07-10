import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Button from '../components/Button';
import colors from '../constants/colors';
import { CartContext } from '../context/CartContext';
import { auth } from '../firebase'; // Ensure you import your Firebase auth instance

const Checkout = ({ navigation }) => {
  const { cart, total, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleGetLocation = async () => {
    setIsLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location permission is needed to autofill your address',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (addressResponse.length > 0) {
        const addr = addressResponse[0];
        const parts = [
          addr.street,
          addr.streetNumber,
          addr.city,
          addr.region,
          addr.postalCode,
          addr.country
        ].filter(Boolean);
        setAddress(parts.join(', '));
      }
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Could not get location. Please enter manually.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!name || !phone || !address) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number (10-15 digits)');
      return;
    }

    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        customer: { 
          name, 
          phone, 
          address,
          email: auth.currentUser?.email || 'guest@example.com'
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total,
        notes,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: auth.currentUser?.uid || 'guest'
      });

      setOrderId(docRef.id);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Order error:', error);
      let errorMessage = 'Failed to place order. Please try again.';
      if (error.code === 'permission-denied') {
        errorMessage = 'You dont have permission to place orders';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Network error. Please check your connection';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <View style={styles.successContainer}>
        <Ionicons 
          name="checkmark-circle" 
          size={100} 
          color={colors.primary} 
        />
        <Text style={styles.successTitle}>Order Confirmed!</Text>
        <Text style={styles.successText}>
          Your order #{orderId.substring(0, 8)} has been received
        </Text>
        <Text style={styles.successSubText}>
          Estimated delivery time: 30-45 minutes
        </Text>
        <View style={styles.successButtons}>
          <Button
            title="Track Order"
            onPress={() => navigation.navigate('UserOrders', { orderId })}
            style={styles.successButton}
          />
          <Button
            title="Back to Menu"
            onPress={() => navigation.navigate('Main')}
            style={[styles.successButton, { backgroundColor: colors.white }]}
            textStyle={{ color: colors.primary }}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name *"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number *"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={15}
        />
        <View style={styles.locationContainer}>
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="Delivery Address *"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={2}
          />
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleGetLocation}
            disabled={isLoading}
          >
            <Ionicons
              name="location"
              size={20}
              color={isLoading ? colors.gray : colors.primary}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Delivery Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cart.map(item => (
          <View key={`${item.id}-${item.quantity}`} style={styles.orderItem}>
            <View style={styles.orderItemInfo}>
              <Text style={styles.orderItemName}>
                {item.name} x {item.quantity}
              </Text>
              {item.notes && (
                <Text style={styles.orderItemNotes}>{item.notes}</Text>
              )}
            </View>
            <Text style={styles.orderItemPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <Button
        title={isLoading ? 'Placing Order...' : 'Place Order'}
        onPress={handlePlaceOrder}
        style={styles.placeOrderButton}
        disabled={isLoading}
        icon={isLoading ? 
          () => <ActivityIndicator color="white" style={{ marginRight: 10 }} /> : 
          null
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: 30,
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSpacer: {
    width: 32,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginBottom: 0,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  locationContainer: {
    position: 'relative',
  },
  addressInput: {
    paddingRight: 50,
  },
  locationButton: {
    position: 'absolute',
    right: 15,
    top: 5,
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  orderItemInfo: {
    flex: 1,
    marginRight: 10,
  },
  orderItemName: {
    fontSize: 16,
    color: colors.text,
  },
  orderItemNotes: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  placeOrderButton: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 32,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  successSubText: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 32,
  },
  successButtons: {
    width: '100%',
    maxWidth: 400,
  },
  successButton: {
    marginBottom: 16,
  },
});

export default Checkout;