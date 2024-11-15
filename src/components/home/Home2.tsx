import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-[#0CB865] h-full justify-center items-center">
      <View className="flex-1 items-center justify-center">
        <Text>
          HomeScreen
        </Text>
      </View>
    </SafeAreaView>
  );
}
