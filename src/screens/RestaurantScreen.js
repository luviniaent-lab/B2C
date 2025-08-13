import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RestaurantScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fine Dining', 'Casual', 'Bar', 'Rooftop'];

  const restaurants = [
    {
      id: 1,
      name: 'The Sky Lounge',
      cuisine: 'Continental',
      location: 'Connaught Place',
      price: '₹₹₹',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      category: 'Fine Dining',
      features: ['Live Music', 'Rooftop', 'Bar'],
      timing: '6 PM - 2 AM',
    },
    {
      id: 2,
      name: 'Urban Bistro',
      cuisine: 'Italian',
      location: 'Khan Market',
      price: '₹₹',
      rating: 4.4,
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
      category: 'Casual',
      features: ['Outdoor Seating', 'WiFi'],
      timing: '12 PM - 11 PM',
    },
    {
      id: 3,
      name: 'Neon Nights',
      cuisine: 'Asian Fusion',
      location: 'Cyber Hub',
      price: '₹₹₹₹',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
      category: 'Bar',
      features: ['DJ', 'Dance Floor', 'Premium Bar'],
      timing: '7 PM - 3 AM',
    },
  ];

  const renderRestaurantCard = (restaurant) => (
    <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
      <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.imageGradient}
      >
        <View style={styles.topBadges}>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{restaurant.price}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>
      </LinearGradient>
      
      <View style={styles.restaurantInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{restaurant.category}</Text>
          </View>
        </View>
        
        <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
        
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{restaurant.location}</Text>
        </View>
        
        <View style={styles.timingRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.timingText}>{restaurant.timing}</Text>
        </View>
        
        <View style={styles.featuresContainer}>
          {restaurant.features.slice(0, 2).map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          {restaurant.features.length > 2 && (
            <View style={styles.featureTag}>
              <Text style={styles.featureText}>+{restaurant.features.length - 2}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call-outline" size={18} color="#FF4757" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookButton}>
            <LinearGradient
              colors={['#FF4757', '#FF3742']}
              style={styles.bookButtonGradient}
            >
              <Text style={styles.bookButtonText}>Book Table</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#FF6B6B', '#FF8E53']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Restaurants & Bars</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>150+</Text>
            <Text style={styles.statLabel}>Restaurants</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Bars</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
        </View>

        {/* Restaurants List */}
        <ScrollView
          style={styles.restaurantsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.restaurantsContent}
        >
          {restaurants.map((restaurant) => renderRestaurantCard(restaurant))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 12,
  },
  selectedCategoryButton: {
    backgroundColor: '#FFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  selectedCategoryText: {
    color: '#FF6B6B',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  restaurantsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  restaurantsContent: {
    paddingBottom: 100,
  },
  restaurantCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 15,
  },
  topBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B6B',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
  restaurantInfo: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  categoryTag: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryTagText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
  },
  cuisineText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  timingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  featureTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    marginRight: 10,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4757',
    marginLeft: 6,
  },
  bookButton: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default RestaurantScreen;