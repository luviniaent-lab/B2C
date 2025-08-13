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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { venues } from '../utils/mockData';

const { width, height } = Dimensions.get('window');

export default function VenueDetailScreen() {
  const { venueId } = useLocalSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const venue = venues.find(v => v.id.toString() === venueId);

  if (!venue) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Venue not found</Text>
      </View>
    );
  }

  const venueImages = [
    venue.image,
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
  ];

  const venueDetails = {
    description: 'Experience luxury and elegance at this premium venue. Perfect for corporate events, private parties, and special celebrations. Our venue offers state-of-the-art facilities with exceptional service.',
    amenities: [
      'Air Conditioning',
      'Sound System',
      'LED Lighting',
      'Parking',
      'Catering Service',
      'Security',
      'WiFi',
      'Bar Service'
    ],
    capacity: '50-200 people',
    contact: '+91 98765 43210',
    email: 'info@skylounge.com',
    website: 'www.skylounge.com',
    timings: '10:00 AM - 2:00 AM',
    policies: [
      'No outside food allowed',
      'Advance booking required',
      'Cancellation 24hrs prior',
      'Security deposit required'
    ]
  };

  const handleBookVenue = () => {
    Alert.alert(
      'Book Venue',
      'Would you like to proceed with booking this venue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => {
            Alert.alert('Success', 'Booking request sent successfully!');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Images */}
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setSelectedImageIndex(index);
          }}
        >
          {venueImages.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.headerImage} />
          ))}
        </ScrollView>
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.imageGradient}
        />
        
        {/* Navigation Header */}
        <SafeAreaView style={styles.navHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bookmarkButton}
            onPress={() => setIsBookmarked(!isBookmarked)}
          >
            <Ionicons 
              name={isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color="#FFF" 
            />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Image Indicators */}
        <View style={styles.imageIndicators}>
          {venueImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                selectedImageIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{venue.rating}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Venue Info */}
        <View style={styles.venueInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{venue.category}</Text>
            </View>
          </View>
          
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="location" size={20} color="#FF4757" />
              <Text style={styles.infoText}>{venue.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="people" size={20} color="#FF4757" />
              <Text style={styles.infoText}>{venueDetails.capacity}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time" size={20} color="#FF4757" />
              <Text style={styles.infoText}>{venueDetails.timings}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="card" size={20} color="#FF4757" />
              <Text style={styles.infoText}>{venue.price}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Venue</Text>
          <Text style={styles.description}>{venueDetails.description}</Text>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {venueDetails.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Ionicons name="checkmark-circle" size={16} color="#00D2D3" />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Policies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Venue Policies</Text>
          {venueDetails.policies.map((policy, index) => (
            <View key={index} style={styles.policyItem}>
              <Ionicons name="information-circle-outline" size={16} color="#FF9F43" />
              <Text style={styles.policyText}>{policy}</Text>
            </View>
          ))}
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="call" size={20} color="#FF4757" />
            <Text style={styles.contactText}>{venueDetails.contact}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="mail" size={20} color="#FF4757" />
            <Text style={styles.contactText}>{venueDetails.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="globe" size={20} color="#FF4757" />
            <Text style={styles.contactText}>{venueDetails.website}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#FF4757" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call-outline" size={24} color="#FF4757" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookVenue}>
          <LinearGradient
            colors={['#FF4757', '#FF3742']}
            style={styles.bookButtonGradient}
          >
            <Text style={styles.bookButtonText}>Book Venue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
  imageContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  headerImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  navHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginRight: 8,
  },
  activeIndicator: {
    backgroundColor: '#FFF',
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  venueInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  venueName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#FF4757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  quickInfo: {
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  policyText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#FF4757',
    marginLeft: 12,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  shareButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bookButton: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
});