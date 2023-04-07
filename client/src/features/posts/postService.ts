import axios from "axios";
import { CreateNewPost } from "./postSlice";

const API_URL = "/api/posts/";

const createPost = async (postData: CreateNewPost, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(API_URL, postData, config);
    return response.data;
  } catch (error) {
    throw new Error("Post was not sent");
  }
};

// const getPosts = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(API_URL, config);

//   return response.data;
// };

// const deletePost = async (postId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.delete(API_URL + postId, config);

//   return response.data;
// };

const postService = {
  createPost,
  // getPosts,
  // deletePost,
};

export default postService;
