import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IGroupPolicies, IRules } from './interface';

type StateProps = {
  email: string;
  showPassword: boolean;
  isExpired: boolean;
  groupPolicies: IGroupPolicies[];
  rules: IRules[];
  roleId: number;
  profile: {
    email: string;
    name: string;
    phone: string;
    address: string;
  };
};
const initialState: StateProps = {
  showPassword: false,
  email: '',
  isExpired: false,
  groupPolicies: [],
  rules: [],
  roleId: 0,
  profile: {
    email: '',
    name: '',
    phone: '',
    address: '',
  },
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setIsExpired: (state, action) => {
      state.isExpired = action.payload;
    },
    setPolicies: (state, action) => {
      state.groupPolicies = action.payload;
    },
    setRules: (state, action) => {
      state.rules = action.payload;
    },
    setRoleId: (state, action) => {
      state.roleId = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const {
  setShowPassword,
  setEmail,
  setIsExpired,
  setPolicies,
  setRules,
  setRoleId,
  setProfile,
} = loginSlice.actions;

export const showPasswordSelector = (state: RootState) => state.login.showPassword;
export const emailSelector = (state: RootState) => state.login.email;
export const isExpiredSelector = (state: RootState) => state.login.isExpired;
export const policiesSelector = (state: RootState) => state.login.groupPolicies;
export const rulesSelector = (state: RootState) => state.login.rules;
export const profileSelector = (state: RootState) => state.login.profile;
export const roleIdSelector = (state: RootState) => state.login.roleId;

export default loginSlice.reducer;
