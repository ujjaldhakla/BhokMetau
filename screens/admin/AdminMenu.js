// screens/admin/AdminMenu.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const AdminMenu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Management</Text>
      {/* Add your menu management UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
});

export default AdminMenu;