import React from 'react';
import { View, Text } from 'react-native';

export default function Placeholder({ text = 'Placeholder' }: { text?: string }) {
  return (
    <View style={{ padding: 12, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{text}</Text>
    </View>
  );
}
