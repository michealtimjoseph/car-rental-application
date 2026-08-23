import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Welcome to Car Rental</Text>
      <Button title="Search" onPress={() => navigation.navigate('Search')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}
