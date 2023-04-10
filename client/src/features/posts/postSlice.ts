import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

// postImage: string| Buffer | undefined | { type: string; data: Buffer }; //  string or Buffer (Image or Video)

export type Post = {
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePic: string;
  };
  caption: string;
  postImage: string | undefined;
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
};

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

export type UpdatePost = {
  id: string;
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

export const updatePost = createAsyncThunk(
  "posts/update",
  async (post: UpdatePost, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return postService.updatePost(post, token as string);
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

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id: string, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return postService.deletePost(id, token as string);
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

// export const fetchInitialStateLike = createAsyncThunk(
//   "posts/getPosts/getLikes",
//   async (id: string, thunkAPI) => {
//     try {
//       const token = (
//         thunkAPI.getState() as { auth: { user?: { token?: string } } }
//       ).auth.user?.token;

//       return postService.fetchInitialStateLike(id, token as string);
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

export const likeDislikePost = createAsyncThunk(
  "posts/like",
  async ({ id, userID }: { id: string; userID: string }, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return postService.likeDislikePost(id, { userID }, token as string);
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
      })

      // .addCase(fetchInitialStateLike.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchInitialStateLike.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.posts = action.payload;
      // })
      // .addCase(fetchInitialStateLike.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload as string;
      // })

      .addCase(likeDislikePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeDislikePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(likeDislikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
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
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetPost } = postsSlice.actions;
export default postsSlice.reducer;
