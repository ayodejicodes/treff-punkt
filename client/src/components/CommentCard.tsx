import { useState } from "react";
import { BsReplyFill, BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";

const CommentCard = () => {
  return (
    <div className="flex flex-col gap-2 border-b-2 border-t-2 pt-3 pb-3 dark:borderWhiteColorLight">
      <div className="relative flex items-center gap-3 ">
        <div className="  w-10 h-10">
          <img src="../src/assets/ayo.jpg" alt="" className=" rounded-full" />
        </div>
        <div>
          <small className="text-secondaryColor dark:text-whiteColor text-[13px] font-semibold">
            FirstName LastName:
          </small>
          <span> </span>
          <small className="text-secondaryColor borderSecondaryColorLight dark:text-whiteColor text-[13px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
            earum voluptatum dolores, nesciunt deleniti natus.
          </small>
        </div>
      </div>

      {/* Reply, Upvote, Downvote */}

      <div className="flex justify-between items-center">
        <div className="flex gap-1.5 pl-12 cursor-pointer">
          <BsReplyFill
            size={15}
            className="text-secondaryColor dark:text-whiteColor cursor-pointer rotate-180"
          />
          <small className="text-secondaryColor dark:text-whiteColor text-[12px] ">
            Reply Comment
          </small>
        </div>
        <div className="flex  items-center ">
          <div className="flex  items-center gap-1 cursor-pointer">
            <BsArrowUpShort
              size={20}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
            />
            <small className="text-secondaryColor dark:text-whiteColor text-[12px] ">
              Upvote
            </small>

            <small className="text-secondaryColor dark:text-whiteColor text-[12px] font-semibold">
              20k
            </small>
          </div>

          <small className="text-secondaryColor dark:text-whiteColor text-[12px]  ml-2">
            |
          </small>

          <div className="flex  items-center gap-1 cursor-pointer">
            <BsArrowDownShort
              size={20}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
            />
            <small className="text-secondaryColor dark:text-whiteColor text-[12px] ">
              Downvote
            </small>

            <small className="text-secondaryColor dark:text-whiteColor text-[12px] font-semibold">
              1k
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentCard;
