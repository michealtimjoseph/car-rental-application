import React, { useState } from 'react';
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Native Expo vector icons used for lightweight, scalable UI graphics without external image assets
import { Ionicons } from '@expo/vector-icons'; 

import { useAuth } from '@/src/context/AuthContext';
import type { RootStackParamList } from '@/src/navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');

  const handleLogin = async () => {
    // Authenticate user against context before navigating to prevent unauthorized access to main stack
    await login({ email, password });
    navigation.replace('Home');
  };

  return (
    // KeyboardAvoidingView prevents the on-screen keyboard from obscuring the input fields
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Visual Header / Logo Area */}
      <View style={styles.logoContainer}>
        <Ionicons name="car-sport" size={72} color="#1E3A8A" />
        <Text style={styles.appName}>Drive<Text style={styles.appNameHighlight}>Now</Text></Text>
        <Text style={styles.subtitle}>Smart Fleet Management</Text>
      </View>

      {/* Authentication Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
          />
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Routing to Registration Stack */}
        <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerTextBold}>Register here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// StyleSheet isolates UI definitions from component logic, functioning similarly to CSS classes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Trust & Tech: Off-White background
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1E3A8A', // Trust & Tech: Deep Navy
    marginTop: 12,
    letterSpacing: -0.5,
  },
  appNameHighlight: {
    color: '#3B82F6', // Trust & Tech: Electric Blue
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
  },
  loginButton: {
    backgroundColor: '#3B82F6', // Trust & Tech: Electric Blue
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  registerLink: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 10,
  },
  registerText: {
    color: '#64748B',
    fontSize: 14,
  },
  registerTextBold: {
    color: '#1E3A8A',
    fontWeight: '700',
  },
});