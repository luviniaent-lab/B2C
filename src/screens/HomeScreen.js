import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const categories = ['All', 'HouseParty', 'Clubs', 'FarmHouse', 'Restaurant', 'Bar'];

  const venues = [
    {
      id: 1,
      name: 'Xyz Club',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      category: 'Clubs',
    },
    {
      id: 2,
      name: 'Xyz Club',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      category: 'Clubs',
    },
    {
      id: 3,
      name: 'Xyz Club',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      category: 'Clubs',
    },
    {
      id: 4,
      name: 'Xyz Club',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      category: 'Clubs',
    },
    {
      id: 5,
      name: 'Xyz Club',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      category: 'Clubs',
    },
    {
      id: 6,
      name: 'Xyz Club',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      category: 'Clubs',
    },
  ];

  const renderVenueCard = (venue, index) => (
    <TouchableOpacity key={venue.id} style={styles.venueCard}>
      <Image source={{ uri: venue.image }} style={styles.venueImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.venueGradient}
      >
        <View style={styles.venueInfo}>
          <Text style={styles.venueName}>{venue.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{venue.rating}</Text>
            <Ionicons name="star" size={16} color="#FFD700" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#B8A5A5', '#A89090']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={24} color="#000" />
            <Text style={styles.locationText}>Delhi</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
            style={styles.searchBar}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Search venues..."
              placeholderTextColor="rgba(0,0,0,0.5)"
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color="#000" />
            </TouchableOpacity>
          </LinearGradient>
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

        {/* Featured Image */}
        <View style={styles.featuredContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
            style={styles.featuredImage}
          >
            <Text style={styles.featuredText}>Image</Text>
          </LinearGradient>
        </View>

        {/* Venues Grid */}
        <ScrollView
          style={styles.venuesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.venuesContent}
        >
          <View style={styles.venuesGrid}>
            {venues.map((venue, index) => renderVenueCard(venue, index))}
          </View>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#000',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    padding: 5,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginRight: 12,
  },
  selectedCategoryButton: {
    backgroundColor: '#FF4757',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  featuredContainer: {
    marginBottom: 20,
  },
  featuredImage: {
    height: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  venuesContainer: {
    flex: 1,
    marginBottom: 100,
  },
  venuesContent: {
    paddingBottom: 20,
  },
  venuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  venueCard: {
    width: (width - 60) / 2,
    height: 150,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  venueImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  venueGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  venueInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  venueName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default HomeScreen;