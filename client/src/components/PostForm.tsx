import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { createPost, resetPost } from "../features/posts/postSlice";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import ProfilePicture from "./ProfilePicture/ProfilePicture";

const PostForm = () => {
  const [caption, setCaption] = useState<string | undefined>();
  const [postImage, setPostImage] = useState<File | undefined>();
  const [base64, setBase64] = useState<string | undefined>();
  const [isBase64Open, setIsBase64Open] = useState<Boolean>(false);
  const [isPostLoading, setIsPostLoading] = useState<Boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // Set Preview------------------------------------------------------------
  useEffect(() => {
    const reader = new FileReader();
    if (postImage) {
      reader.readAsDataURL(postImage as File);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // base64-encoded string
        setBase64(e.target?.result as string);
        setIsBase64Open(true);
      };
    }
  }, [postImage]);

  // ---Redux Tool kit--------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { posts, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.posts
  );

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      // toast.success("Posted Successfully");
      setCaption("");
      setBase64(undefined);
      setIsBase64Open(false);
      // navigate("/");
    }
    dispatch(resetPost());
  }, [posts, isSuccess, isError, message, dispatch]);

  // -------------------------------------------------------------------------

  // Upload to Cloudinary
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handlePostUpload = async () => {
    if (!base64) {
      setBase64(undefined);
      setIsPostLoading(false);
    }

    if (base64) {
      const data = new FormData();
      data.append("file", base64 as string);
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
        setIsPostLoading(false);
        throw new Error("Upload Failed");
      }
    }
  };

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPostLoading(true);

    const responseData = await handlePostUpload();

    await Promise.resolve();

    if (!responseData) {
      setIsPostLoading(false);
      dispatch(
        createPost({
          caption,
        })
      );
    }

    if (responseData && !isPostLoading && !caption) {
      // setPostURL(responseData.url.toString());
      setIsPostLoading(false);

      dispatch(
        createPost({
          postImage: responseData.url.toString(),
        })
      );
    }

    if (responseData && !isPostLoading && caption) {
      setIsPostLoading(false);

      dispatch(
        createPost({
          caption,
          postImage: responseData.url.toString(),
        })
      );
    }
  };

  return (
    <div className="flex flex-col  bg-whiteColor dark:bg-secondaryColor  rounded-xl p-10 gap-2 ">
      {/* What would you like to post? */}

      <form onSubmit={handlePostSubmit}>
        <div className="flex gap-4">
          <div className="  w-12 h-12 bg-red-500">
            <ProfilePicture />
          </div>

          <textarea
            placeholder="Start typing...What would you like to share?"
            name="caption"
            value={caption}
            onChange={() => setCaption(textAreaRef?.current?.value)}
            className="  resize-none inputStyle bgSecondaryColorLight dark:bgWhiteColorLight w-full focus:outline-none text-secondaryColor dark:text-whiteColor rounded-lg p-3 h-14"
            ref={textAreaRef}
          ></textarea>
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
                <div className="flex gap-2 hoverSecondaryColorLight pt-1 pb-1 pl-2 pr-2 cursor-pointer rounded-lg dark:hoverWhiteColorLight">
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
                {isBase64Open && (
                  <div className="">
                    <div className="relative w-8 h-8 bg-green-500 ml-2 mt-[0.5]">
                      <img
                        src={base64}
                        alt=""
                        className="w-8 h-8 object-cover"
                      />
                      <RxCross2
                        size={14}
                        className="absolute top-0 right-0 text-red-500 cursor-pointer  "
                        onClick={() => {
                          setIsBase64Open(false);
                          setPostImage(undefined);
                          setBase64(undefined);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end ">
            {isPostLoading ? (
              <Spinner />
            ) : (
              <button
                className={`text-secondaryColor ${
                  !caption && !base64
                    ? "cursor-not-allowed btnPrimary bg-primaryColor/[60%] "
                    : "cursor-pointer btnPrimary"
                }`}
                disabled={!caption && !base64}
              >
                Post
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default PostForm;
