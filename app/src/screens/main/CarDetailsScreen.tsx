import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import api from '@/src/services/api';
import type { RootStackParamList } from '@/src/navigation/AppNavigator';
import type { Car } from '@/src/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CarDetails'>;

export default function CarDetailsScreen({ navigation }: Props) {
  const route = useRoute();
  const { carId } = route.params as { carId: number };
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const response = await api.get(`/cars/${carId}`);
        setCar(response.data);
      } catch (error) {
        setCar(null);
      }
    };

    loadCar();
  }, [carId]);

  if (!car) {
    return (
      <View>
        <Text>Loading car...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>
        {car.brand} {car.model}
      </Text>
      <Text>{car.category}</Text>
      <Text>{car.year}</Text>
      <Text>Plate: {car.plate_number}</Text>
      <Text>Price per day: ${car.price_per_day}</Text>
      <Text>Latest telemetry: {car.latest_telematics?.engine_status ?? 'None'}</Text>
      <Text>
        Fuel: {car.latest_telematics?.fuel_level ?? 'N/A'}%
      </Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
