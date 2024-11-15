import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginV2 from '../../components/auth/Loginv2';
import Register from '../../components/auth/Register';
import { AuthStackParamList } from '../../../NavigationTypes';


const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginV2} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
