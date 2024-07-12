import React, { useMemo, useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { Box, VStack, HStack, Heading, Text, Pressable, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import PrivateContainer from '~/components/containers/PrivateContainer';
import { AppIcon, AppInput, Btn, Content } from '~/components/core';
import ProgressSteps from '~/components/ProgressSteps';
import { PublicRoutesTypes } from '~/routes';
import { COLORS, screenHeight, screenWidth } from '~/styles';

type FormInput = {
    key: string;
    label?: string;
    placeholder: string;
    icon: any;
    rules: {
        required: string;
        pattern: {
            value: RegExp;
            message: string;
        };
    };
    inputProps?: any;
};

type FormData = {
    mobile?: string;
    aadhar?: string;
};

export default function Login(): JSX.Element {
    const toast = useToast();
    const [isPhone, setIsPhone] = useState(true);
    const { navigate } = useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();
    const { height } = useWindowDimensions();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();

    const validateMobileOrAadhar = (values: FormData): boolean => {
        return Boolean(values.mobile) || Boolean(values.aadhar);
    };

    const formInputs: FormInput[] = useMemo(() => [
        {
            key: 'mobile',
            label: undefined,
            placeholder: 'Enter your mobile number',
            icon: { IoniconsName: 'call', color: 'gray' },
            rules: {
                required: 'Either mobile number or Aadhar is required',
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Invalid mobile number',
                },
            },
            inputProps: {
                keyboardType: 'numeric',
                autoCapitalize: 'none',
            },
        },
    ], []);

    const formInputs1: FormInput[] = useMemo(() => [
        {
            key: 'aadhar',
            label: undefined,
            placeholder: 'Aadhar',
            icon: { entypoName: 'rss', color: 'red.300' },
            rules: {
                required: 'Either mobile number or Aadhar is required',
                pattern: {
                    value: /^[0-9]{12}$/,
                    message: 'Invalid Aadhar number',
                },
            },
            inputProps: {
                keyboardType: 'numeric',
                autoCapitalize: 'none',
            },
        },
    ], []);

    const [currentStep, setCurrentStep] = useState(0);

    const onSubmit = (data: FormData) => {
        if (validateMobileOrAadhar(data)) {
            navigate('OtpScreen');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <PrivateContainer bgColor={'blue.100'}>
                <Box zIndex={1} alignItems={'center'} h={screenHeight}>
                    <VStack>
                        <Box bg={'blue.100'}>
                            <Box mx={8} mb={5}>
                                <ProgressSteps currentStep={currentStep} />
                            </Box>
                            <Box w={screenWidth}>
                                <Box m={6}>
                                    <Heading fontSize={28} color={'blue.600'}>
                                        Welcome!
                                    </Heading>
                                    <Box mt={2}>
                                        <Content bold fontSize={14}>
                                            You are about to create your ABHA number
                                        </Content>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box borderColor={'blue.200'} borderWidth={1} borderRadius={24} m={6} bg={'white'} shadow={1}>
                            <VStack space={5} mt={5}>
                                <HStack justifyContent={'center'}>
                                    <Pressable
                                        _pressed={{ opacity: 0.8 }}
                                        w={'45%'}
                                        mx={2}
                                        py={1.5}
                                        onPress={() => {
                                            setIsPhone(false);
                                        }}
                                        borderRadius={6}
                                        borderBottomColor={isPhone ? 'white' : 'blue.500'}
                                        alignSelf={'center'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        borderBottomWidth={1.5}>
                                        <HStack alignItems={'center'} justifyContent={'center'} space={3}>
                                            <Heading fontSize={15} py={1} color={isPhone ? 'black' : 'blue.600'}>
                                                Aadhar
                                            </Heading>
                                        </HStack>
                                    </Pressable>
                                    <Pressable
                                        _pressed={{ opacity: 0.8 }}
                                        w={'45%'}
                                        mx={2}
                                        py={1.5}
                                        onPress={() => {
                                            setIsPhone(true);
                                            setCurrentStep(0);
                                        }}
                                        borderColor={isPhone ? 'blue.600' : 'white'}
                                        borderRadius={6}
                                        borderBottomColor={!isPhone ? 'white' : 'blue.500'}
                                        alignSelf={'center'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        borderBottomWidth={1.5}>
                                        <HStack alignItems={'center'} justifyContent={'center'} space={3}>
                                            <Heading fontSize={15} py={1} color={isPhone ? 'blue.500' : 'black'}>
                                                Phone
                                            </Heading>
                                        </HStack>
                                    </Pressable>
                                </HStack>

                                {!isPhone ? (
                                    <VStack space={2}>
                                        <Box px="4">
                                            {formInputs1.map(input => (
                                                <AppInput
                                                    input={input}
                                                    key={input.key}
                                                    control={control}
                                                    errorMessage={errors?.[input?.key]?.message}
                                                />
                                            ))}
                                        </Box>
                                    </VStack>
                                ) : (
                                    <VStack space={2}>
                                        <Box px="4">
                                            {formInputs.map(input => (
                                                <AppInput
                                                    input={input}
                                                    key={input.key}
                                                    control={control}
                                                    errorMessage={errors?.[input?.key]?.message}
                                                    leftElement={
                                                        <Box bg={'blue.100'} p={3} ml={-2} borderBottomLeftRadius={3} borderTopLeftRadius={3}>
                                                            <Text bold color={'blue.600'}>+91</Text>
                                                        </Box>
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    </VStack>
                                )}

                                <Box m={4}>
                                    <HStack space={3} alignItems={'center'} mb={5} m={4}>
                                        <Box>
                                            <AppIcon AntDesignName="exclamationcircle" color={'red'} size={22} />
                                        </Box>
                                        <Box>
                                            <Text fontSize={12} color={'red.500'} bold>
                                                You will have to complete KYC verification later to get the ABHA number
                                            </Text>
                                        </Box>
                                    </HStack>

                                    <Btn
                                        onPress={handleSubmit(onSubmit)}
                                        bg={'blue.600'}
                                        _text={{ color: 'white', fontSize: 'sm' }}
                                        shadow={0.8}>
                                        <Heading fontSize={15} py={1} color={'white'}>
                                            Continue
                                        </Heading>
                                    </Btn>
                                </Box>
                            </VStack>
                        </Box>

                        <Box alignItems="center" flexDirection="row" justifyContent={'center'}>
                            <Text fontSize="16" fontWeight="400">Already have an ABHA Number?</Text>
                            <Btn
                                colors={['#fff', '#fff']}
                                _text={{
                                    fontSize: 'md',
                                    fontWeight: 'extrabold',
                                    color: 'blue.500',
                                    mt: 1,
                                }}
                                onPress={() => navigate('Register')}>
                                Click here
                            </Btn>
                        </Box>
                    </VStack>
                </Box>
            </PrivateContainer>
        </ScrollView>
    );
}
