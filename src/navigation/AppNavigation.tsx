import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './stacks/AuthStack';
import { SafeAreaView } from 'react-native';
import HomeNavigator from './stacks/HomeStack';
import { RootStackParamList } from '../../NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {

  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default AppNavigator;
