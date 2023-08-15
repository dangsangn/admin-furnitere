import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { StateProps } from '../interfaces/merchant-profile.interface';

const initialState: StateProps = {
  profile: {},
  showNewPassword: false,
  showOldPassword: false,
};
export const merchantProfileSlice = createSlice({
  name: 'merchantProfile',
  initialState,
  reducers: {
    setMerchantInfo: (state, action) => {
      state.profile = action.payload;
    },
    setShowOldPassword: (state, action: PayloadAction<boolean>) => {
      state.showOldPassword = action.payload;
    },
    setShowNewPassword: (state, action: PayloadAction<boolean>) => {
      state.showNewPassword = action.payload;
    },
  },
});

export const { setMerchantInfo, setShowNewPassword, setShowOldPassword } =
  merchantProfileSlice.actions;

export const merchantInfoSelector = (state: RootState) => state.merchantProfile.profile;
export const merchantShowOldSelector = (state: RootState) =>
  state.merchantProfile.showOldPassword;
export const merchantShowNewSelector = (state: RootState) =>
  state.merchantProfile.showNewPassword;

export default merchantProfileSlice.reducer;
