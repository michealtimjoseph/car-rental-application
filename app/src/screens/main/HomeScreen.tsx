import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  SafeAreaView 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Fixed: Using default import to match your api.ts setup
import api from '@/src/services/api';
import type { RootStackParamList } from '@/src/navigation/AppNavigator';
import type { Car } from '@/src/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/cars');
      const payload = response.data ?? {};
      const carData = Array.isArray(payload.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : Array.isArray(payload.cars)
            ? payload.cars
            : [];

      setCars(carData);
    } catch (err) {
      console.error('API Error:', err);
      setError('Unable to load fleet data.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger API call once when component mounts
  useEffect(() => {
    fetchCars();
  }, []);

  // UI Component for rendering each individual car in the FlatList
  const renderCarItem = ({ item }: { item: Car }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      // Fixed: Passing 'carId' instead of 'id' to match your RootStackParamList
      onPress={() => navigation.navigate('CarDetails', { carId: item.id })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.statusIndicator}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: item.status === 'available' ? '#10B981' : '#E11D48' }
          ]} />
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.iconContainer}>
          <Ionicons name="car-sport" size={48} color="#1E3A8A" />
        </View>
        <View style={styles.carInfo}>
          <Text style={styles.brandTitle}>{item.brand} {item.model}</Text>
          <Text style={styles.yearText}>Year: {item.year}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.priceAmount}>₱{item.price_per_day} <Text style={styles.priceUnit}>/ day</Text></Text>
        <Ionicons name="arrow-forward-circle" size={28} color="#3B82F6" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.title}>Available Fleet</Text>
        </View>
      </View>

      {/* Main Content Area: Handles loading, error, and success states */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Syncing fleet data...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Ionicons name="cloud-offline-outline" size={48} color="#64748B" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchCars}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCarItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => fetchCars()}>
          <Ionicons name="car" size={24} color="#1E3A8A" />
          <Text style={[styles.navText, { color: '#1E3A8A', fontWeight: 'bold' }]}>Fleet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Bookings')}>
          <Ionicons name="calendar-outline" size={24} color="#64748B" />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={24} color="#64748B" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles isolated from logic for readability and performance
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  greeting: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#64748B',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  carInfo: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  yearText: {
    fontSize: 14,
    color: '#64748B',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  loadingText: {
    marginTop: 12,
    color: '#64748B',
  },
  errorText: {
    marginTop: 12,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 12,
    paddingBottom: 24, 
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
});