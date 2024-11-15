import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EnterOtp from '../auth/EnterOtp';
import { styled } from 'nativewind';
import { AUTH_KEY } from '@env';
import { RootStackParamList } from '../../../NavigationTypes';

interface IFormInput {
  username: string;
  email: string;
  // password: string
  phonenumber: string;
}

const schema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  // password: Yup.string().required('Please enter a password'),
  phonenumber: Yup.string().required('Please enter a phone number'),
});

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;


const RegisterForm = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {

  const [sendStatus, setSendStatus] = useState(false);
  const [sid, setSid] = useState<string>('');
  const [checked, setChecked] = useState(false);


  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const Checkbox = styled(TouchableOpacity);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    const newData = {
      strategy: 'email_code',
      username: data.username,
      email_address: data.email,
      unSafeMetaData: {
        phone_number: data.phonenumber,
      },
    };

    const url = 'https://clerk.effling.com/v1/client/sign_ups?_is_native=true';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${AUTH_KEY}`,
    };

    const formBody: string = Object.keys(newData)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((newData as any)[key]))
      .join('&');

    console.log(formBody);

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formBody,
    });

    // console.log(response.json());
    const res = await response.json();
    console.log(res);



    if (res.client.sign_up.id) {
      setSid(res.client.sign_up.id);
      setSendStatus(true);
    }


  };

  return (
    <View className="flex items-center justify-center" >
      {
        !sendStatus ?
          <View className="">
            <View className="flex md:flex-row justify-between">

              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text className="text-lg font-normal text-left mb-3">
                      Name
                    </Text>
                    <TextInput
                      placeholder="Enter your username"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      // style={styles.input}
                      className=" border-[#D4D1D1] border mb-3 w-80 md:w-[240px] px-4 rounded-lg cursor-pointer"
                    />
                  </View>
                )}
              />
              {errors.username && <Text className="text-red mb-4 text-center text-red-800">{errors.username.message}</Text>}


              <Controller
                control={control}
                name="phonenumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text className="text-lg font-normal text-left mb-3">
                      Mobile Number
                    </Text>
                    <TextInput
                      placeholder="Enter your phonenumber"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      // style={styles.input}
                      className=" border-[#D4D1D1] border mb-3 w-80 md:w-[240px] px-4 rounded-lg cursor-pointer"
                    />
                  </View>
                )}
              />
              {errors.phonenumber && <Text className="text-red mb-4 text-center text-red-800">{errors.phonenumber.message}</Text>}


            </View>





            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text className="text-lg font-normal text-left mb-3">
                    Email
                  </Text>
                  <TextInput
                    placeholder="Enter your email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    // style={styles.input}
                    className=" border-[#D4D1D1] border mb-3 w-80 md:w-[520px] px-4 rounded-lg cursor-pointer"
                  />
                </View>
              )}
            />
            {errors.email && <Text className="text-red mb-4 text-center text-red-800">{errors.email.message}</Text>}
            <View className="flex flex-row p-4">
              <Checkbox
                className={`w-6 h-6 rounded border-2 ${checked ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`}
                onPress={() => setChecked(!checked)}
              />
              <Text className="ml-2 text-gray-700">I read and accept
                <Text className=" text-[#0C9352]">
                  {' '}terms and conditions
                </Text>
              </Text>
            </View>

            <TouchableOpacity className="rounded-full py-2 w-80 md:w-[520px] mx-auto bg-[#0C9352]" onPress={handleSubmit(onSubmit)} >
              <Text className="text-center font-semibold text-lg text-white">Next</Text>
            </TouchableOpacity>



          </View> :

          <View>
            <EnterOtp stack={'Dashboard'} redirect={'Dashboard'} path={`https://clerk.effling.com/v1/client/sign_ups/${sid}/attempt_verification?_is_native=true`} navigation={navigation} />
          </View>
      }

    </View>
  );
};

export default RegisterForm
  ;
