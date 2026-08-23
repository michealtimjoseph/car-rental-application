import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/src/navigation/AppNavigator';
import type { Booking } from '@/src/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Bookings'>;

const mockBookings: Booking[] = [
  {
    id: 1,
    user_id: 1,
    car_id: 1,
    start_date: '2026-08-25',
    end_date: '2026-08-30',
    total_cost: 445,
    status: 'confirmed',
    car: {
      id: 1,
      brand: 'Toyota',
      model: 'RAV4 Hybrid',
      year: 2024,
      plate_number: 'AB-1024-TY',
      category: 'SUV',
      price_per_day: 89,
      status: 'available',
    },
  },
];

export default function BookingsScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Bookings</Text>
      {mockBookings.map((booking) => (
        <View key={booking.id}>
          <Text>
            {booking.car?.brand} {booking.car?.model}
          </Text>
          <Text>
            {booking.start_date} - {booking.end_date}
          </Text>
          <Text>{booking.status}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
