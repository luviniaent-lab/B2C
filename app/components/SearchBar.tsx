import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilter?: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  onFilter, 
  placeholder = "Search..." 
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
        style={styles.searchBar}
      >
        <Ionicons name="search-outline" size={20} color="rgba(0,0,0,0.6)" />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(0,0,0,0.5)"
          value={value}
          onChangeText={onChangeText}
        />
        {onFilter && (
          <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
            <Ionicons name="options-outline" size={20} color="rgba(0,0,0,0.6)" />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  filterButton: {
    padding: 5,
  },
});

export default SearchBar;