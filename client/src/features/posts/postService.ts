import axios from "axios";
import { CreateNewPost, UpdatePost } from "./postSlice";

const API_URL = "https://treff-punkt-socials.onrender.com/api/posts/";

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

const getPosts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL, config);

    return response.data;
  } catch (error) {
    throw new Error("Posts could not be fetched");
  }
};

const updatePost = async (postData: UpdatePost, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { id, caption, postImage } = postData;

  const response = await axios.put(
    `${API_URL}${id}`,
    { caption, postImage },
    config
  );

  return response.data;
};

const deletePost = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}${id}`, config);

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

const likeDislikePost = async (
  id: string,
  { userID }: { userID: string },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(
      `${API_URL}${id}/like`,
      { userID },
      config
    );
    return response.data;
  } catch (error) {
    throw new Error("Like was not sent");
  }
};

const bookmarkPost = async (
  id: string,
  { userID }: { userID: string },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(
      `${API_URL}${id}/bookmark`,
      { userID },
      config
    );
    return response.data;
  } catch (error) {
    throw new Error("Post was not Bookmarked");
  }
};

const postService = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  // fetchInitialStateLike,
  likeDislikePost,
  bookmarkPost,
};

export default postService;
