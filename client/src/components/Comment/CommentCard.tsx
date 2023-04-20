import { useEffect, useRef, useState } from "react";
import { BsReplyFill, BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import {
  BiChevronDown,
  BiChevronUp,
  BiDotsVerticalRounded,
} from "react-icons/bi";
import { VscSmiley } from "react-icons/vsc";
import { FiSend } from "react-icons/fi";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

import {
  Comment,
  deleteComment,
  downvoteComment,
  upvoteComment,
} from "../../features/comments/commentSlice";
import { Post, getPosts } from "../../features/posts/postSlice";

export type CommentCardProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    _id,
    author,
    caption,
    upvotes,
    downvotes,
    post,
    createdAt,
    updatedAt,
  } = comment;

  const [commentOpen, setCommentOpen] = useState(false);
  const [allCommentsOpen, setAllCommentsOpen] = useState(false);
  const [commentsArray, setCommentsArray] = useState<Comment[]>();

  const [updateDeleteOpen, setUpdateDeleteOpen] = useState(false);

  const [toggleUpvote, setToggleUpvote] = useState<Boolean>(
    upvotes.includes(user?._id as string)
  );
  const [upvoteCount, setUpvoteCount] = useState<number>(upvotes.length);

  const [toggleDownvote, setToggleDownvote] = useState<Boolean>(
    downvotes.includes(user?._id as string)
  );
  const [downvoteCount, setDownvoteCount] = useState<number>(downvotes.length);
  const updateDeleteCommentOpenRef = useRef<HTMLDivElement>(null);
  const [updateDeleteCommentOpen, setUpdateDeleteCommentOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleClickOutsideComment = (e: MouseEvent) => {
    if (
      updateDeleteCommentOpenRef.current &&
      !updateDeleteCommentOpenRef.current.contains(e.target as Node)
    ) {
      setUpdateDeleteCommentOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideComment);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideComment);
    };
  }, [updateDeleteCommentOpenRef]);

  const handleCommentDelete = () => {
    dispatch(
      deleteComment({
        id: _id,
        postID: post,
      })
    );
  };

  const handleUpvote = async () => {
    await dispatch(upvoteComment({ id: _id, postID: post as string }));
    await Promise.resolve();

    if (toggleDownvote) {
      setDownvoteCount(downvoteCount - 1);
      setToggleDownvote(false);
    }

    if (!toggleUpvote) {
      setUpvoteCount(upvoteCount + 1);
    } else {
      setUpvoteCount(upvoteCount - 1);
    }

    setToggleUpvote(!toggleUpvote);
  };

  const handleDownvote = async () => {
    await dispatch(downvoteComment({ id: _id, postID: post as string }));
    await Promise.resolve();

    if (toggleUpvote) {
      setUpvoteCount(upvoteCount - 1);
      setToggleUpvote(false);
    }

    if (!toggleDownvote) {
      setDownvoteCount(downvoteCount + 1);
    } else {
      setDownvoteCount(downvoteCount - 1);
    }

    setToggleDownvote(!toggleDownvote);
  };

  return (
    <div className="flex flex-col gap-2 dark:borderWhiteColorLight">
      {/* ----------------------------------------------------------------- */}

      <div>
        {/* ------------------------------------------------------------------------- */}
        <div className="flex flex-col gap-[0.5]  border-t-2 pt-3 pb-3 mt-2 dark:borderWhiteColorLight w-full">
          <div className="relative flex items-start  gap-3 ">
            <div className="  w-8 h-8">
              <img
                src={author?.profilePic}
                alt=""
                className="object-cover w-full h-full rounded-full cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <div className="flex  w-full justify-between ">
                <div className="  ">
                  <small className="text-secondaryColor dark:text-whiteColor text-[12px] md:text-[13px]  font-semibold break-all">
                    {`${author.firstName} ${author.lastName}: `}
                  </small>
                  <span> </span>
                  <small
                    className="text-secondaryColor borderSecondaryColorLight dark:text-whiteColor text-[12px] md:text-[13px] break-all"
                    style={{ hyphens: "auto" }}
                  >
                    {caption}
                  </small>
                </div>

                <div className="pt-1 ">
                  <BiDotsVerticalRounded
                    size={20}
                    className="  text-secondaryColor dark:text-whiteColor cursor-pointer "
                    onClick={() =>
                      setUpdateDeleteCommentOpen(!updateDeleteCommentOpen)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Update, Delete Comment */}
            {updateDeleteCommentOpen ? (
              <div
                className="absolute top-0 right-0  mt-8"
                ref={updateDeleteCommentOpenRef}
              >
                <div className="absolute top-[-3px] right-[6px] w-2.5 h-2.5 gap-3 rounded-sm bg-secondaryColor text-whiteColor dark:bg-white rotate-45"></div>
                <div className="flex flex-col p-4 gap-3 rounded-lg bg-secondaryColor text-whiteColor dark:bg-white">
                  {/* <small
                    className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer"
                    onClick={() => {
                      handleCommentUpdate();
                      setUpdateDeleteCommentOpen(false);
                    }}
                  >
                    Edit
                  </small> */}
                  <small
                    className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer"
                    onClick={() => {
                      handleCommentDelete();
                      setUpdateDeleteCommentOpen(false);
                    }}
                  >
                    Delete
                  </small>
                </div>
              </div>
            ) : null}
          </div>

          {/* Reply, Upvote, Downvote */}

          <div className="flex justify-end items-center mr-[1.5rem]">
            {/* <div className="flex gap-1.5 pl-12 cursor-pointer">
              <BsReplyFill
                size={15}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer rotate-180"
              />
              <small className="text-secondaryColor dark:text-whiteColor text-[12px] ">
                Reply Comment
              </small>
            </div> */}
            {/* <div className="flex  items-center "> */}
            <div
              className="flex  items-center gap-1 cursor-pointer"
              onClick={handleUpvote}
            >
              <BsArrowUpShort
                size={20}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              />
              <small
                className={
                  toggleUpvote
                    ? " text-onlineGreen text-[12px]"
                    : "text-secondaryColor dark:text-whiteColor text-[12px] md:text-[13px]"
                }
              >
                Upvote
              </small>

              <small
                className={
                  toggleUpvote
                    ? " text-onlineGreen text-[12px] md:text-[13px] font-semibold"
                    : "text-secondaryColor dark:text-whiteColor text-[12px] md:text-[13px] font-semibold"
                }
              >
                {/* 20k */}
                {upvoteCount}
              </small>
            </div>

            <small className="text-secondaryColor dark:text-whiteColor text-[12px] md:text-[13px]  ml-2">
              |
            </small>

            <div
              className="flex  items-center gap-1 cursor-pointer"
              onClick={handleDownvote}
            >
              <BsArrowDownShort
                size={20}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              />
              <small
                className={
                  toggleDownvote
                    ? " text-red-500 text-[12px] md:text-[13px]"
                    : "text-secondaryColor dark:text-whiteColor text-[12px] md:text-[13px]"
                }
              >
                Downvote
              </small>

              <small
                className={
                  toggleDownvote
                    ? " text-red-500 text-[12px] md:text-[13px] font-semibold"
                    : "text-secondaryColor dark:text-whiteColor text-[12px] md:text-[13px] font-semibold"
                }
              >
                {/* 1k */}
                {downvoteCount}
              </small>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentCard;
