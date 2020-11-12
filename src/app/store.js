import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/lib/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
