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
import CategoryTabs from '../components/CategoryTabs';
import { farmhouses } from '../utils/mockData';

const { width } = Dimensions.get('window');

const FarmhouseScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Pool', 'Garden', 'BBQ', 'AC'];

  const filteredFarmhouses = farmhouses.filter(farmhouse => {
    if (selectedFilter === 'All') return true;
    return farmhouse.amenities.includes(selectedFilter);
  });

  const renderFarmhouseCard = (farmhouse) => (
    <TouchableOpacity key={farmhouse.id} style={styles.farmhouseCard}>
      <Image source={{ uri: farmhouse.image }} style={styles.farmhouseImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.imageGradient}
      >
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{farmhouse.rating}</Text>
        </View>
      </LinearGradient>
      
      <View style={styles.farmhouseInfo}>
        <Text style={styles.farmhouseName}>{farmhouse.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{farmhouse.location}</Text>
        </View>
        
        <View style={styles.capacityRow}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text style={styles.capacityText}>{farmhouse.capacity}</Text>
        </View>
        
        <View style={styles.amenitiesContainer}>
          {farmhouse.amenities.slice(0, 3).map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
          {farmhouse.amenities.length > 3 && (
            <View style={styles.amenityTag}>
              <Text style={styles.amenityText}>+{farmhouse.amenities.length - 3}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{farmhouse.price}</Text>
          <TouchableOpacity style={styles.bookButton}>
            <LinearGradient
              colors={['#FF4757', '#FF3742']}
              style={styles.bookButtonGradient}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#2E8B57', '#228B22']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Farmhouses</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <CategoryTabs
          categories={filters}
          selectedCategory={selectedFilter}
          onSelectCategory={setSelectedFilter}
        />

        {/* Featured Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
            style={styles.banner}
          >
            <Text style={styles.bannerTitle}>Weekend Special</Text>
            <Text style={styles.bannerSubtitle}>Get 20% off on bookings</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Explore Deals</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Farmhouses List */}
        <ScrollView
          style={styles.farmhousesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.farmhousesContent}
        >
          {filteredFarmhouses.map((farmhouse) => renderFarmhouseCard(farmhouse))}
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
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  banner: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bannerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E8B57',
  },
  farmhousesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  farmhousesContent: {
    paddingBottom: 100,
  },
  farmhouseCard: {
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
  farmhouseImage: {
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
  farmhouseInfo: {
    padding: 20,
  },
  farmhouseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  amenityTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
  },
  amenityText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E8B57',
  },
  bookButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default FarmhouseScreen;