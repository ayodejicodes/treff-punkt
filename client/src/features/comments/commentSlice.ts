import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

// commentImage: string| Buffer | undefined | { type: string; data: Buffer }; //  string or Buffer (Image or Video)

export type Comment = {
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    profilePic: string;
  };
  post: string;
  caption: string;
  upvotes: string[];
  downvotes: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CommentsState = {
  comments: Comment[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
};

export type CreateNewComment = {
  caption: string | undefined;
  postID: string | undefined;
};

export type UpdateComment = {
  id: string;
  caption?: string | undefined;
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createComment = createAsyncThunk(
  "comments/create",
  async (comment: CreateNewComment, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return commentService.createComment(comment, token as string);
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

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (postID: string, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return commentService.getComments(postID, token as string);
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

// export const updateComment = createAsyncThunk(
//   "comments/update",
//   async ({ id, postID }: { id: string; postID: string }, thunkAPI) => {
//     try {
//       const token = (
//         thunkAPI.getState() as { auth: { user?: { token?: string } } }
//       ).auth.user?.token;

//       return commentService.updateComment(id, { postID }, token as string);
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

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async ({ id, postID }: { id: string; postID: string }, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return commentService.deleteComment(id, { postID }, token as string);
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
//   "comments/getComments/getLikes",
//   async (id: string, thunkAPI) => {
//     try {
//       const token = (
//         thunkAPI.getState() as { auth: { user?: { token?: string } } }
//       ).auth.user?.token;

//       return commentService.fetchInitialStateLike(id, token as string);
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

export const upvoteComment = createAsyncThunk(
  "comments/upvote",
  async ({ id, postID }: { id: string; postID: string }, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return commentService.upvoteComment(id, { postID }, token as string);
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

export const downvoteComment = createAsyncThunk(
  "comments/upvote",
  async ({ id, postID }: { id: string; postID: string }, thunkAPI) => {
    try {
      const token = (
        thunkAPI.getState() as { auth: { user?: { token?: string } } }
      ).auth.user?.token;

      return commentService.downvoteComment(id, { postID }, token as string);
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

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComment: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload as Comment);
      })
      .addCase(createComment.rejected, (state, action) => {
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
      //   state.comments = action.payload;
      // })
      // .addCase(fetchInitialStateLike.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload as string;
      // })

      .addCase(upvoteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upvoteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(upvoteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // ------------------------------------------------------------------

      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })

      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // -----------------------------------------------------------------------
      // .addCase(updateComment.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updateComment.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.comments = action.payload;
      // })
      // .addCase(updateComment.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload as string;
      // })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.id
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetComment } = commentsSlice.actions;
export default commentsSlice.reducer;
