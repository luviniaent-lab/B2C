import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CreateEventScreen() {
  const [eventData, setEventData] = useState({
    name: '',
    venue: '',
    date: '',
    time: '',
    description: '',
    capacity: '',
    category: 'Party',
  });

  const categories = ['Party', 'Corporate', 'Wedding', 'Birthday', 'Anniversary'];

  const handleCreateEvent = () => {
    if (!eventData.name || !eventData.venue || !eventData.date || !eventData.time) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert(
      'Success',
      'Event created successfully!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

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
          <Text style={styles.headerTitle}>Create Event</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            {/* Event Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Event Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event name"
                value={eventData.name}
                onChangeText={(text) => setEventData({...eventData, name: text})}
              />
            </View>

            {/* Venue */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Venue *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter venue name"
                value={eventData.venue}
                onChangeText={(text) => setEventData({...eventData, venue: text})}
              />
            </View>

            {/* Date & Time */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Date *</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <Text style={styles.dateText}>
                    {eventData.date || 'Select date'}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Time *</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <Text style={styles.dateText}>
                    {eventData.time || 'Select time'}
                  </Text>
                  <Ionicons name="time-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Category */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      eventData.category === category && styles.selectedCategoryChip,
                    ]}
                    onPress={() => setEventData({...eventData, category})}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        eventData.category === category && styles.selectedCategoryChipText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Capacity */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Expected Attendees</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter number of attendees"
                keyboardType="numeric"
                value={eventData.capacity}
                onChangeText={(text) => setEventData({...eventData, capacity: text})}
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your event..."
                multiline
                numberOfLines={4}
                value={eventData.description}
                onChangeText={(text) => setEventData({...eventData, description: text})}
              />
            </View>

            {/* Additional Options */}
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionItem}>
                <Ionicons name="image-outline" size={24} color="#FF4757" />
                <Text style={styles.optionText}>Add Photos</Text>
                <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.optionItem}>
                <Ionicons name="location-outline" size={24} color="#FF4757" />
                <Text style={styles.optionText}>Set Location</Text>
                <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.optionItem}>
                <Ionicons name="card-outline" size={24} color="#FF4757" />
                <Text style={styles.optionText}>Ticket Pricing</Text>
                <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Create Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
            <LinearGradient
              colors={['#FF4757', '#FF3742']}
              style={styles.createButtonGradient}
            >
              <Text style={styles.createButtonText}>Create Event</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
  },
  form: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  categoryScroll: {
    marginTop: 5,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
  },
  selectedCategoryChip: {
    backgroundColor: '#FF4757',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedCategoryChipText: {
    color: '#FFF',
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  bottomContainer: {
    padding: 20,
  },
  createButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  createButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
});