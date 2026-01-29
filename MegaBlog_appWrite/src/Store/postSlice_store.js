import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: false,
  postData: null,
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost : (state, action) => {
      state.status = true;
      state.postData = action.payload.postData;
    },
    
    deletePost: (state) => {
      state.status = false;
      state.postData = null;
    },

    updatePost: (state , action) => {
      state.status = true;
      state.postData = action.payload.postData;
    }
  }
})


export const{createPost , deletePost , updatePost} = postSlice.actions;

export default postSlice.reducer;