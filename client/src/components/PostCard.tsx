import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlinePicture, AiTwotoneLike } from "react-icons/ai";
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
  deletePost,
  // fetchInitialStateLike,
  getPosts,
  likeDislikePost,
  resetPost,
  updatePost,
} from "../features/posts/postSlice";
import { format, parseISO } from "date-fns";
import { RxCross2 } from "react-icons/rx";

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
    likes.includes(user?._id as string)
  );
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const [savedPost, setSavedPost] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [updateDeleteOpen, setUpdateDeleteOpen] = useState(false);
  const [allCommentsOpen, setAllCommentsOpen] = useState(false);

  const updateDeleteOpenRef = useRef<HTMLDivElement>(null);

  const [isEditClicked, setIsEditClicked] = useState(false);

  const updatePostObject = {
    caption,
    postImage,
  };
  const shallowUpdatePostObject = { ...updatePostObject };

  const [updateCaption, setUpdateCaption] = useState<string>(
    shallowUpdatePostObject.caption
  );
  // const [postImage, setPostImage] = useState<string>(
  //   shallowUpdatePostObject.caption
  // );

  const [updateImageFile, setUpdateImageFile] = useState<File | undefined>();

  const [updateImage, setUpdateImage] = useState<string | undefined>(
    shallowUpdatePostObject.postImage
  );

  const [isUpdateLoading, setIsUpdateLoading] = useState<Boolean>(false);
  const [base64Update, setBase64Update] = useState<string | undefined>();
  const [isBase64UpdateOpen, setIsBase64UpdateOpen] = useState<Boolean>(false);
  const [isUpdateFieldOpen, setIsUpdateFieldOpen] = useState<Boolean>(false);

  // ---Redux Tool kit--------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      // toast.success("Posted Successfully");
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
  };

  const handleDelete = async () => {
    await dispatch(deletePost(_id));
  };

  console.log(post);

  console.log("updateCaption", updateCaption);
  // console.log("shallowVakue", shallowVakue);
  console.log("updateImage", updateImage);

  // --------------------------Update Post-----------------------------------------

  // Set Preview------------------------------------------------------------

  useEffect(() => {
    const reader = new FileReader();
    if (updateImageFile) {
      reader.readAsDataURL(updateImageFile as File);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // base64Update-encoded string
        setBase64Update(e.target?.result as string);
        setUpdateImage(undefined);
        // setIsBase64UpdateOpen(true);
      };
    }
  }, [updateImageFile]);

  // -------------------------------------------------------------------------

  // Upload to Cloudinary
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handleUpdateImageUpload = async () => {
    if (!base64Update) {
      setBase64Update(undefined);
      setIsUpdateLoading(false);
    }
    if (base64Update) {
      const data = new FormData();
      data.append("file", base64Update as string);
      data.append("upload_preset", `${upload_preset}`);
      data.append("cloud_name", `${cloud_name}`);
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpcdcpyln/upload",
          {
            method: "post",
            body: data,
          }
        );
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        setIsUpdateLoading(false);
        throw new Error("Upload Failed");
      }
    }
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("update Clicked from handle");

    // setIsUpdateLoading(true);

    const responseData = await handleUpdateImageUpload();

    await Promise.resolve();

    if (!isUpdateLoading && !responseData && updateCaption) {
      setIsUpdateLoading(false);
      dispatch(updatePost({ id: _id, caption: updateCaption }));
    }

    if (!isUpdateLoading && responseData && !updateCaption) {
      setIsUpdateLoading(false);
      dispatch(updatePost({ id: _id, postImage: responseData.url.toString() }));
    }

    if (!isUpdateLoading && updateCaption && responseData) {
      setIsUpdateLoading(false);
      dispatch(
        updatePost({
          id: _id,
          caption: updateCaption,
          postImage: responseData.url.toString(),
        })
      );
    }

    // if (responseData && !isPostLoading && !caption) {
    //   // setPostURL(responseData.url.toString());
    //   setIsPostLoading(false);

    //   dispatch(
    //     createPost({
    //       postImage: responseData.url.toString(),
    //     })
    //   );
    // }

    // if (responseData && !isPostLoading && caption) {
    //   setIsPostLoading(false);

    //   dispatch(
    //     createPost({
    //       caption,
    //       postImage: responseData.url.toString(),
    //     })
    //   );
    // }
  };

  console.log("base64Update", base64Update);
  console.log("updateImage", updateImage);

  // ------------------------------------------------------------------------------
  return (
    <div className="flex flex-col  bg-whiteColor dark:bg-secondaryColor  rounded-xl p-10 gap-4  ">
      {/* Update Component */}
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

          {author._id === user?._id && (
            <BiDotsVerticalRounded
              size={20}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              onClick={() => setUpdateDeleteOpen(!updateDeleteOpen)}
            />
          )}
          {/* Edit, Delete Modal */}

          {updateDeleteOpen ? (
            <div
              className="absolute top-0 right-0  mt-8 z-10"
              ref={updateDeleteOpenRef}
            >
              <div className="absolute top-[-3px] right-[6px] w-2.5 h-2.5 gap-3 rounded-sm bg-secondaryColor text-whiteColor dark:bg-white rotate-45"></div>
              <div className="flex flex-col p-4 gap-3 rounded-lg bg-secondaryColor text-whiteColor dark:bg-white">
                <small
                  className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer"
                  onClick={() => {
                    setIsUpdateFieldOpen(true);
                    setUpdateDeleteOpen(false);
                  }}
                >
                  Edit
                </small>
                <small
                  className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer"
                  onClick={() => {
                    handleDelete();
                    setUpdateDeleteOpen(false);
                  }}
                >
                  Delete
                </small>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* Post Text */}
      {!isUpdateFieldOpen && (
        <p className=" text-secondaryColor dark:text-whiteColor">
          {`${caption}`}
        </p>
      )}
      {/* Edit Caption Functionality */}
      {isUpdateFieldOpen && (
        <textarea
          placeholder="Start typing...What would you like to share?"
          name="caption"
          value={updateCaption}
          onChange={(e) => setUpdateCaption(e.target.value)}
          className="  resize-none inputStyle bgSecondaryColorLight dark:bgWhiteColorLight w-full focus:outline-none text-secondaryColor dark:text-whiteColor rounded-lg p-3 h-14"
          // ref={}
        ></textarea>
      )}
      {/* Post Picture */}
      {postImage && !isUpdateFieldOpen && (
        <div className="relative flex justify-center items-center w-full h-[400px] bg-red-500 rounded-lg">
          <img
            src={postImage}
            alt={postImage}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}

      {/* Update post Image Placeholder */}
      {isUpdateFieldOpen && postImage && (
        <div className="relative flex justify-center items-center w-full h-[400px] bg-transparent border border-secondaryColor dark:border-whiteColor rounded-lg  ">
          {(base64Update || updateImage) && (
            <RxCross2
              size={24}
              className="absolute top-3 right-3 cursor-pointer text-reject"
              onClick={() => {
                setBase64Update(undefined);
                setUpdateImage(undefined);
                // setpost(undefined);
              }}
            />
          )}

          {!base64Update && !updateImage ? (
            <div className="relative w-full h-full ">
              <label
                htmlFor="fileUpdate"
                className=" absolute flex justify-center items-center w-full h-full"
              >
                <div className="flex flex-col items-center">
                  <AiOutlinePicture
                    size={50}
                    className=" text-secondaryColor dark:text-whiteColor opacity-50"
                  />
                  <small className="cursor-pointer dark:text-whiteColor text-[12px] text-secondaryColor p-2 rounded-full bg-secondaryColor/[25%] dark:bg-whiteColor/[25%]">
                    Upload Image
                  </small>
                </div>
              </label>

              <input
                type="file"
                id="fileUpdate"
                title=""
                accept=".jpg,.png,.jpeg"
                name="updateImageFile"
                // value={postImage}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setUpdateImageFile(e.target?.files?.[0]);
                  // setUpdateImage(shallowUpdatePostObject.postImage);
                }}
                className="w-full h-full  bg-blue-500 rounded-lg opacity-0 cursor-pointer "
              />
            </div>
          ) : updateImage ? (
            <img
              src={updateImage}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
          ) : base64Update ? (
            <img
              src={base64Update}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            ""
          )}
        </div>
      )}

      {/* Update Button---------------------------------------------------- */}
      {isUpdateFieldOpen && (
        <div className="text-right">
          <button className="btnPrimary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* Likes Comment Share */}
      {!isUpdateFieldOpen && (
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
                  : `${comments.length} Comment${
                      comments.length > 1 ? "s" : ""
                    }`}
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
      )}
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
