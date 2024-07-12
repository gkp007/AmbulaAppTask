import {create} from 'zustand';
import localStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '../utils';
import {User} from '~/types';
type AuthState = {
  isUserLoading: boolean;
  user?: Partial<User>;
  setUser: (user: Partial<User>) => Promise<void>;
  setToken: (token: string) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<void>;
};
const useAuth = create<AuthState>(set => ({
  isUserLoading: true,
  user: undefined,
  setUser: async (user: Partial<User>) => {
    set({
      user: {...user},
    });
  },
  async setToken(accessToken) {
    await localStorage.setItem('accessToken', JSON.stringify(accessToken));
  },
  async logout() {
    set({user: undefined});
    await localStorage.removeItem('accessToken');
  },
  getUser: async () => {
    try {
      const accessToken = await localStorage.getItem('accessToken');
      if (!accessToken) {
        set({user: undefined, isUserLoading: false});
        return;
      }
      console.log('access==>', accessToken);
      const res = await fetch(`${BASE_URL}/users/current/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res?.status === 401) {
        await localStorage?.removeItem('accessToken');
        set({user: undefined, isUserLoading: false});
      }
      if (res?.status === 200) {
        const data = await res.json();
        console.log('data==>', data);
        const userData = data?.data;
        set({user: {...userData}, isUserLoading: false});
      }
    } catch (error) {
      set({user: {}});
    }
  },
}));

export default useAuth;
