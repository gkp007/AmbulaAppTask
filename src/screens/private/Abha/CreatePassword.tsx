import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack, HStack, Text, Input, Pressable, Icon, Heading, Modal, Button } from 'native-base';
import { AppIcon, Btn, Content } from '~/components/core';
import PrivateContainer from '~/components/containers/PrivateContainer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublicRoutesTypes } from '~/routes';
import { useNavigation } from '@react-navigation/native';
import ProgressSteps from '~/components/ProgressSteps';
import { screenWidth } from '~/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export default function CreatePassword(): JSX.Element {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordStarted, setPasswordStarted] = useState(false);
    const [confirmPasswordStarted, setConfirmPasswordStarted] = useState(false);

    const abhaAddress = useSelector((state: RootState) => state.abha.abhaAddress);

    const validatePassword = (password: string) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const noSpaces = !/\s/.test(password);
        const noConsecutiveChars = !/(.)\1{2,}/.test(password) && !/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789|890)/.test(password);
        const passwordsMatch = password === confirmPassword;

        return {
            minLength,
            hasUpperCase,
            hasLowerCase,
            hasDigit,
            hasSymbol,
            noSpaces,
            noConsecutiveChars,
            passwordsMatch
        };
    };

    const validations = validatePassword(password);

    const { navigate } =
        useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();

    const handleSubmit = () => {
        if (Object.values(validations).every(Boolean)) {
            console.log('Password:', password);
            setShowModal(true)
            // navigate('PersonlDetails');
        }
    };

    const [currentStep, setCurrentStep] = useState(2);
    const [showModal, setShowModal] = useState(false);

    return (
        <PrivateContainer bgColor="blue.100" >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box bg={'blue.100'}>
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
                <VStack space={5} px={4} py={4}>

                    <VStack space={4} bg="white" borderRadius="2xl" shadow={1} p={4}>

                        <Text fontSize="lg" fontWeight="bold" color={'gray.500'}>Create password</Text>

                        <HStack
                            borderWidth={1}
                            borderColor={'blue.200'}
                            alignItems="center" bg="white" borderRadius="md" px={2}>
                            <Input
                                flex={1}
                                bg={'white'}
                                _focus={{
                                    bg: 'white',
                                }}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordStarted(true);
                                }}
                                placeholder="Enter Password"
                                borderWidth={0}
                                type={passwordVisible ? "text" : "password"}
                            />
                            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                                <AppIcon IoniconsName={passwordVisible ? "eye" : "eye-off"} size={20} color="gray.500" />
                            </Pressable>
                        </HStack>

                        <HStack
                            borderWidth={1}
                            borderColor={'blue.200'}
                            alignItems="center" bg="white" borderRadius="md" px={2}>
                            <Input
                                flex={1}
                                bg={'white'}
                                value={confirmPassword}
                                onChangeText={(text) => {
                                    setConfirmPassword(text);
                                    setConfirmPasswordStarted(true);
                                }}
                                placeholder="Confirm Password"
                                borderWidth={0}
                                type={confirmPasswordVisible ? "text" : "password"}
                            />
                            <Pressable onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                <AppIcon IoniconsName={confirmPasswordVisible ? "eye" : "eye-off"} size={20} color="gray.500" />
                            </Pressable>
                        </HStack>

                        {confirmPasswordStarted && (
                            <Text fontSize="sm" color={validations.passwordsMatch ? "green.500" : "red.500"}>
                                {validations.passwordsMatch ? "Password Matched" : "Password Not Matched"}
                            </Text>
                        )}

                        {passwordStarted && (
                            <VStack space={2} borderWidth={1} borderColor="gray.200" borderRadius="md" p={4}>
                                <ValidationCheck isValid={validations.minLength} label="8 characters or longer" />
                                <ValidationCheck isValid={validations.hasUpperCase} label="One A-Z" />
                                <ValidationCheck isValid={validations.hasLowerCase} label="One a-z" />
                                <ValidationCheck isValid={validations.hasDigit} label="One 0-9" />
                                <ValidationCheck isValid={validations.hasSymbol} label="At least one symbol" />
                                <ValidationCheck isValid={validations.noSpaces && validations.noConsecutiveChars} label="No space and no more than 2 consecutive characters or keyboard keys" />
                                <ValidationCheck isValid={validations.passwordsMatch} label="Password and Confirm Password matched" />
                            </VStack>
                        )}

                        <Box>
                            <Btn onPress={handleSubmit} bg="blue.500">
                                <Text color="white" bold>Continue</Text>
                            </Btn>
                        </Box>

                        <Box>
                            <Btn onPress={() => navigate('SkipPassword')} bg="white" borderColor={'blue.600'} borderWidth={1}>
                                <Text color="blue.600" bold>Skip for now</Text>
                            </Btn>
                        </Box>

                    </VStack>


                </VStack>
            </ScrollView>


            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px" p={5} borderRadius={20} shadow={1}>
                    <VStack alignItems={'center'} space={2} m={3}>
                        <AppIcon IoniconsName='checkmark-circle-sharp' size={50} color={'green'} />
                        <Heading fontSize={20}>
                            Congratulations!
                        </Heading>
                        <Text fontSize={16} bold>ABHA Address</Text>
                        <Text fontSize={16} bold color={'red.500'}>{abhaAddress}@abdm</Text>
                        <Text fontSize={16} bold>is created successfully</Text>

                    </VStack>
                    <Button.Group space={2}>
                        <Box w={'full'}>
                            <Btn onPress={() => { setShowModal(false) }} bg="blue.600">
                                <Text color="white" bold>Login</Text>
                            </Btn>
                        </Box>

                    </Button.Group>
                </Modal.Content>
            </Modal>



        </PrivateContainer>
    );
}

const ValidationCheck = ({ isValid, label }: { isValid: boolean; label: string }) => {
    return (
        <HStack alignItems="center" space={2}>
            <AppIcon size={18} IoniconsName={isValid ? "checkmark" : "close"} color={isValid ? "green.500" : "red.500"} />
            <Text color={isValid ? "green.500" : "red.500"}>{label}</Text>
        </HStack>
    );
};
