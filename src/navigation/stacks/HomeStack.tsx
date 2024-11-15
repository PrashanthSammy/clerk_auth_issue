import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../../../NavigationTypes';
import Home2 from '../../components/home/Home2';

const Stack = createStackNavigator<HomeStackParamList>();

function HomeNavigator() {

  return (
    // <Suspense fallback={<Text>Loading...</Text>}>
    // <BackgroundSoundProvider>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home2} />
    </Stack.Navigator>
    // </BackgroundSoundProvider>
    // </Suspense>
  );
}

export default HomeNavigator;
