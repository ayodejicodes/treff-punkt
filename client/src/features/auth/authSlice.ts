import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user") || "null");

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  profilePic: string;
  coverPic: string;
  followings: string[];
  followers: string[];
  role: "user" | "admin";
  bio: string;
  posts: string[];
  stories: string[];
  bookmarkedPosts: string[];
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  token: string;
}

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  followingsCount: number;
  followersCount: number;
  keyword: string | null;

  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: AuthState = {
  user: user ? user : null,
  followingsCount: user?.followings?.length || 0,
  followersCount: user?.followers?.length || 0,
  keyword: null,

  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: NewUser, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const logout = createAsyncThunk(
  "auth/logout",
  async (user, thunkAPI) => {
    return authService.logout();
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginUser, thunkAPI) => {
    try {
      return await authService.login(user);
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

export const followUser = createAsyncThunk(
  "users/follow",
  async (id: { id: string }, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return authService.followUser(id, token as string);
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

export const unfollowUser = createAsyncThunk(
  "users/unfollow",
  async (id: { id: string }, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return authService.unfollowUser(id, token as string);
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
// export const searchUser = createAsyncThunk(
//   "users/searchUser",
//   async (keyword: { keyword: string }, thunkAPI) => {
//     try {
//       const token = (
//         thunkAPI.getState() as { auth: { user?: { token?: string } } }
//       ).auth.user?.token;

//       return authService.searchUser(keyword, token as string);
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    setFollowingsCountIncrement: (state) => {
      state.followingsCount++;
    },
    setFollowingsCountDecrement: (state) => {
      state.followingsCount !== 0 && state.followingsCount--;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload as User;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const {
  reset,
  setFollowingsCountIncrement,
  setFollowingsCountDecrement,
  setKeyword,
} = authSlice.actions;
export default authSlice.reducer;
