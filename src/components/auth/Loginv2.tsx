import React, { useEffect } from 'react';
import {
  Image,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NewLogin from './NewLogin';
import { RootStackParamList } from '../../../NavigationTypes';
import { getToken } from '../../../lib/tokenstore';


type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

function LoginV2({ navigation }: Props) {

  useEffect(() => {
    const checkSession = async () => {
      const session = await getToken('session_id')
      const token_expiry = await getToken('session_expiry');
      const now = new Date().getTime();

      console.log('session', session);
      console.log('token_expiry', token_expiry);
      if (session && token_expiry && now < parseInt(token_expiry, 10)) {
        // Navigate to Dashboard if token exists
        // navigation.navigate('Dashboard');
        navigation.navigate('Home', { screen: 'HomeScreen' });

      }
    };

    checkSession();
  }, [navigation]);


  return (
    <View

      className="bg-white flex-1 items-center justify-center relative w-full h-full"
    >
      <View
        className=" w-full h-44 right-[-250] md:right-[-600] top-[-64] rounded-full bg-[#EDFFF6] absolute"
      />
      <Image
        source={{ uri: 'https://cdn.effling.com/images/teddypier.png' }}
        className="absolute w-44 h-64 right-0 top-10"
        height={500}
        width={500}
      />
      <View>

        <NewLogin navigation={navigation} />

      </View>
    </View>
  );
}


export default LoginV2;
