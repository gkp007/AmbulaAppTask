import { Box, FormControl, IInputProps, Input, useColorMode } from 'native-base';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ICONS } from '~/assets';
import AppIcon, { IconProps } from './AppIcon';
import { fontFamily } from '../../../app.json';

type Props = {
  input: {
    key: string;
    label?: string;
    placeholder: string;
    icon: IconProps;
    rules: Object;
    inputProps?: IInputProps;
  };
  errorMessage?: string;
  onBlur?: any;
  onChange?: any;
  value?: string;
  control: Control<any, any>;
  leftElement?: JSX.Element;
  keyboardType?: 'default' | 'numeric';
};

export default function AppInput({
  input,
  errorMessage,
  control,
  leftElement,
  keyboardType = 'default'
}: Props): JSX.Element {
  const { colorMode } = useColorMode();

  if (!input) {
    console.error('The input prop is required for AppInput component');
    return null;
  }

  return (
    <Controller
      control={control}
      name={input.key}
      rules={input.rules}
      render={({ field: { onBlur, onChange, value } }) => (
        <FormControl isInvalid={Boolean(errorMessage)} my={'1'}>
          {input.label && (
            <FormControl.Label
              _text={{
                style: { fontFamily: `${fontFamily}-Regular`, color: 'black' },
              }}>
              {input.label}
            </FormControl.Label>
          )}
          <Input
            placeholder={input.placeholder}
            w="full"
            bg={'white'}
            _focus={{
              borderColor: 'blue.300',
              bg: 'white'
            }}
            InputLeftElement={
              leftElement ? (
                <Box px="2">{leftElement}</Box>
              ) : (
                <Box px="2">
                  <AppIcon
                    {...input.icon}
                    color={colorMode === 'dark' ? 'white' : 'gray'}
                    size={20}
                  />
                </Box>
              )
            }
            value={value}
            onChangeText={onChange}
            onChange={onChange}
            onBlur={onBlur}
            keyboardType={keyboardType}
            {...input.inputProps}
          />
          <FormControl.ErrorMessage>
            {errorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
}
