import { useEffect, useRef, useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import {
  BiLike,
  BiCommentDots,
  BiDotsVerticalRounded,
  BiChevronDown,
  BiChevronUp,
} from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { VscSmiley } from "react-icons/vsc";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { toast } from "react-toastify";
import {
  Post,
  // fetchInitialStateLike,
  getPosts,
  likeDislikePost,
  resetPost,
} from "../features/posts/postSlice";
import { format, parseISO } from "date-fns";
import ProfilePicture from "./Profile/ProfilePicture";

// {
//   _id,
//   author,
//   caption,
//   postImage,
//   likes,
//   comments,
//   shares,
//   createdAt,
//   updatedAt,
// }

interface PostCard {
  post: Post;
}

const PostCard = ({ post }: PostCard) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.posts
  );

  const {
    _id,
    author,
    caption,
    postImage,
    likes,
    comments,
    shares,
    createdAt,
  } = post;

  const [toggleLike, setToggleLike] = useState<Boolean>(
    post.likes.includes(user?._id as string)
  );
  const [likeCount, setLikeCount] = useState<number>(post.likes.length);
  const [savedPost, setSavedPost] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [updateDeleteOpen, setUpdateDeleteOpen] = useState(false);
  const [allCommentsOpen, setAllCommentsOpen] = useState(false);

  const updateDeleteOpenRef = useRef<HTMLDivElement>(null);

  // ---Redux Tool kit--------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // const imageUrl = post.postImage ? post.postImage : undefined; // Assign a valid URL or undefined based on some condition
  // const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
  //   src: imageUrl,

  // };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Posted Successfully");

      // navigate("/");
    }
    dispatch(resetPost());
  }, [isError, message]);

  // -------------------------------------------------------------------------

  // Handles Outside box Click---------------------------------------

  const handleClickOutside = (e: MouseEvent) => {
    if (
      updateDeleteOpenRef.current &&
      !updateDeleteOpenRef.current.contains(e.target as Node)
    ) {
      setUpdateDeleteOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updateDeleteOpenRef]);
  // -----------------------------------------------------------------------

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, []);

  // Fetch initial likes and dispatch the action to update Redux state
  // const fetchInitialLikesData = async () => {
  //   try {
  //     const response = await dispatch(fetchInitialStateLike(_id));
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching initial likes data:", error);
  //   }
  // };

  const handleLikeDislike = async () => {
    await dispatch(likeDislikePost({ id: _id, userID: user?._id as string }));
    await Promise.resolve();

    setToggleLike((prev) => !prev);

    if (toggleLike) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }

    console.log("Finished the handle task");
    return post;
  };

  useEffect(() => {
    console.log(post);
    console.log("likeCount", likeCount);
    console.log("toggleLike", toggleLike);
  }, [user?._id, likes, toggleLike]);

  // console.log(toggleLike);
  return (
    <div className="flex flex-col  bg-whiteColor dark:bg-secondaryColor  rounded-xl p-10 gap-4  ">
      {/* User details and post creation date */}
      <div className="flex justify-between">
        {/* left */}
        <div>
          <div className="flex flex-row items-center gap-4">
            <div className="  w-12 h-12">
              <img
                src={author.profilePic}
                alt=""
                className=" rounded-full cursor-pointer w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-1 ">
                <h3 className="font-bold text-secondaryColor dark:text-whiteColor cursor-pointer">
                  {`${author.firstName} ${author.lastName}`}
                </h3>
                <span>
                  <MdVerified
                    size={14}
                    className=" text-secondaryColor dark:text-whiteColor"
                  />
                </span>
              </div>
              <small className=" text-secondaryColor dark:text-whiteColor">
                {/* 17 March at 08:25 PM */}
                {`${format(parseISO(createdAt), "dd MMM yyyy HH:mm a")}`}
              </small>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex relative gap-3">
          {savedPost ? (
            <FaBookmark
              size={20}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              onClick={() => setSavedPost(!savedPost)}
            />
          ) : (
            <FaRegBookmark
              size={20}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              onClick={() => setSavedPost(!savedPost)}
            />
          )}

          <BiDotsVerticalRounded
            size={20}
            className="text-secondaryColor dark:text-whiteColor cursor-pointer"
            onClick={() => setUpdateDeleteOpen(!updateDeleteOpen)}
          />
          {/* Edit, Delete Modal */}

          {updateDeleteOpen ? (
            <div
              className="absolute top-0 right-0  mt-8"
              ref={updateDeleteOpenRef}
            >
              <div className="absolute top-[-3px] right-[6px] w-2.5 h-2.5 gap-3 rounded-sm bg-secondaryColor text-whiteColor dark:bg-white rotate-45"></div>
              <div className="flex flex-col p-4 gap-3 rounded-lg bg-secondaryColor text-whiteColor dark:bg-white">
                <small
                  className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer"
                  onClick={() => setUpdateDeleteOpen(false)}
                >
                  Edit
                </small>
                <small
                  className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer"
                  onClick={() => setUpdateDeleteOpen(false)}
                >
                  Delete
                </small>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* Post Text */}
      <p className=" text-secondaryColor dark:text-whiteColor">
        {`${caption}`}
      </p>
      {/* Post Picture */}
      {postImage && (
        <div className=" w-full h-[400px] bg-red-500 rounded-lg">
          <img
            src={postImage}
            alt={postImage}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}
      {/* Likes Comment Share */}
      <div className="flex justify-between">
        {/* Left */}

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {toggleLike ? (
              <AiTwotoneLike
                size={20}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer"
                onClick={handleLikeDislike}
              />
            ) : (
              <BiLike
                size={20}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer"
                onClick={handleLikeDislike}
              />
            )}

            <small className="text-secondaryColor dark:text-whiteColor text-sm cursor-pointer">
              {/* 2.3k Likes */}

              {likeCount === 0
                ? "Be the first to like"
                : `${likeCount} Like${likeCount > 1 ? "s" : ""}`}
            </small>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setCommentOpen(!commentOpen);
              setAllCommentsOpen(!allCommentsOpen);
            }}
          >
            <BiCommentDots
              size={20}
              className="text-secondaryColor dark:text-whiteColor"
            />
            <small className="text-secondaryColor dark:text-whiteColor text-sm">
              {/* 250 Comments */}
              {comments.length === 0
                ? `No Comment`
                : `${comments.length} Comment${comments.length > 1 ? "s" : ""}`}
            </small>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 cursor-pointer">
          <RiShareForwardLine
            size={20}
            className="text-secondaryColor dark:text-whiteColor"
          />
          <small className="text-secondaryColor dark:text-whiteColor text-sm">
            {/* 80 Shares */}
            {shares.length === 0
              ? `No Share`
              : `${shares.length} Share${shares.length > 1 ? "s" : ""}`}
          </small>
        </div>
      </div>

      {comments.length > 0 && (
        <div>
          {/* Comment Box */}
          <div className="relative flex items-center gap-4 ">
            <div className="  w-8 h-8">
              <img
                src="../src/assets/ayo.jpg"
                alt=""
                className=" rounded-full"
              />
            </div>
            <textarea
              placeholder="Comment of fIrYYstName Post"
              className="  resize-none text-sm bg-transparent pr-20 pl-4 pt-1.5 pb-1.5 w-full border border-secondaryColor/[20%] dark:borderWhiteColorLight focus:outline-none h-12  text-secondaryColor dark:text-whiteColor"
            ></textarea>
            <div className="flex items-center gap-4 absolute right-0 mr-6">
              <VscSmiley
                size={20}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              />
              <FiSend
                size={20}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              />
            </div>
          </div>

          {/* Comments Controls */}
          <div className="flex justify-between items-center mt-3">
            {/* Left */}
            <div
              className="flex items-center gap-0.5 cursor-pointer"
              onClick={() => {
                setCommentOpen(!commentOpen);
                setAllCommentsOpen(!allCommentsOpen);
              }}
            >
              <small className="text-secondaryColor dark:text-whiteColor text-sm">
                All comments
              </small>
              <small className="text-secondaryColor dark:text-whiteColor text-sm">
                (10)
              </small>

              {commentOpen ? (
                <BiChevronUp
                  size={22}
                  className="text-secondaryColor dark:text-whiteColor text-sm"
                />
              ) : (
                <BiChevronDown
                  size={22}
                  className="text-secondaryColor dark:text-whiteColor text-sm"
                />
              )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-0.5 ">
              <small className="text-secondaryColor dark:text-whiteColor text-sm">
                Sort by
              </small>
              <select className="text-secondaryColor dark:text-whiteColor text-sm bg-transparent focus:outline-none cursor-pointer">
                <option className="text-secondaryColor  text-sm bg-transparent">
                  Most recent
                </option>
                <option className="text-secondaryColor text-sm bg-transparent">
                  Most liked
                </option>
              </select>
            </div>
          </div>
        </div>
      )}
      {comments.length > 0 && allCommentsOpen ? <CommentCard /> : ""}
    </div>
  );
};
export default PostCard;
