import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Box, VStack, HStack, Text, Input, Pressable, Heading } from 'native-base';
import { AppIcon, Btn, Content } from '~/components/core';
import PrivateContainer from '~/components/containers/PrivateContainer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublicRoutesTypes } from '~/routes';
import { useNavigation } from '@react-navigation/native';
import ProgressSteps from '~/components/ProgressSteps';
import { screenWidth } from '~/styles';
import { useDispatch } from 'react-redux';
import { setAbhaAddress } from '../../../redux/abhaSlice';

export default function AbhaProfile(): JSX.Element {
    const [abhaAddress, setAbhaAddressLocal] = useState('');
    const [suggestions, setSuggestions] = useState(['Dgra3414', 'Dgra3417', 'Dgra3418', 'Dgra3419', 'Dgra3420']);
    const [isValid, setIsValid] = useState(true);
    const dispatch = useDispatch();

    const handleAbhaChange = (text: string) => {
        setAbhaAddressLocal(text);
        validateAbha(text);
    };

    const validateAbha = (text: string) => {
        const maxLength = 18;
        const regex = /^(?!.*[._]{2})(?!.*[._]$)(?!^[._])(?!.*[^\w.])(?!.*[_]{2})[a-zA-Z0-9._]{5,18}$/;
        const isValidAbha = text.length <= maxLength && regex.test(text);
        setIsValid(isValidAbha);
    };

    const handleSuggestionSelect = (suggestion: string) => {
        setAbhaAddressLocal(suggestion);
        validateAbha(suggestion);
    };

    const handleSubmit = () => {
        if (isValid) {
            console.log('ABHA Address:', abhaAddress);
            dispatch(setAbhaAddress(abhaAddress)); // Dispatch the action
            navigate('CreatePassword');
        }
    };

    const { navigate } =
        useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();
    const [currentStep, setCurrentStep] = useState(2);

    return (
        <PrivateContainer title={'Create User Name'} bgColor={'blue.100'}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <VStack space={5}>
                    <Box bg={'blue.100'}>
                        {/* Progress Steps Component */}
                        <Box mx={8}>
                            <ProgressSteps currentStep={currentStep} />
                        </Box>

                        <Box w={screenWidth}>
                            <Box m={6}>
                                <Heading fontSize={24} color={'blue.700'}>
                                    Congratulations!
                                </Heading>
                                <Box mt={2}>
                                    <Content bold fontSize={12}>
                                        You have successfully created your ABHA number
                                    </Content>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Text mx={6} fontSize="lg" fontWeight="bold">Create your ABHA address</Text>

                    <Box px={4} bg="white" flex={1} justifyContent="center">
                        <VStack space={4} py={4} px={4} borderRadius="2xl" shadow={1} bg="blue.50">
                            <HStack
                                borderWidth={1}
                                borderColor={'blue.200'}
                                alignItems="center" bg="white" borderRadius="md" px={2}>
                                <Input
                                    flex={1}
                                    bg={'white'}
                                    value={abhaAddress}
                                    onChangeText={handleAbhaChange}
                                    placeholder="Enter ABHA address"
                                    borderWidth={0}
                                />
                                <Text color="gray.500" ml={2}>@abdm</Text>
                            </HStack>

                            {abhaAddress.length > 0 && (
                                isValid ? (
                                    <Text color="green.500">This ABHA address is available</Text>
                                ) : (
                                    <Text color="red.500">This ABHA address is not valid</Text>
                                )
                            )}

                            <Text fontSize="sm" color="gray.600">Suggestions</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {suggestions.map((item, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => handleSuggestionSelect(item)}
                                        px={3}
                                        py={1}
                                        bg={abhaAddress === item ? 'blue.100' : 'white'}
                                        borderRadius={10}
                                        alignItems="center"
                                        justifyContent="center"
                                        m={1}
                                        borderWidth={1}
                                        borderColor={'gray.300'}>
                                        <HStack alignItems="center" space={2}>
                                            {abhaAddress === item && (
                                                <AppIcon IoniconsName={'checkmark'} color="blue" size={18} />
                                            )}
                                            <Text color={abhaAddress === item ? 'blue.700' : 'black'}>{item}</Text>
                                            {abhaAddress === item && (
                                                <AppIcon IoniconsName={'checkmark'} color="blue" size={18} />
                                            )}
                                        </HStack>
                                    </Pressable>
                                ))}
                            </View>
                        </VStack>
                    </Box>
                </VStack>
            </ScrollView>

            <Box m={4}>
                <Btn onPress={handleSubmit} bg="blue.500">
                    <Text color="white">Continue</Text>
                </Btn>
            </Box>
        </PrivateContainer>
    );
}
