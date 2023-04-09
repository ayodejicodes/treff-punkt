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

  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await dispatch(getPosts());
      return res;
    };

    const fetchedPosts = async () => {
      const response = await fetchPost();

      await Promise.resolve();

      setPosts(response.payload);
    };
    fetchedPosts();
  }, []);

  // console.log("posts", posts);

  // -------------------------------------------------------------------------

  return (
    <div className="md:w-[50%] flex flex-col gap-5 p-7 bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark">
      <Stories />

      <PostForm />

      {posts?.map((post: Post, index: number) => (
        <PostCard post={post} key={index} />
      ))}
    </div>
  );
};
export default HomePage;
