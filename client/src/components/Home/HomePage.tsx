import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Stories from "../Stories/Stories";
import PostForm from "../Post/PostForm";
import PostCard from "../Post/PostCard";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Post, getPosts, resetPost } from "../../features/posts/postSlice";
import { FaGithubSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

const HomePage = () => {
  // ---Redux Tool kit--------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { posts, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.posts
  );

  const { comments } = useSelector((state: RootState) => state.comments);

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
  }, [dispatch, posts, comments]);

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
  }, [dispatch, posts, comments]);

  // -------------------------------------------------------------------------

  return (
    <div className=" md:w-full lg:w-[50%] flex flex-col gap-5 p-7 bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark">
      {/* <Stories /> */}

      <PostForm />

      {postArray?.map((post: Post, index: number) => (
        <PostCard post={post} key={index} />
      ))}

      {/* Copyright */}
      <div className="lg:hidden mt-4">
        <small className="text-secondaryColor dark:text-whiteColor text-[11px] flex flex-col text-center opacity-75">
          &copy;
          {` ${new Date().getFullYear()}`} | Designed and Developed by
          <span className="font-semibold"> Ayodeji Fabusiwa</span>
        </small>
        <div className="flex justify-center gap-2 mt-2">
          <Link to="https://github.com/ayodejicodes" target="_blank">
            <FaGithubSquare
              size={19}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
            />
          </Link>

          <Link
            to="https://www.linkedin.com/in/ayodeji-fabusiwa/"
            target="_blank"
          >
            <FaLinkedin
              size={19}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              onClick={() => navigate("/")}
            />
          </Link>

          <Link to="https://twitter.com/ayodejicodes" target="_blank">
            <FaTwitterSquare
              size={19}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              onClick={() => navigate("/")}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
