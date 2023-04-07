import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

interface Post {
  _id: string;
  author: string;
  caption: string;
  postImage: string | { type: string; data: Buffer }; //  string or Buffer (Image or Video)
  likes: string[];
  comments: {
    _id: string;
    author: string;
    text: string;
    createdAt: string;
  }[];
  shares: string[];
  createdAt: string;
  updatedAt: string;
}

export type PostsState = {
  posts: Post[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
};

export type CreateNewPost = {
  caption?: string | undefined;
  postImage?: string | undefined;
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createPost = createAsyncThunk(
  "posts/create",
  async (post: CreateNewPost, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return postService.createPost(post, token as string);
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

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return postService.getPosts(token as string);
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

// export const deletePost = createAsyncThunk(
//   "posts/delete",
//   async (id, thunkAPI) => {
//     try {
//       const token = (
//         thunkAPI.getState() as { auth: { user?: { token?: string } } }
//       ).auth.user?.token;

//       return postService.deletePost(id, token);
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPost: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload as Post);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
    // .addCase(getPosts.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getPosts.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.posts = action.payload;
    // })
    // .addCase(getPosts.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload as string;
    // })
    // .addCase(deletePost.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(deletePost.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.posts = state.posts.filter(
    //     (post) => post._id !== action.payload.id
    //   );
    // })
    // .addCase(deletePost.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload as string;
    // });
  },
});

export const { resetPost } = postsSlice.actions;
export default postsSlice.reducer;
