import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { createPost, resetPost } from "../features/posts/postSlice";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const PostForm = () => {
  const [caption, setCaption] = useState<string | undefined>();
  const [postImage, setPostImage] = useState<File | string | undefined>();
  const [base64, setBase64] = useState<string>();
  const [isBase64Open, setIsBase64Open] = useState<Boolean>(false);
  const [postURL, setPostURL] = useState<string | undefined>();
  const [isPostLoading, setIsPostLoading] = useState<Boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // Upload to Cloudinary
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPostLoading(true);

    // console.log("Loading set true");

    if (!base64) {
      setPostURL(undefined);
      setIsPostLoading(false);

      // console.log("No 64");
      console.log("Loading set false");
    }
    if (base64) {
      const data = new FormData();
      data.append("file", base64 as string);
      data.append("upload_preset", `${upload_preset}`);
      data.append("cloud_name", `${cloud_name}`);

      try {
        await fetch("https://api.cloudinary.com/v1_1/dpcdcpyln/upload", {
          method: "post",
          body: data,
        })
          .then(async (res) => await res.json())
          .then(async (data) => {
            await data;
            setPostURL(data.url.toString());
            setIsPostLoading(false);
          });
      } catch (error) {
        setIsPostLoading(false);
        throw new Error("Upload Failed");
      }
    }

    if (!isPostLoading && (postURL !== undefined || caption !== undefined)) {
      dispatch(createPost(postFormDetails));
    }
  };

  useEffect(() => {
    console.log("postImage", postImage);
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

  const postFormDetails = {
    caption,
    postImage: postURL,
  };

  // ---Redux Tool kit--------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { posts, isLoading, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.posts
  );

  // -------------------------------------------------------------------------

  // useEffect(() => {
  // if (!isPostLoading && (postURL !== undefined || caption !== undefined)) {
  //   dispatch(createPost(postFormDetails));
  // }
  // !isPostLoading && postURL && console.log(postFormDetails);
  // console.log("isPostLoading", isPostLoading);
  // console.log("postFormDetails", postFormDetails);
  // }, [postImage]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      // setIsRegistrationLoading(false);
    }
    if (isSuccess) {
      toast.success("Posted Successful");
      // setIsRegistrationLoading(false);
      // navigate("/");
    }
    dispatch(resetPost());
  }, [posts, isSuccess, isError, message, dispatch]);
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

          <textarea
            placeholder="What would you like to share?"
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
                          setPostURL(undefined);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            {isPostLoading ? (
              <Spinner />
            ) : (
              <button className="btnPrimary">Post</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default PostForm;
