import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AbhaState {
  abhaAddress: string;
}

const initialState: AbhaState = {
  abhaAddress: '',
};

const abhaSlice = createSlice({
  name: 'abha',
  initialState,
  reducers: {
    setAbhaAddress(state, action: PayloadAction<string>) {
      state.abhaAddress = action.payload;
    },
  },
});

export const {setAbhaAddress} = abhaSlice.actions;
export default abhaSlice.reducer;
