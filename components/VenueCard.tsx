import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Venue {
  id: number;
  name: string;
  rating: number;
  image: string;
  category: string;
  location: string;
  price: string;
}

interface VenueCardProps {
  venue: Venue;
  onPress: (venue: Venue) => void;
  style?: any;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, onPress, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, style]} 
      onPress={() => onPress(venue)}
    >
      <Image source={{ uri: venue.image }} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <View style={styles.info}>
          <Text style={styles.name}>{venue.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{venue.rating}</Text>
            <Ionicons name="star" size={16} color="#FFD700" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width - 60) / 2,
    height: 150,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
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

export default VenueCard;