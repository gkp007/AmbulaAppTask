import React from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack, HStack, Text, Button, Icon } from 'native-base';
import PrivateContainer from '~/components/containers/PrivateContainer';
import { AppIcon } from '~/components/core';
import { StackAndTabType } from '~/routes/private/types';
import { useNavigation } from '@react-navigation/native';

interface ServiceButtonProps {
    icon: string;
    label: string;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({ icon, label }) => (
    <Box
        flexBasis="30%"
        borderRadius="lg"
        bg="white"
        p={4}
        alignItems="center"
        justifyContent="center"
        shadow={1}
        mb={2}

    >
        <AppIcon MaterialIconsName={icon} color="blue.500" mb={2} />
        <Text mt={2} textAlign="center" fontSize={11}>{label}</Text>
    </Box>
);



const HomeScreen: React.FC = () => {

    const { navigate } = useNavigation<StackAndTabType>();

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
            <Box mb={4}>
                <HStack justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xl" bold>AMBULA</Text>
                    <HStack space={4}>
                        <AppIcon FontAwesomeName="bell" color="gray.500" />
                        <AppIcon FontAwesomeName="user" color="gray.500" />
                    </HStack>
                </HStack>
            </Box>

            <Box mb={4}>
                <Text bold mb={2}>ABHA Services</Text>
                <HStack space={2} flexWrap="wrap" justifyContent="space-between">
                    <ServiceButton icon="create" label="Create ABHA" />
                    <ServiceButton icon="book" label="My Health Records" />
                    <ServiceButton icon="qr-code" label="Scan for OPD Booking" />
                </HStack>
            </Box>

            <Box mb={4}>
                <Text bold mb={2}>Our Services</Text>
                <HStack space={2} flexWrap="wrap" justifyContent="space-between">
                    <ServiceButton icon="doctor" label="Doctor Appointment" />
                    <ServiceButton icon="flask" label="Book Lab Test" />
                    <ServiceButton icon="insurance" label="Health Insurance" />
                    <ServiceButton icon="medicine" label="Order Medicines" />
                    <ServiceButton icon="home" label="Book Home Care" />
                    <ServiceButton icon="ambulance" label="Book Ambulance" />
                </HStack>
            </Box>

            <Box borderRadius="lg" bg="white" p={4} shadow={2}>
                <Text bold mb={2} color={'blue.500'}>Create ABHA</Text>
                <Text mb={4}>Access India's digital health ecosystem with your ABHA address.</Text>
                <Button bg={'blue.500'} onPress={() => navigate('CreateAbha')}>
                    Create now
                </Button>
            </Box>
        </ScrollView>
    );
};



export default HomeScreen;
