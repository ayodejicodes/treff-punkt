import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../features/auth/authSlice";
import postsReducer from "../features/posts/postSlice";

export interface RootState {
  auth: AuthState;
  // Add other slices here
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
