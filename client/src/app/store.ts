import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  AuthState,
  initialState,
} from "../features/auth/authSlice";
import postsReducer, { PostsState } from "../features/posts/postSlice";
import commentsReducer, {
  CommentsState,
} from "../features/comments/commentSlice";
import chatsReducer, { ChatsState } from "../features/chats/chatSlice";
import messagesReducer, {
  MessagesState,
} from "../features/messages/messageSlice";

export interface RootState {
  auth: AuthState;
  posts: PostsState;
  comments: CommentsState;
  chats: ChatsState;
  messages: MessagesState;
  // Add other slices here
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  },
  preloadedState: {
    auth: initialState,
    // Initialize the other slices' initial states here
  },
});

export type AppDispatch = typeof store.dispatch;
