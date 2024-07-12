// Fetch Hooks for (PUT | POST | DELETE)
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'native-base';
import {useState} from 'react';
import {BASE_URL as baseUrl} from '../utils';

type MutationOptions = {
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  isFormData?: boolean;
  BASE_URL?: string;
  body?: any;
  isAlert?: boolean;
};

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = async (path: string, options?: MutationOptions) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const url = options?.BASE_URL || baseUrl;
      setIsLoading(true);
      const method = options?.method || 'POST';
      const body = options?.body
        ? options?.isFormData
          ? options?.body
          : JSON.stringify(options.body)
        : `{}`;
      const headers: any = options?.isFormData
        ? {}
        : {'Content-Type': 'application/json'};

      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${url}/${path}`, {
        method,
        headers,
        body,
      });
      const status = response.status;
      const results = await response.json();
      if (options?.isAlert && status !== 200) {
        Toast.show({
          title: 'Error',
          description: results?.error?.message,
          bgColor: 'error.400',
        });
      }
      if (options?.isAlert && status === 200) {
        Toast.show({
          title: 'Success',
          description: results?.message,
          bgColor: 'success.400',
        });
      }
      setIsLoading(false);
      return {results, status};
    } catch (error) {
      setIsLoading(false);
    }
  };
  return {mutation, isLoading};
};

export default useMutation;
