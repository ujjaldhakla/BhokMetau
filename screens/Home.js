import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Animated,
  Dimensions,
  Platform,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FoodCard from '../components/FoodCard';
import colors from '../constants/colors';
import { foodItems, categories } from '../constants/data';
import { CartContext } from '../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_WIDTH = width - CARD_MARGIN * 2;

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState(foodItems);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { cart } = useContext(CartContext);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const categoryScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(categoryScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  useEffect(() => {
    // Filter items with debounce
    const timer = setTimeout(() => {
      let result = foodItems;
      if (searchQuery) {
        result = result.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (selectedCategory) {
        result = result.filter(item => item.category === selectedCategory.name);
      }
      setFilteredItems(result);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const renderCategory = ({ item, index }) => (
    <Animated.View 
      style={{
        opacity: fadeAnim,
        transform: [
          { scale: categoryScale },
          { translateX: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [50 * (index + 1), 0]
          })}
        ]
      }}
    >
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategory?.id === item.id && styles.selectedCategory,
        ]}
        onPress={() => {
          setSelectedCategory(selectedCategory?.id === item.id ? null : item);
          Keyboard.dismiss();
        }}
      >
        <Text
          style={[
            styles.categoryText,
            selectedCategory?.id === item.id && styles.selectedCategoryText,
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderFoodItem = ({ item, index }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { 
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50 + (index * 10), 0]
            })
          }
        ]
      }}
    >
      <FoodCard
        item={item}
        onPress={() => {
          Keyboard.dismiss();
          navigation.navigate('FoodDetails', { item });
        }}
      />
    </Animated.View>
  );

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View 
        style={[
          styles.container,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.title}>What would you like to eat?</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartButton}
          >
          <Ionicons name="cart" size={28} color={colors.primary} />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <Animated.View 
          style={[
            styles.searchContainer,
            isSearchFocused && styles.searchContainerFocused
          ]}
        >
          <Ionicons 
            name="search" 
            size={20} 
            color={isSearchFocused ? colors.primary : colors.darkGray} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search food..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons 
                name="close-circle" 
                size={20} 
                color={colors.darkGray} 
              />
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Categories */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            keyboardShouldPersistTaps="always"
          />
        </Animated.View>

        {/* Food Items */}
        <Text style={styles.sectionTitle}>Popular Items</Text>
        <FlatList
          data={filteredItems}
          renderItem={renderFoodItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.foodList}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="fast-food" size={50} color={colors.lightGray} />
              <Text style={styles.emptyText}>No items found</Text>
              {searchQuery && (
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                >
                  <Text style={styles.clearButtonText}>Clear search</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: colors.darkGray,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 4,
  },
  cartButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray + '20',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  searchContainerFocused: {
    borderColor: colors.primary,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  categoriesList: {
    paddingBottom: 12,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.darkGray,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: colors.white,
    fontWeight: '600',
  },
  foodList: {
    paddingBottom: 20,
  },
  cartBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.darkGray,
    marginTop: 10,
  },
  clearButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
  },
  clearButtonText: {
    color: colors.primary,
    fontWeight: '500',
  },
});

export default Home;