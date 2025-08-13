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
import { router, useLocalSearchParams } from 'expo-router';
import { events } from './utils/mockData';

const { width, height } = Dimensions.get('window');

export default function EventDetailScreen() {
  const { eventId } = useLocalSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const event = events.find(e => e.id.toString() === eventId);

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  const eventDetails = {
    description: 'Join us for an unforgettable evening filled with great music, delicious food, and amazing company. This exclusive event features live DJ performances, premium cocktails, and a stunning rooftop view of the city.',
    highlights: [
      'Live DJ Performance',
      'Premium Open Bar',
      'Gourmet Catering',
      'Rooftop City Views',
      'VIP Lounge Access',
      'Professional Photography'
    ],
    dresscode: 'Smart Casual',
    ageLimit: '21+',
    contact: '+91 98765 43210',
    organizer: 'Elite Events Co.',
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.headerImage} />
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

        {/* Event Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor:
                    event.status === 'confirmed' ? '#00D2D3' : '#FF9F43',
                },
              ]}
            />
            <Text style={styles.statusText}>
              {event.status === 'confirmed' ? 'Confirmed' : 'Pending'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Event Info */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.organizer}>by {eventDetails.organizer}</Text>
          
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="location" size={20} color="#FF4757" />
              <Text style={styles.infoText}>{event.venue}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={20} color="#FF4757" />
              <Text style={styles.infoText}>{event.date}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time" size={20} color="#FF4757" />
              <Text style={styles.infoText}>{event.time}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="people" size={20} color="#FF4757" />
              <Text style={styles.infoText}>{event.attendees} attendees</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Event</Text>
          <Text style={styles.description}>{eventDetails.description}</Text>
        </View>

        {/* Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Highlights</Text>
          <View style={styles.highlightsGrid}>
            {eventDetails.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <Ionicons name="checkmark-circle" size={16} color="#00D2D3" />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Ionicons name="shirt-outline" size={24} color="#5352ED" />
              <Text style={styles.infoCardTitle}>Dress Code</Text>
              <Text style={styles.infoCardText}>{eventDetails.dresscode}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="person-outline" size={24} color="#FF9F43" />
              <Text style={styles.infoCardTitle}>Age Limit</Text>
              <Text style={styles.infoCardText}>{eventDetails.ageLimit}</Text>
            </View>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={20} color="#FF4757" />
            <Text style={styles.contactText}>{eventDetails.contact}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#FF4757" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinButton}>
          <LinearGradient
            colors={['#FF4757', '#FF3742']}
            style={styles.joinButtonGradient}
          >
            <Text style={styles.joinButtonText}>Join Event</Text>
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
    width: '100%',
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
  statusContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  eventInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  eventName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 5,
  },
  organizer: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
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
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  highlightText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  infoCardText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 15,
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
    marginRight: 15,
  },
  joinButton: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  joinButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
});