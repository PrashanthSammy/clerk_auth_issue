import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AUTH_KEY } from '@env';
// import axios from 'axios';
import { RootStackParamList } from '../../../NavigationTypes';
import { storeToken } from '../../../lib/tokenstore';
interface IFormInput {
  code: string;
}

const schema = Yup.object().shape({
  code: Yup.string().required('please enter the code.'),
});

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;


const EnterOtp = ({ navigation, path, redirect, stack }: { navigation: HomeScreenNavigationProp, path: string, redirect: any, stack: any }) => {

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    const newData = {
      strategy: 'email_code',
      code: data.code,
    };

    console.log('url', path);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${AUTH_KEY}`,
    };

    const formBody: string = Object.keys(newData)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((newData as any)[key]))
      .join('&');

    console.log(formBody);

    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: headers,
        body: formBody,
      });

      console.log(response, "response");
      const res = await response.json();
      console.log(res, "res")
      console.log(res);
      console.log(res.response.status);
      console.log(res.client);
      console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
      console.log(res.client.sessions);
      console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
      console.log(res.client.sessions[0].id);

      console.log(res.client.sign_in.status);

      if (res.response.status === 'complete') {
        navigation.navigate(stack, { screen: redirect });
        storeToken('session_id', res.client.sessions[0].id);
        storeToken('session_token', res.client.sessions[0].last_active_token.jwt);
        storeToken('session_expiry', res.client.sessions[0].expire_at);
      }

      // axios.post(path, formBody, {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Authorization': 'Bearer sk_live_PBzVICCTmYZ1fahNY5wIMHuMRkoEDcqBEhQqtE7kUZ',
      //   },
      // })
      //   .then(response => {
      //     console.log("response", response);
      //   })
      //   .catch(error => {
      //     console.error("error", error);
      //   });




    } catch (error) {
      console.log(error);
    }


  };

  return (
    <View className="" >

      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter verification code"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            // style={styles.input}
            className=" border-[#D4D1D1] border mb-3 w-80 px-4 rounded-lg cursor-pointer"
          />
        )}
      />
      {errors.code && <Text className="text-red mb-4 text-center text-red-800">{errors.code.message}</Text>}

      <TouchableOpacity className=" rounded-lg py-2 w-60 mx-auto bg-[#0C9352] " onPress={handleSubmit(onSubmit)} >
        <Text className="text-center font-medium text-lg text-white">Submit</Text>
      </TouchableOpacity>


    </View>
  );
};

export default EnterOtp;
