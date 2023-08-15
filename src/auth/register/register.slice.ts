import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  showPassword: boolean;
  showConfirmPassword: boolean;
  email: string;
  acceptedPolicy: boolean;
};
const initialState: StateProps = {
  showPassword: false,
  email: '',
  acceptedPolicy: false,
  showConfirmPassword: false,
};
export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setShowConfirmPassword: (state, action) => {
      state.showConfirmPassword = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAcceptedPolicy: (state, action: PayloadAction<boolean>) => {
      state.acceptedPolicy = action.payload;
    },
  },
});

export const { setShowPassword, setEmail, setAcceptedPolicy, setShowConfirmPassword } =
  registerSlice.actions;

export const showPasswordSelector = (state: RootState) => state.register.showPassword;

export const showConfirmPasswordSelector = (state: RootState) =>
  state.register.showConfirmPassword;

export const emailConfirmSelector = (state: RootState) => state.register.email;

export const acceptedPolicySelector = (state: RootState) => state.register.acceptedPolicy;

export default registerSlice.reducer;
