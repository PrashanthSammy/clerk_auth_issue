import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { Alert } from 'react-native';
import { RootStackParamList } from '../../../NavigationTypes';
import RegisterForm from './RegisterForm';
import { getToken } from '../../../lib/tokenstore';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;


const Register = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {

  useEffect(() => {
    const checkSession = async () => {
      const session = await getToken('session_id')
      const token_expiry = await getToken('session_expiry');
      const now = new Date().getTime();

      console.log('session', session);
      console.log('token_expiry', token_expiry);
      if (session && token_expiry && now < parseInt(token_expiry, 10)) {
        // Navigate to Dashboard if token exists
        navigation.navigate('Home', { screen: 'HomeScreen' });
        // console.log('Redirect to Dashboard');
      }
    };

    checkSession();
  }, [navigation]);


  return (
    <View className="flex-1 items-center justify-center relative" >

      <View
        className=" w-full h-44 right-[-250] md:right-[-600] top-[-64] rounded-full bg-[#EDFFF6] absolute"
      />
      <Image
        source={{ uri: 'https://cdn.effling.com/images/teddypier.png' }}
        className="absolute w-44 h-64 right-0 top-10"
        height={500}
        width={500}
      />
      <View className="mb-7 spcae-y-14 ">
        {/* <View
          className="h-32"
        >
          <Image
            source={{ uri: 'https://cdn.effling.com/images/Logo1.png' }}
            height={500}
            width={500}
            className="mx-auto w-full h-full"
          />
        </View> */}

        <View>
          <Text className="text-5xl font-semibold text-center text-black">Register</Text>
        </View>




        {/* <Text className="text-xl font-light text-center">
          signup with a new account
        </Text> */}






      </View>





      <RegisterForm navigation={navigation} />


      <View className="p-3" >
        <Text className="text-center">Already have an account? <Text onPress={() => {
          navigation.navigate('Auth', { screen: 'Login' });
        }} className="font-bold text-[#0C9352] text-black">Login</Text></Text>
      </View>

    </View>
  );
};

export default Register;
