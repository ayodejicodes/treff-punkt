import { useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
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

const PostCard = () => {
  const [toggleLike, setToggleLike] = useState(false);
  const [savedPost, setSavedPost] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [updateDeleteOpen, setUpdateDeleteOpen] = useState(false);
  const [allCommentsOpen, setAllCommentsOpen] = useState(false);

  return (
    <div className="flex flex-col  bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[10%] dark:border-blackColor/[10%] rounded-xl p-10 gap-4 z-0 ">
      {/* User details and post creation date */}
      <div className="flex justify-between">
        {/* left */}
        <div>
          <div className="flex flex-row items-center gap-4">
            <div className="  w-12 h-12">
              <img
                src="../src/assets/ayo.jpg"
                alt=""
                className=" rounded-full cursor-pointer"
              />
            </div>
            <div>
              <h3 className="font-bold text-secondaryColor dark:text-whiteColor cursor-pointer">
                Firstname Lastname
              </h3>
              <small className=" text-secondaryColor dark:text-whiteColor">
                17 March at 08:25 PM
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
            <div className="absolute top-0 right-0  mt-8">
              <div className="absolute top-[-3px] right-[6px] w-2.5 h-2.5 gap-3 rounded-sm bg-secondaryColor text-whiteColor dark:bg-white rotate-45"></div>
              <div className="flex flex-col p-4 gap-3 rounded-lg bg-secondaryColor text-whiteColor dark:bg-white">
                <small className=" dark:text-secondaryColor text-whiteColor hover:bg-white/[10%] dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer">
                  Edit
                </small>
                <small className=" dark:text-secondaryColor text-whiteColor hover:bg-white/[10%] dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer">
                  Delete
                </small>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* Post Text */}
      <p className=" text-secondaryColor dark:text-whiteColor">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolorum
        quia consectetur mollitia, fuga doloribus ipsum dolores! Asperiores,
        iure pariatur?
      </p>
      {/* Post Picture */}
      <div className=" w-full h-[400px] bg-red-500 rounded-lg"></div>
      {/* Likes Comment Share */}
      <div className="flex justify-between">
        {/* Left */}

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {toggleLike ? (
              <AiTwotoneLike
                size={20}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer"
                onClick={() => {
                  setToggleLike(!toggleLike);
                }}
              />
            ) : (
              <BiLike
                size={20}
                className="text-secondaryColor dark:text-whiteColor cursor-pointer"
                onClick={() => {
                  setToggleLike(!toggleLike);
                }}
              />
            )}

            <small className="text-secondaryColor dark:text-whiteColor text-sm cursor-pointer">
              2.3k Likes
            </small>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <BiCommentDots
              size={20}
              className="text-secondaryColor dark:text-whiteColor"
            />
            <small className="text-secondaryColor dark:text-whiteColor text-sm">
              250 Comments
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
            80 Shares
          </small>
        </div>
      </div>
      {/* Comment Box */}
      <div className="relative flex items-center gap-4 ">
        <div className="  w-8 h-8">
          <img src="../src/assets/ayo.jpg" alt="" className=" rounded-full" />
        </div>
        <textarea
          placeholder="Comment of fIrYYstName Post"
          className="  resize-none text-sm bg-transparent pr-20 pl-4 pt-1.5 pb-1.5 w-full border border-secondaryColor/[20%] dark:border-whiteColor/[20%] focus:outline-none h-12  text-secondaryColor dark:text-whiteColor"
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
      <div className="flex justify-between items-center">
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

      {allCommentsOpen ? <CommentCard /> : ""}
    </div>
  );
};
export default PostCard;
