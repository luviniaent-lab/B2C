import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import VenueCard from '../components/VenueCard';
import { venues, events, farmhouses, restaurants } from '../utils/mockData';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [recentSearches] = useState([
    'Sky Lounge',
    'Birthday party venues',
    'Farmhouse Gurgaon',
    'Rooftop restaurants',
    'Corporate events'
  ]);

  const filters = ['All', 'Venues', 'Events', 'Farmhouses', 'Restaurants'];

  const getFilteredResults = () => {
    const query = searchText.toLowerCase();
    let results = [];

    if (selectedFilter === 'All' || selectedFilter === 'Venues') {
      const filteredVenues = venues.filter(venue =>
        venue.name.toLowerCase().includes(query) ||
        venue.location.toLowerCase().includes(query) ||
        venue.category.toLowerCase().includes(query)
      );
      results.push(...filteredVenues.map(item => ({ ...item, type: 'venue' })));
    }

    if (selectedFilter === 'All' || selectedFilter === 'Events') {
      const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query)
      );
      results.push(...filteredEvents.map(item => ({ ...item, type: 'event' })));
    }

    if (selectedFilter === 'All' || selectedFilter === 'Farmhouses') {
      const filteredFarmhouses = farmhouses.filter(farmhouse =>
        farmhouse.name.toLowerCase().includes(query) ||
        farmhouse.location.toLowerCase().includes(query)
      );
      results.push(...filteredFarmhouses.map(item => ({ ...item, type: 'farmhouse' })));
    }

    if (selectedFilter === 'All' || selectedFilter === 'Restaurants') {
      const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.location.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query)
      );
      results.push(...filteredRestaurants.map(item => ({ ...item, type: 'restaurant' })));
    }

    return results;
  };

  const handleItemPress = (item) => {
    switch (item.type) {
      case 'venue':
        router.push({
          pathname: '/venue-detail',
          params: { venueId: item.id }
        });
        break;
      case 'event':
        router.push({
          pathname: '/event-detail',
          params: { eventId: item.id }
        });
        break;
      default:
        console.log('Item selected:', item.name);
    }
  };

  const renderSearchResult = (item, index) => {
    const getTypeIcon = (type) => {
      switch (type) {
        case 'venue': return 'business-outline';
        case 'event': return 'calendar-outline';
        case 'farmhouse': return 'home-outline';
        case 'restaurant': return 'restaurant-outline';
        default: return 'search-outline';
      }
    };

    const getTypeColor = (type) => {
      switch (type) {
        case 'venue': return '#FF4757';
        case 'event': return '#5352ED';
        case 'farmhouse': return '#2E8B57';
        case 'restaurant': return '#FF9F43';
        default: return '#666';
      }
    };

    return (
      <TouchableOpacity
        key={`${item.type}-${item.id}`}
        style={styles.resultItem}
        onPress={() => handleItemPress(item)}
      >
        <View style={[styles.typeIcon, { backgroundColor: `${getTypeColor(item.type)}20` }]}>
          <Ionicons name={getTypeIcon(item.type)} size={20} color={getTypeColor(item.type)} />
        </View>
        <View style={styles.resultInfo}>
          <Text style={styles.resultName}>{item.name}</Text>
          <Text style={styles.resultDetails}>
            {item.location || item.venue} • {item.category || item.cuisine || item.type}
          </Text>
          {item.rating && (
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#8E8E93" />
      </TouchableOpacity>
    );
  };

  const filteredResults = getFilteredResults();

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search venues, events, restaurants..."
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.selectedFilterChip,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.selectedFilterChipText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {searchText.length === 0 ? (
            /* Recent Searches */
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentItem}
                  onPress={() => setSearchText(search)}
                >
                  <Ionicons name="time-outline" size={20} color="#666" />
                  <Text style={styles.recentText}>{search}</Text>
                  <TouchableOpacity>
                    <Ionicons name="close-outline" size={16} color="#8E8E93" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            /* Search Results */
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {filteredResults.length} Results for "{searchText}"
              </Text>
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => renderSearchResult(item, index))
              ) : (
                <View style={styles.noResults}>
                  <Ionicons name="search-outline" size={64} color="#8E8E93" />
                  <Text style={styles.noResultsText}>No results found</Text>
                  <Text style={styles.noResultsSubtext}>
                    Try adjusting your search or filters
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Popular Categories */}
          {searchText.length === 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Categories</Text>
              <View style={styles.categoriesGrid}>
                {[
                  { name: 'Rooftop Venues', icon: 'business-outline', color: '#FF4757' },
                  { name: 'Birthday Parties', icon: 'gift-outline', color: '#5352ED' },
                  { name: 'Corporate Events', icon: 'briefcase-outline', color: '#00D2D3' },
                  { name: 'Wedding Venues', icon: 'heart-outline', color: '#FF9F43' },
                ].map((category, index) => (
                  <TouchableOpacity key={index} style={styles.categoryCard}>
                    <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                      <Ionicons name={category.icon} size={24} color={category.color} />
                    </View>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#000',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 12,
  },
  selectedFilterChip: {
    backgroundColor: '#FFF',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  selectedFilterChipText: {
    color: '#667eea',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recentText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  resultDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});