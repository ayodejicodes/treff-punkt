import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

export type Message = {
  _id: string;
  sender: string;

  // {
  //   _id: string;
  //   firstName: string;
  //   lastName: string;
  //   profilePic: string;
  // };
  // receiver: {
  //   _id: string;
  //   firstName: string;
  //   lastName: string;
  //   profilePic: string;
  // };
  content: string;
  contentImage: string;
  chat: string;
  createdAt: string;
  updatedAt: string;
};

export type MessagesState = {
  messages: Message[];
  // selectedMessageId: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
};

const initialState: MessagesState = {
  messages: [],
  // selectedMessageId: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export type CreateNewMessage = {
  chat: string | undefined;
  content?: string | undefined;
  contentImage?: string | undefined;
};

export const createMessage = createAsyncThunk(
  "messages/create",
  async (message: CreateNewMessage, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return messageService.createMessage(message, token as string);
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

export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async (chat: string, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return messageService.getMessages(chat, token as string);
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

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    // selectedMessageId: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  } as MessagesState,
  reducers: {
    resetMessage: (state) => {
      state = initialState;
    },
    // setSelectedMessageId: (state, action) => {
    //   state.selectedMessageId = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const {
  resetMessage,

  // setSelectedMessageId
} = messagesSlice.actions;
export default messagesSlice.reducer;
