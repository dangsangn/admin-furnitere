import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateProps, ITagFilter } from './interface';

const initialState: IStateProps = {
  idsDelete: [],
  isPopupDelete: false,
  tagFilter: {
    type: '',
  },
};

export const tagSlice = createSlice({
  name: 'tag_list',
  initialState,
  reducers: {
    setIdsDelete: (state, action: PayloadAction<number[]>) => {
      state.idsDelete = action.payload;
    },
    setPopupDelete: (state, action: PayloadAction<boolean>) => {
      state.isPopupDelete = action.payload;
    },
    setTagFilter: (state, action: PayloadAction<ITagFilter>) => {
      state.tagFilter = action.payload;
    },
  },
});

export const { setIdsDelete, setPopupDelete, setTagFilter } = tagSlice.actions;

export default tagSlice.reducer;
