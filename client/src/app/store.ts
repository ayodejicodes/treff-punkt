import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../features/auth/authSlice";
import postsReducer, { PostsState } from "../features/posts/postSlice";
import commentsReducer, {
  CommentsState,
} from "../features/comments/commentSlice";
import chatsReducer, { ChatsState } from "../features/chats/chatSlice";

export interface RootState {
  auth: AuthState;
  posts: PostsState;
  comments: CommentsState;
  chats: ChatsState;
  // Add other slices here
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    chats: chatsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
