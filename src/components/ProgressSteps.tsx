import React from 'react';
import { Box, HStack, VStack, Text, Divider, CheckIcon } from 'native-base';
import { AppIcon } from './core';

interface ProgressStepsProps {
    currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
    const steps = [
        { key: 'phone', label: 'Phone number' },
        { key: 'details', label: 'Personal Details' },
        { key: 'profile', label: 'ABHA Profile' },
    ];

    return (
        <HStack justifyContent="space-between" alignItems="center" w="100%" px={4} mb={8}>
            {steps.map((step, index) => (
                <React.Fragment key={step.key}>
                    <VStack alignItems="center" space={1} flex={1}>
                        {index < currentStep ? (
                            <CheckIcon size={5} color="green.500" />
                        ) : (
                            index === currentStep ? (
                                <AppIcon MaterialCommunityIconsName={'circle-slice-8'} color={'blue'} />
                            ) : (
                                <AppIcon MaterialCommunityIconsName={'circle-slice-8'} color={'gray'} />
                            )
                        )}
                        <Box mt={7} position={'absolute'}>
                            <Text w={'100%'} bold fontSize="xs" color={index < currentStep ? 'green.500' : (index === currentStep ? 'blue.500' : 'gray.300')}>
                                {step.label}
                            </Text>
                        </Box>
                    </VStack>
                    {
                        index < steps.length - 1 && (
                            <Divider bg={index < currentStep ? 'green.500' : 'gray.300'} w={'30%'} />
                        )
                    }
                </React.Fragment>
            ))
            }
        </HStack >
    );
};

export default ProgressSteps;
