import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack, HStack, Text, Select, CheckIcon, Input, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import PrivateContainer from '~/components/containers/PrivateContainer';
import { AppInput, Btn } from '~/components/core';
import ProgressSteps from '~/components/ProgressSteps';
import { PublicRoutesTypes } from '~/routes';

type FormData = {
    firstName: string;
    middleName: string;
    lastName: string;
    day: string;
    month: string;
    year: string;
    gender: string;
    mobileNumber: string;
    email: string;
    address: string;
    pincode: string;
    state: string;
    district: string;
};

type DistrictsType = {
    [key: string]: { label: string; value: string }[];
};

export default function Login(): JSX.Element {
    const [currentStep, setCurrentStep] = useState(1);
    const navigation = useNavigation<NativeStackNavigationProp<PublicRoutesTypes>>();
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<FormData>();

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const states = [
        { label: 'State 1', value: 'state1' },
        { label: 'State 2', value: 'state2' },
    ];

    const districts: DistrictsType = {
        state1: [
            { label: 'District 1-1', value: 'district1-1' },
            { label: 'District 1-2', value: 'district1-2' },
        ],
        state2: [
            { label: 'District 2-1', value: 'district2-1' },
            { label: 'District 2-2', value: 'district2-2' },
        ],
    };

    const handleGenderSelect = (selectedGender: string) => {
        setValue('gender', selectedGender);
    };

    const handleStateChange = (selectedState: string) => {
        setValue('state', selectedState);
        setValue('district', '');
    };

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data);
        navigation.navigate('AbhaProfile');
    };

    return (

        <PrivateContainer title="">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box px={4} py={1} bg="white">
                    <ProgressSteps currentStep={currentStep} />
                    <VStack space={4}>
                        <VStack bg="blue.50" space={4} px={4} py={4} borderRadius="2xl" shadow={1}>
                            <Text fontSize="md" fontWeight="bold" color="blue.600">Name</Text>

                            <Controller
                                control={control}
                                name="firstName"
                                rules={{ required: 'First name is required' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AppInput
                                        input={{
                                            key: 'firstName',
                                            label: 'First name',
                                            placeholder: 'First name',
                                            icon: { IoniconsName: 'person' },
                                            rules: { required: 'First name is required' }
                                        }}
                                        control={control}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        value={value}
                                        errorMessage={errors.firstName?.message}
                                    />
                                )}
                            />
                            <HStack justifyContent="space-between">
                                <Box w="48%">
                                    <Controller
                                        control={control}
                                        name="middleName"
                                        rules={{ required: 'Middle name is required' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <AppInput
                                                input={{
                                                    key: 'middleName',
                                                    label: 'Middle name',
                                                    placeholder: 'Middle name',
                                                    icon: { IoniconsName: 'person' },
                                                    rules: { required: 'Middle name is required' }
                                                }}
                                                control={control}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                value={value}
                                                errorMessage={errors.middleName?.message}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box w="48%">
                                    <Controller
                                        control={control}
                                        name="lastName"
                                        rules={{ required: 'Last name is required' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <AppInput
                                                input={{
                                                    key: 'lastName',
                                                    label: 'Last name',
                                                    placeholder: 'Last name',
                                                    icon: { IoniconsName: 'person' },
                                                    rules: { required: 'Last name is required' }
                                                }}
                                                control={control}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                value={value}
                                                errorMessage={errors.lastName?.message}
                                            />
                                        )}
                                    />
                                </Box>
                            </HStack>
                        </VStack>

                        <VStack bg={'blue.50'} space={4} px={4} py={4} borderRadius="2xl" shadow={1}>
                            <Text fontSize="md" fontWeight="bold" color={'blue.600'}>Date of Birth</Text>
                            <Text fontSize="xs" color="gray.500">Please provide DOB as per your Aadhaar</Text>
                            <VStack space={2} flex={1}>
                                <Text fontSize="sm">Year</Text>
                                <Controller
                                    control={control}
                                    name="year"
                                    rules={{ required: 'Year is required' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            bg={'white'}
                                            placeholder="Year"
                                            keyboardType="numeric"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.year && <Text color="red.500">{errors.year.message}</Text>}
                            </VStack>

                            <HStack space={3}>
                                <VStack space={2} flex={1}>
                                    <Text fontSize="sm">Day</Text>
                                    <Controller
                                        control={control}
                                        name="day"
                                        rules={{ required: 'Day is required' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Select
                                                selectedValue={value}
                                                bg={'white'}
                                                accessibilityLabel="Select Day"
                                                placeholder="Day"
                                                _selectedItem={{
                                                    borderWidth: 1,
                                                    borderColor: 'green.500',
                                                    borderRadius: 12,
                                                    endIcon: <CheckIcon color={'green.500'} size="5" />,
                                                }}
                                                mt={1}
                                                onValueChange={onChange}

                                            >
                                                {days.map((d) => (
                                                    <Select.Item key={d} label={d} value={d} />
                                                ))}
                                            </Select>
                                        )}
                                    />
                                    {errors.day && <Text color="red.500">{errors.day.message}</Text>}
                                </VStack>
                                <VStack space={2} flex={1}>
                                    <Text fontSize="sm">Month</Text>
                                    <Controller
                                        control={control}
                                        name="month"
                                        rules={{ required: 'Month is required' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Select
                                                bg={'white'}
                                                selectedValue={value}
                                                accessibilityLabel="Select Month"
                                                placeholder="Month"
                                                _selectedItem={{
                                                    borderWidth: 1,
                                                    borderColor: 'green.500',
                                                    borderRadius: 12,
                                                    endIcon: <CheckIcon color={'green.500'} size="5" />,
                                                }}
                                                mt={1}
                                                onValueChange={onChange}
                                            >
                                                {months.map((m, index) => (
                                                    <Select.Item key={index} label={m} value={m} />
                                                ))}
                                            </Select>
                                        )}
                                    />
                                    {errors.month && <Text color="red.500">{errors.month.message}</Text>}
                                </VStack>
                            </HStack>
                        </VStack>

                        <VStack bg={'blue.50'} space={4} px={4} py={4} borderRadius="2xl" shadow={1}>
                            <Text fontSize="md" fontWeight="bold" mt={4} color={'blue.500'}>Gender</Text>
                            <Controller
                                control={control}
                                name="gender"
                                rules={{ required: 'Gender is required' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <HStack space={3} justifyContent="space-between">
                                        {['Male', 'Female', 'Other'].map((g) => (
                                            <Pressable
                                                key={g}
                                                onPress={() => handleGenderSelect(g)}
                                                borderRadius="full"
                                                borderColor={value === g ? 'green.500' : 'gray.300'}
                                                px={8}
                                                py={2}
                                                bg={value === g ? 'blue.500' : 'gray.200'}
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Text color={value === g ? 'white' : 'black'}>{g}</Text>
                                            </Pressable>
                                        ))}
                                    </HStack>
                                )}
                            />
                            {errors.gender && <Text color="red.500">{errors.gender.message}</Text>}
                        </VStack>

                        <VStack bg={'blue.50'} space={4} px={4} py={4} borderRadius="2xl" shadow={1}>
                            <Text fontSize="md" fontWeight="bold" color="blue.600">Contact Details</Text>

                            <Controller
                                control={control}
                                name="mobileNumber"
                                rules={{ required: 'Mobile number is required' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AppInput
                                        input={{
                                            key: 'mobileNumber',
                                            label: 'Mobile number',
                                            placeholder: 'Mobile number',
                                            icon: { IoniconsName: 'call' },
                                            rules: {
                                                required: 'Mobile number is required',
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: 'Invalid mobile number'
                                                }
                                            }
                                        }}
                                        control={control}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        keyboardType='numeric'
                                        value={value}
                                        errorMessage={errors.mobileNumber?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AppInput
                                        input={{
                                            key: 'email',
                                            label: 'Email',
                                            placeholder: 'Email',
                                            icon: { IoniconsName: 'mail' },
                                            rules: {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            }
                                        }}
                                        control={control}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        value={value}
                                        errorMessage={errors.email?.message}
                                    />
                                )}
                            />
                        </VStack>

                        <VStack bg={'blue.50'} space={4} px={4} py={4} borderRadius="2xl" shadow={1}>
                            <Text fontSize="md" fontWeight="bold" color={'blue.600'}>Address Details</Text>

                            <VStack space={2} flex={1}>
                                <Text fontSize="sm">Address</Text>
                                <Controller
                                    control={control}
                                    name="address"
                                    rules={{ required: 'Address is required' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            bg={'white'}
                                            placeholder="Address"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.address && <Text color="red.500">{errors.address.message}</Text>}
                            </VStack>

                            <VStack space={2} flex={1}>
                                <Text fontSize="sm">PinCode</Text>
                                <Controller
                                    control={control}
                                    name="pincode"
                                    rules={{
                                        required: 'Pincode is required',
                                        pattern: {
                                            value: /^[0-9]{6}$/,
                                            message: 'Invalid pincode'
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            bg={'white'}
                                            placeholder="Pincode"
                                            keyboardType="numeric"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                {errors.pincode && <Text color="red.500">{errors.pincode.message}</Text>}
                            </VStack>

                            <VStack space={2} flex={1}>
                                <Text fontSize="sm">State</Text>
                                <Controller
                                    control={control}
                                    name="state"
                                    rules={{ required: 'State is required' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Select
                                            bg={'white'}
                                            selectedValue={value}
                                            minWidth="200"
                                            accessibilityLabel="Select State"
                                            placeholder="State"
                                            _selectedItem={{
                                                borderWidth: 1,
                                                borderColor: 'green.500',
                                                borderRadius: 12,
                                                endIcon: <CheckIcon color={'green.500'} size="5" />,
                                            }}
                                            mt={1}
                                            onValueChange={handleStateChange}
                                        >
                                            {states.map((s) => (
                                                <Select.Item key={s.value} label={s.label} value={s.value} />
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.state && <Text color="red.500">{errors.state.message}</Text>}
                            </VStack>

                            <VStack space={2} flex={1}>
                                <Text fontSize="sm">District</Text>
                                <Controller
                                    control={control}
                                    name="district"
                                    rules={{ required: 'District is required' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Select
                                            bg={'white'}
                                            selectedValue={value}
                                            minWidth="200"
                                            accessibilityLabel="Select District"
                                            placeholder="District"
                                            _selectedItem={{
                                                borderWidth: 1,
                                                borderColor: 'green.500',
                                                borderRadius: 12,
                                                endIcon: <CheckIcon color={'green.500'} size="5" />,
                                            }}
                                            mt={1}
                                            onValueChange={onChange}
                                            isDisabled={!getValues('state')}
                                        >
                                            {(districts[getValues('state')] || []).map((d) => (
                                                <Select.Item key={d.value} label={d.label} value={d.value} />
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.district && <Text color="red.500">{errors.district.message}</Text>}
                            </VStack>
                        </VStack>


                    </VStack>
                </Box>
            </ScrollView>
            <Box m={4}>

                <Btn onPress={handleSubmit(onSubmit)} bg="blue.500">
                    <Text color="white">Continue</Text>
                </Btn>
            </Box>
        </PrivateContainer>
    );
}
