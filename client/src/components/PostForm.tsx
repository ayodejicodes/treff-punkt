import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { createPost } from "../features/posts/postSlice";
import { RxCross2 } from "react-icons/rx";

const PostForm = () => {
  const [caption, setCaption] = useState<string>("");
  const [postImage, setPostImage] = useState<File | null>();
  const [preview, setPreview] = useState<string>();
  const [isPreviewOpen, setIsPreviewOpen] = useState<Boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const reader = new FileReader();
  if (postImage) {
    reader.readAsDataURL(postImage);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      // base64-encoded string
      setPreview(event?.target?.result as string);
      setIsPreviewOpen(true);
    };
  }

  const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postFormDetails = {
      caption,
      postImage,
    };

    console.log(postFormDetails);

    // dispatch(createPost(postFormDetails));
  };

  return (
    <div className="flex flex-col  bg-whiteColor dark:bg-secondaryColor  rounded-xl p-10 gap-2 ">
      {/* What would you like to post? */}

      <form onSubmit={handlePostSubmit}>
        <div className="flex gap-4">
          <div className="  w-12 h-12">
            <img
              src="../src/assets/ayo.jpg"
              alt=""
              className=" rounded-full cursor-pointer"
            />
          </div>

          <input
            type="text"
            placeholder="What would you like to share?"
            name="caption"
            value={caption}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCaption(e.target.value)
            }
            className="  resize-none inputStyle bgSecondaryColorLight dark:bgWhiteColorLight w-full focus:outline-none text-secondaryColor dark:text-whiteColor rounded-lg p-3 h-14"
          />
        </div>

        {/* Line Break */}
        <hr className="border-t-1  w-full mt-2 border borderSecondaryColorLight dark:borderWhiteColorLight "></hr>

        {/* Attachment and Post */}

        <div>
          <div>
            <div className="flex relative items-center ">
              <input
                type="file"
                id="file"
                title=""
                accept=".jpg,.png,.jpeg"
                name="postImage"
                // value={postImage}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPostImage(e.target?.files?.[0])
                }
                className=" opacity-0 cursor-none bg-transparent"
              />
              <div className=" absolute items-center top-2 left-0    ">
                <div className="flex gap-2 hoverSecondaryColorLight p-2 cursor-pointer rounded-lg dark:hoverWhiteColorLight">
                  <AiOutlinePicture
                    size={20}
                    className="text-secondaryColor dark:text-whiteColor "
                  />
                  <label
                    htmlFor="file"
                    className="hover:underline text-secondaryColor borderSecondaryColorLight dark:text-whiteColor text-[13px] cursor-pointer"
                  >
                    Click to upload Photo / Video
                  </label>
                </div>
                {isPreviewOpen && (
                  <div className="">
                    <div className="relative w-8 h-8 bg-green-500 ml-2 mt-[0.5]">
                      <img
                        src={preview}
                        alt=""
                        className="w-8 h-8 object-cover"
                      />
                      <RxCross2
                        size={14}
                        className="absolute top-0 right-0 text-red-500 cursor-pointer  "
                        onClick={() => {
                          setIsPreviewOpen(false);
                          setPostImage(null);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btnPrimary">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default PostForm;
