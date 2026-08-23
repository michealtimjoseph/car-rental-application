import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import api from '@/src/services/api';
import type { RootStackParamList } from '@/src/navigation/AppNavigator';
import type { Car } from '@/src/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  return (
    <View>
      <Text>Available Cars</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        cars.map((car) => (
          <TouchableOpacity
            key={car.id}
            onPress={() => navigation.navigate('CarDetails', { carId: car.id })}
          >
            <Text>
              {car.brand} {car.model} - ${car.price_per_day}/day
            </Text>
          </TouchableOpacity>
        ))
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Bookings')}>
        <Text>Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
