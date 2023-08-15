import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICreateNewProductState, IFormNewProduct } from './interface';

const initialState: ICreateNewProductState = {
  dataSubmit: {
    categoryId: {
      name: '',
      id: 0,
    },
    description: '',
    imageUrl: '',
    isActive: false,
    name: '',
    price: 0,
    qty: 0,
    supplierId: {
      name: '',
      id: 0,
    },
    unit: '',
    photoUrl: '',
  },
  numbSubmit: 0,
};

export const productSlice = createSlice({
  name: 'new-product',
  initialState,
  reducers: {
    setFormDataSubmit: (state, action: PayloadAction<IFormNewProduct>) => {
      state.dataSubmit = action.payload;
    },
    resetProductState: (state) => {
      state.numbSubmit = 0;
      state.dataSubmit = initialState.dataSubmit;
    },
  },
});

export const { resetProductState, setFormDataSubmit } = productSlice.actions;

export default productSlice.reducer;
