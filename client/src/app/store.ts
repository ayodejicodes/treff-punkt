import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer, {
  AuthState,
  initialState as authInitialState,
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
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
  chats: chatsReducer,
  messages: messagesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
