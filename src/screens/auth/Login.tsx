import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Box,
  Center,
  HStack,
  Heading,
  IInputProps,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { AppInput, Btn } from '~/components/core';
import AppIcon, { IconProps } from '~/components/core/AppIcon';
import { PublicRoutesTypes } from '~/routes';

type FormInput = {
  key: string;
  label: string;
  placeholder: string;
  icon: IconProps;
  rules: Object;
  inputProps?: IInputProps;
};

type FormData = {
  [key: string]: string;
};

export default function Login(): JSX.Element {

  const WIDTH = Dimensions.get('window').width;
  const toast = useToast();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();
  const { height } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin = async ({ username, password }: FormData) => {
    try {
      toast.show({
        title: true ? 'Login Successful!' : 'Login Failed',
        duration: 5000,
      });
      console.log(username, password)
    } catch (error) {
      console.log(error);
    }
  };

  const formInputs: FormInput[] = useMemo(
    () => [
      {
        key: 'username',
        label: 'Email',
        placeholder: 'Username',
        icon: { FeatherName: 'mail' },
        rules: {
          required: 'Username is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        },
        inputProps: { keyboardType: 'email-address', autoCapitalize: 'none' },
      },
      {
        key: 'password',
        label: 'Password',
        placeholder: 'Password',
        icon: { FeatherName: 'lock' },
        rules: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        },
        inputProps: {
          secureTextEntry,
          rightElement: (
            <Btn
              colors={['#fff', '#fff']}
              _text={{ color: 'black', fontSize: 'xs' }}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            >
              {secureTextEntry ? (
                <AppIcon IoniconsName='eye-off' size={20} />
              ) : (
                <AppIcon IoniconsName='eye' size={20} />

              )}
            </Btn>

          ),
        },
      },
    ],
    [secureTextEntry],
  );

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} bg="white">
        <Center h={height} px="4">
          <VStack space={2} alignItems={'center'}>
            <Heading size={'xl'}>
              Welcome back
            </Heading>
            <Text fontSize={14} color={'gray'}>
              Please enter your details.
            </Text>
          </VStack>
          {formInputs.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}
          <Box w="full">
            <Btn
              colors={['#fff', '#fff']}
              _text={{ color: 'black', fontSize: 'sm' }}
              alignSelf={'flex-end'}
              onPress={() => navigate('ForgotPassword')}>
              Forgot Password?
            </Btn>
          </Box>
          <Btn
            w={WIDTH * 0.91}
            bg={'black'}
            onPress={handleSubmit(handleLogin)}
            my="4"
            icon={{ FeatherName: 'log-in' }}>
            <Heading size={'md'} color={'white'}>
              Login
            </Heading>

          </Btn>

          <Box w="full" justifyContent={'center'} alignItems={'center'}>
            <HStack space={3}>

              <Text fontSize={14}>
                Don't have an account ?
              </Text><Pressable onPress={() => navigate('Register')} _pressed={{ opacity: 0.5 }}>
                <Text fontSize={14} color={'blue.600'} underline>
                  Sign Up
                </Text>
              </Pressable>
            </HStack>
          </Box>

        </Center>
      </ScrollView>
    </>
  );
}
