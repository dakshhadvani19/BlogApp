import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice_store';
import postSlice from './postSlice_store';

const store = configureStore({
    reducer: {
        auth : authSlice,
        post: postSlice,
    }
});

export default store;