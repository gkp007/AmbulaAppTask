import {configureStore} from '@reduxjs/toolkit';
import abhaReducer from './abhaSlice';

const store = configureStore({
  reducer: {
    abha: abhaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
