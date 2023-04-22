import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

export type Chat = {
  _id: string;

  users: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePic: string;
  }[];
  latestMessage: any;
  createdAt: string | undefined;
  updatedAt: string;
};

export type ChatsState = {
  chats: Chat[];
  aiChatArray: Chat[];
  selectedChatId: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
};

const initialState: ChatsState = {
  chats: [],
  aiChatArray: [],
  selectedChatId: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createChat = createAsyncThunk(
  "chats/create",
  async (userID: { userID: string | undefined }, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return chatService.createChat(userID, token as string);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChats = createAsyncThunk(
  "chats/getChats",
  async (_, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return chatService.getChats(token as string);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    aiChatArray: [],
    selectedChatId: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  } as ChatsState,
  reducers: {
    resetChat: (state) => {
      state = initialState;
    },
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },
    setAiChatArray: (state, action) => {
      state.aiChatArray.push(action.payload);
    },
    resetAiChatArray: (state) => {
      state.aiChatArray = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const {
  resetChat,
  setSelectedChatId,
  setAiChatArray,
  resetAiChatArray,
} = chatsSlice.actions;
export default chatsSlice.reducer;
