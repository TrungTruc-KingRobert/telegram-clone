import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/lib/userSlice';
import threadReducer from '../features/lib/threadSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    thread: threadReducer,
  },
});
