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
import { router } from 'expo-router';
import VenueCard from '../components/VenueCard';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import { venues } from '../utils/mockData';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const categories = ['All', 'HouseParty', 'Clubs', 'FarmHouse', 'Restaurant', 'Bar'];

  const filteredVenues = venues.filter(venue => {
    const matchesCategory = selectedCategory === 'All' || venue.category === selectedCategory;
    const matchesSearch = venue.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVenuePress = (venue) => {
    router.push({
      pathname: '/venue-detail',
      params: { venueId: venue.id }
    });
  };

  return (
    <LinearGradient colors={['#FF6B6B', '#FF8E53']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={24} color="#FFF" />
            <Text style={styles.locationText}>Delhi</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/search')}
            >
              <Ionicons name="search-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/notifications')}
            >
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search venues..."
        />

        {/* Categories */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Featured Image */}
        <View style={styles.featuredContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
            style={styles.featuredImage}
          >
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Discover Amazing Venues</Text>
              <Text style={styles.featuredSubtitle}>Book your perfect event space today</Text>
              <TouchableOpacity 
                style={styles.featuredButton}
                onPress={() => router.push('/create-event')}
              >
                <Text style={styles.featuredButtonText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Venues Grid */}
        <ScrollView
          style={styles.venuesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.venuesContent}
        >
          <View style={styles.venuesGrid}>
            {filteredVenues.map((venue, index) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onPress={handleVenuePress}
                style={index % 2 === 1 ? { marginLeft: 15 } : {}}
              />
            ))}
          </View>
        </ScrollView>

        {/* Quick Action Button */}
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => router.push('/create-event')}
        >
          <LinearGradient
            colors={['#FF4757', '#FF3742']}
            style={styles.quickActionGradient}
          >
            <Ionicons name="add" size={28} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

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
    color: '#FFF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  featuredContainer: {
    marginBottom: 20,
  },
  featuredImage: {
    height: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  featuredContent: {
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  featuredSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuredButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  featuredButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
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
  quickActionButton: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  quickActionGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});