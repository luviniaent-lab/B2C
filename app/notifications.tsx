import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'event',
      title: 'Event Reminder',
      message: 'Summer Rooftop Party starts in 2 hours',
      time: '2 hours ago',
      read: false,
      icon: 'calendar',
      color: '#FF4757',
    },
    {
      id: 2,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your venue booking at Sky Lounge has been confirmed',
      time: '5 hours ago',
      read: false,
      icon: 'checkmark-circle',
      color: '#00D2D3',
    },
    {
      id: 3,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on weekend bookings at premium venues',
      time: '1 day ago',
      read: true,
      icon: 'gift',
      color: '#FF9F43',
    },
    {
      id: 4,
      type: 'social',
      title: 'New Friend Request',
      message: 'John Doe wants to connect with you',
      time: '2 days ago',
      read: true,
      icon: 'person-add',
      color: '#5352ED',
    },
    {
      id: 5,
      type: 'event',
      title: 'Event Update',
      message: 'New Year Bash venue has been changed to Club Infinity',
      time: '3 days ago',
      read: true,
      icon: 'information-circle',
      color: '#FF4757',
    },
  ]);

  const [settings, setSettings] = useState({
    eventReminders: true,
    bookingUpdates: true,
    promotions: false,
    socialUpdates: true,
    emailNotifications: true,
    pushNotifications: true,
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderNotification = (notification) => (
    <TouchableOpacity key={notification.id} style={styles.notificationItem}>
      <View style={[styles.notificationIcon, { backgroundColor: `${notification.color}20` }]}>
        <Ionicons name={notification.icon} size={20} color={notification.color} />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const renderSettingItem = (key, title, description) => (
    <View key={key} style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={settings[key]}
        onValueChange={(value) => updateSetting(key, value)}
        trackColor={{ false: '#E0E0E0', true: '#FF4757' }}
        thumbColor={settings[key] ? '#FFF' : '#FFF'}
      />
    </View>
  );

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
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Recent Notifications */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent</Text>
              <TouchableOpacity>
                <Text style={styles.markAllRead}>Mark all as read</Text>
              </TouchableOpacity>
            </View>
            {notifications.map(renderNotification)}
          </View>

          {/* Notification Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notification Settings</Text>
            
            <View style={styles.settingsGroup}>
              <Text style={styles.groupTitle}>Event Notifications</Text>
              {renderSettingItem(
                'eventReminders',
                'Event Reminders',
                'Get notified before your events start'
              )}
              {renderSettingItem(
                'bookingUpdates',
                'Booking Updates',
                'Receive updates about your venue bookings'
              )}
            </View>

            <View style={styles.settingsGroup}>
              <Text style={styles.groupTitle}>Marketing</Text>
              {renderSettingItem(
                'promotions',
                'Promotions & Offers',
                'Get notified about special deals and discounts'
              )}
            </View>

            <View style={styles.settingsGroup}>
              <Text style={styles.groupTitle}>Social</Text>
              {renderSettingItem(
                'socialUpdates',
                'Social Updates',
                'Friend requests and social interactions'
              )}
            </View>

            <View style={styles.settingsGroup}>
              <Text style={styles.groupTitle}>Delivery Method</Text>
              {renderSettingItem(
                'pushNotifications',
                'Push Notifications',
                'Receive notifications on your device'
              )}
              {renderSettingItem(
                'emailNotifications',
                'Email Notifications',
                'Receive notifications via email'
              )}
            </View>
          </View>
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  markAllRead: {
    fontSize: 14,
    color: '#FF4757',
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    position: 'relative',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  notificationTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4757',
    position: 'absolute',
    top: 15,
    right: 0,
  },
  settingsGroup: {
    marginBottom: 25,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});