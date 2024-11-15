import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import Config from 'react-native-config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EnterOtp from './EnterOtp';
import { RootStackParamList } from '../../../NavigationTypes';

interface IFormInput {
  // name: string;
  email: string;
}

const schema = Yup.object().shape({
  // name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

const NewLogin = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {

  const [sendStatus, setSendStatus] = useState(false);
  const [sid, setSid] = useState<string>('');



  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    const newData = {
      strategy: 'email_code',
      identifier: data.email,
    };

    const url = 'https://clerk.effling.com/v1/client/sign_ins';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': `Bearer ${Config.AUTH_KEY} `,
    };

    const formBody: string = Object.keys(newData)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((newData as any)[key]))
      .join('&');

    console.log(formBody);

    // Fetch the existing client or create one

    // const res = await handleClerkClient();
    // console.log('clerkClient : ', res);

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formBody,
    });

    // console.log(response.json());
    const res = await response.json();
    console.log(res);

    // console.log(res.client.sign_in.status);
    // console.log(res.client.sign_in.id);

    if (res.client.sign_in.status === 'needs_first_factor') {
      setSid(res.client.sign_in.id);
      setSendStatus(true);
      // navigation.navigate('EnterOtp');
    }


  };

  return (
    <View className="flex-1 items-center justify-center" >
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
          <Text className="text-5xl font-semibold text-center text-black">{sendStatus ? 'Enter otp' : 'Login'}</Text>
        </View>










      </View>



      {
        !sendStatus ?
          <View className="">
            <View className="mb-3">

              {
                sendStatus ? <Text className="text-md font-normal text-left">
                  Verify your Email
                </Text> : <Text className="text-md font-normal text-left">
                  Login using email
                </Text>
              }
            </View>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  // style={styles.input}
                  className=" border-[#D4D1D1] border mb-3 px-4 w-80 mx-auto md:w-[520px] rounded-lg cursor-pointer"
                />
              )}
            />
            {errors.email && <Text className="text-red mb-4 text-center text-red-800">{errors.email.message}</Text>}

            <TouchableOpacity className=" rounded-full py-2 w-80 md:w-[520px] mx-auto bg-[#0C9352] " onPress={handleSubmit(onSubmit)} >
              <Text className="text-center font-semibold text-lg text-white">Login</Text>
            </TouchableOpacity>

          </View> :

          <View>
            <EnterOtp stack="Home" redirect={'HomeScreen'} path={`v1/client/sign_ins/${sid}/attempt_first_factor?_is_native=true`} navigation={navigation} />
          </View>
      }

      <View className="p-3" >
        <Text className="text-center">Don't have an account? <Text onPress={() => {
          navigation.navigate('Auth', {
            screen: 'Register',
          });
        }} className="font-bold text-[#0C9352] text-black">Register</Text></Text>
      </View>

    </View>
  );
};

export default NewLogin;
