import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/src/context/AuthContext';
import LoginScreen from '@/src/screens/auth/LoginScreen';
import RegisterScreen from '@/src/screens/auth/RegisterScreen';
import HomeScreen from '@/src/screens/main/HomeScreen';
import CarDetailsScreen from '@/src/screens/main/CarDetailsScreen';
import BookingsScreen from '@/src/screens/main/BookingsScreen';
import ProfileScreen from '@/src/screens/main/ProfileScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  CarDetails: { carId: number };
  Bookings: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
        <Stack.Screen name="Bookings" component={BookingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
