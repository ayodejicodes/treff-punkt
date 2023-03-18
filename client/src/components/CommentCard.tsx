import { useState } from "react";
import { BsReplyFill, BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";

const CommentCard = () => {
  const [updateDeleteOpen, setUpdateDeleteOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2 dark:borderWhiteColorLight">
      <div className="flex flex-col gap-2 border-b-2 border-t-2 pt-3 pb-3 dark:borderWhiteColorLight">
        <div className="relative flex items-start  gap-3">
          <div className="  w-10 h-10 pt-2">
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

          <div className="pt-1">
            <BiDotsVerticalRounded
              size={20}
              className="  text-secondaryColor dark:text-whiteColor cursor-pointer "
              onClick={() => setUpdateDeleteOpen(!updateDeleteOpen)}
            />
          </div>

          {/* Update, Delete Comment */}
          {updateDeleteOpen ? (
            <div className="absolute top-0 right-0  mt-8">
              <div className="absolute top-[-3px] right-[6px] w-2.5 h-2.5 gap-3 rounded-sm bg-secondaryColor text-whiteColor dark:bg-white rotate-45"></div>
              <div className="flex flex-col p-4 gap-3 rounded-lg bg-secondaryColor text-whiteColor dark:bg-white">
                <small className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer">
                  Edit
                </small>
                <small className=" dark:text-secondaryColor text-whiteColor hoverWhiteColorLight dark:hoverSecondaryColorLight pl-2 pr-2 cursor-pointer">
                  Delete
                </small>
              </div>
            </div>
          ) : null}
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
      <div className="text-center mt-1">
        <small className="text-secondaryColor text-center dark:text-whiteColor text-[12px] cursor-pointer p-2 hoverSecondaryColorLight dark:hoverWhiteColorLight rounded-lg">
          View more comments
        </small>
      </div>
    </div>
  );
};
export default CommentCard;
