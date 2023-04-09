import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Stories from "./Stories";
import PostForm from "./PostForm";
import PostCard from "./PostCard";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Post, getPosts } from "../features/posts/postSlice";

const HomePage = () => {
  // ---Redux Tool kit--------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { posts, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.posts
  );

  const [postArray, setPostArray] = useState<Post[]>();

  const fetchPost = async () => {
    const res = await dispatch(getPosts());
    return res;
  };

  useEffect(() => {
    const fetchedPost = async () => {
      const response = await fetchPost();
      await Promise.resolve();
      setPostArray(response.payload);
    };
    fetchedPost();
  }, []);

  const fetchNewPost = async () => {
    const res = await fetchPost();
    return res;
  };

  useEffect(() => {
    const homeFeedPosts = async () => {
      const res = await fetchNewPost();
      await Promise.resolve();
      setPostArray(res.payload);
    };
    homeFeedPosts();
  }, [posts, dispatch]);

  // -------------------------------------------------------------------------

  return (
    <div className="md:w-[50%] flex flex-col gap-5 p-7 bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark">
      <Stories />

      <PostForm />

      {postArray?.map((post: Post, index: number) => (
        <PostCard post={post} key={index} />
      ))}
    </div>
  );
};
export default HomePage;
