import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authLoginReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
import registerReducer from 'src/auth/register/register.slice';
import merchantProfileReducer from 'src/profile/common/reducers/merchant-profile.slice';
// product
import tagListReducer from '../../tag/tag-list/tag.slice';
import productSlice from '../../product/create-product/slice';

// slices

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authLogin', 'login', 'merchantProfile'],
};

const rootReducer = combineReducers({
  authLogin: authLoginReducer,
  login: loginReducer,
  register: registerReducer,
  merchantProfile: merchantProfileReducer,
  tagList: tagListReducer,
  createProduct: productSlice,
});

export { rootPersistConfig, rootReducer };
