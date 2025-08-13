import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const menuItems = [
    {
      icon: 'calendar-outline',
      title: 'My Events',
      badge: '17',
      color: '#FF4757',
    },
    {
      icon: 'home-outline',
      title: 'Organise Houseparty',
      color: '#5352ED',
    },
    {
      icon: 'checkmark-circle-outline',
      title: 'Booked Events (Upcoming)',
      color: '#00D2D3',
    },
    {
      icon: 'time-outline',
      title: 'Past Attended Events',
      color: '#FF9F43',
    },
    {
      icon: 'close-circle-outline',
      title: 'Cancelled Events',
      color: '#EE5A52',
    },
  ];

  const reviewItems = [
    {
      icon: 'star-outline',
      title: 'Your rating',
      color: '#FFD700',
    },
    {
      icon: 'chatbubble-outline',
      title: 'Events Reviewed',
      color: '#5352ED',
    },
    {
      icon: 'thumbs-up-outline',
      title: 'Option to Rate Events',
      color: '#00D2D3',
    },
  ];

  const settingsItems = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      color: '#FF4757',
    },
    {
      icon: 'lock-closed-outline',
      title: 'Change Password',
      color: '#5352ED',
    },
    {
      icon: 'notifications-outline',
      title: 'Notification Preferences',
      color: '#FF9F43',
    },
    {
      icon: 'log-out-outline',
      title: 'Logout',
      color: '#EE5A52',
    },
  ];

  const renderMenuItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
          <Ionicons name={item.icon} size={20} color={item.color} />
        </View>
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      {item.badge && (
        <View style={[styles.badge, { backgroundColor: item.color }]}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward-outline" size={20} color="#8E8E93" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#E8E8E8', '#F5F5F5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <LinearGradient
                colors={['#FF9A9E', '#FECFEF']}
                style={styles.profileImage}
              >
                <Ionicons name="person" size={40} color="#FFF" />
              </LinearGradient>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>XYZ Verified?</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={12} color="#FFF" />
                </View>
              </View>
              <Text style={styles.profileEmail}>xyz@gmail.com</Text>
              <Text style={styles.profileId}>User ID: instagram</Text>
            </View>
          </View>

          {/* Friends Section */}
          <View style={styles.friendsSection}>
            <Text style={styles.friendsText}>Friends: Request, pending, friends</Text>
          </View>

          {/* My Events Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="calendar" size={20} color="#FF4757" />
              <Text style={styles.sectionTitle}>My Events</Text>
            </View>
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </View>

          {/* Reviews & Ratings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={styles.sectionTitle}>Reviews & Ratings</Text>
            </View>
            {reviewItems.map((item, index) => renderMenuItem(item, index))}
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="settings" size={20} color="#8E8E93" />
              <Text style={styles.sectionTitle}>Settings</Text>
            </View>
            {settingsItems.map((item, index) => renderMenuItem(item, index))}
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#00D2D3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  profileId: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  friendsSection: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  friendsText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  section: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    paddingVertical: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
});