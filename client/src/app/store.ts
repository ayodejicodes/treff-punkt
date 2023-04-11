import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../features/auth/authSlice";
import postsReducer, { PostsState } from "../features/posts/postSlice";
import commentsReducer, {
  CommentsState,
} from "../features/comments/commentSlice";

export interface RootState {
  auth: AuthState;
  posts: PostsState;
  comments: CommentsState;
  // Add other slices here
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
