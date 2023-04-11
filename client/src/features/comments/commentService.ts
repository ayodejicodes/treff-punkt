import axios from "axios";
import { CreateNewComment, UpdateComment } from "./commentSlice";

const API_URL = "/api/comments/";

const createComment = async (postData: CreateNewComment, token: string) => {
  const { postID } = postData;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(`${API_URL}${postID}`, postData, config);
    return response.data;
  } catch (error) {
    throw new Error("Comment was not sent");
  }
};

const getComments = async (postID: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}${postID}`, config);

    return response.data;
  } catch (error) {
    throw new Error("Comments could not be fetched");
  }
};

// const updateComment = async ( id: string,
//   { postID }: { postID: string },
//   token: string) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const { id, caption } = commentData;

//   const response = await axios.put(`${API_URL}${id}`, { caption }, config);

//   return response.data;
// };

const deleteComment = async (
  id: string,
  { postID }: { postID: string },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}${postID}/${id}`, config);

  return response.data;
};

// const fetchInitialStateLike = async (id: string, token: string) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   try {
//     const response = await axios.get(`${API_URL}${id}`, config);

//     return response.data;
//   } catch (error) {
//     throw new Error("Likes could not be fetched");
//   }
// };

const upvoteComment = async (
  id: string,
  { postID }: { postID: string },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(
      `${API_URL}${postID}/${id}/upvote`,
      { postID },
      config
    );
    return response.data;
  } catch (error) {
    throw new Error("Upvote was not sent");
  }
};

const downvoteComment = async (
  id: string,
  { postID }: { postID: string },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(
      `${API_URL}${postID}/${id}/downvote`,
      { postID },
      config
    );
    return response.data;
  } catch (error) {
    throw new Error("Downvote was not sent");
  }
};

const commentService = {
  createComment,
  getComments,
  // updateComment,
  deleteComment,
  // fetchInitialStateLike,
  upvoteComment,
  downvoteComment,
};

export default commentService;
