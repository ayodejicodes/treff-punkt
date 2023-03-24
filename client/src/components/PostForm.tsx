import { AiOutlinePicture } from "react-icons/ai";

const PostForm = () => {
  return (
    <div className="flex flex-col  bg-whiteColor dark:bg-secondaryColor componentsBorder rounded-xl p-10 gap-4 z-0 ">
      {/* What would you like to post? */}
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
          className="  resize-none inputStyle bgSecondaryColorLight dark:bgWhiteColorLight w-full focus:outline-none text-secondaryColor dark:text-whiteColor rounded-lg p-3"
        ></textarea>
      </div>

      {/* Line Break */}
      <hr className="border-t-1  w-full mt-2 border borderSecondaryColorLight dark:borderWhiteColorLight "></hr>

      {/* Attachment and Post */}
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <div>
          <div className="flex relative items-center ">
            <input
              type="file"
              name="file"
              id="file"
              title=""
              accept=""
              className="opacity-0 cursor-none bg-transparent"
            />
            <div className="flex absolute items-center gap-2 cursor-pointer p-2 hoverSecondaryColorLight dark:hoverWhiteColorLight rounded-lg ">
              <label
                htmlFor="file"
                className="hover:underline text-secondaryColor borderSecondaryColorLight dark:text-whiteColor text-[13px] cursor-pointer"
              >
                Click to upload Photo / Video
              </label>
              <AiOutlinePicture
                size={20}
                className="text-secondaryColor dark:text-whiteColor "
              />
            </div>
          </div>
        </div>
        <div>
          <button className="btnPrimary">Post</button>
        </div>
      </div>
    </div>
  );
};
export default PostForm;
