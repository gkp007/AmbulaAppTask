import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Alert, useWindowDimensions } from 'react-native';
import { Box, VStack, HStack, Text, Input, Image, Pressable, Heading } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { Btn } from '~/components/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublicRoutesTypes } from '~/routes';
import { useNavigation } from '@react-navigation/native';
import PrivateContainer from '~/components/containers/PrivateContainer';

const OTPEntry = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [resendTime, setResendTime] = useState(59);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const { height } = useWindowDimensions();
    const inputRefs = Array(6).fill(null).map(() => useRef(null));

    useEffect(() => {
        let timer;
        if (resendTime > 0) {
            timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
        } else {
            setIsResendDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [resendTime]);

    const onSubmit = data => {
        const enteredOTP = Object.values(data.otp).join('');
        if (enteredOTP === '123456') {
            Alert.alert("Success", "OTP verified successfully!");
            navigate('PersonlDetails');
        } else {
            Alert.alert("Error", "Invalid OTP");
        }
    };

    const handleChange = (text, index) => {
        if (text.length === 1 && index < 5) {
            inputRefs[index + 1].current.focus();
        } else if (text.length === 0 && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const { navigate } =
        useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();

    return (
        <PrivateContainer title={'OTP Verification'}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <VStack bg={'white'} flex={1} justifyContent="center" alignItems="center" p={5}>
                    <Box alignItems="center" mb={6}>
                        <Image source={{ uri: 'https://t3.ftcdn.net/jpg/04/85/88/50/240_F_485885026_acbxmU49KiUSksagXHqGgO262uMklSRr.jpg' }} alt="OTP Image" size="2xl" />
                        <Text mt={4} fontSize="lg" textAlign="center">
                            Please enter the 6 digit verification code sent to mobile number ******8263
                        </Text>
                    </Box>
                    <Box width="100%" mb={100}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <HStack space={2} justifyContent="center">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <Input
                                            key={index}
                                            onChangeText={text => {
                                                onChange({ ...value, [index]: text });
                                                handleChange(text, index);
                                            }}
                                            value={value?.[index] || ''}
                                            ref={inputRefs[index]}
                                            width={12}
                                            height={12}
                                            textAlign="center"
                                            fontSize="2xl"
                                            maxLength={1}
                                            borderRadius={10}
                                            keyboardType="number-pad"
                                            variant="outline"
                                            bg={'gray.100'}
                                            _focus={{
                                                backgroundColor: 'white',
                                                borderColor: 'blue.600',
                                                borderWidth: 1
                                            }}
                                        />
                                    ))}
                                </HStack>
                            )}
                            name="otp"
                            rules={{
                                validate: value => {
                                    const otp = Object.values(value || {}).join('');
                                    return otp.length === 6 || 'OTP must be 6 digits';
                                }
                            }}
                            defaultValue={{}}
                        />
                        {errors.otp && <Text color="red.500">{errors.otp.message}</Text>}

                        <Btn
                            onPress={handleSubmit(onSubmit)}
                            bg={'blue.600'}
                            mt={5}
                            _text={{ color: 'white', fontSize: 'sm' }}
                            shadow={0.8}>

                            <Heading fontSize={15} py={1} color={'white'}>
                                Verify and continue
                            </Heading>

                        </Btn>
                        <HStack justifyContent="space-between" mt={4}>
                            <Text >Didn’t receive OTP?</Text>
                            <Pressable
                                onPress={() => {
                                    if (!isResendDisabled) {
                                        setResendTime(59);
                                        setIsResendDisabled(true);
                                        // Handle resend OTP
                                    }
                                }}
                                disabled={isResendDisabled}
                            >
                                <Text bold color="blue.500" ml={2}>
                                    Resend OTP in <Text color={'gray.500'}>  {resendTime}s </Text>
                                </Text>
                            </Pressable>
                        </HStack>
                    </Box>


                    <Box alignItems="center" position={'absolute'} bottom={5}>
                        <Text fontSize="md" color={'gray.500'}>Approved & Authorized By</Text>
                        <HStack space={2} mt={2}>
                            <Image source={{ uri: 'https://pmjay.qcin.org/assets/img/nha-img/about_nha_pg_logo.png' }} alt="Authority 1 Logo" h={10} w={'40%'} />
                            <Image source={{ uri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjANL8ULxmy1RCX81wehGK9Z676l69yWBX-Bu8_DB-Iuu1242qZdU6wfQizj7DeuYlTzbGIOPuzmMMvw1bDDhkBlKjSlmGHzO1_NtXavYICup2WNMpNzQX9xblvKiOrY5pXhCsRYV1awADHUxgk0_6UpY_LBqHI_lAIT3rE3_8q3Jbop_-Z5bgOjGMmcv-y/w1200-h630-p-k-no-nu/images%20(6).jpeg' }} alt="Authority 2 Logo" h={10} w={'22%'} />
                        </HStack>
                    </Box>
                </VStack>
            </ScrollView>
        </PrivateContainer>
    );
};

export default OTPEntry;
