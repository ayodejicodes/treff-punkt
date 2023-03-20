const SuggestedFriend = () => {
  return (
    <div>
      {/* Image and Details */}
      <div className="border-t-2  w-full borderSecondaryColorLight dark:borderWhiteColorLight">
        <div className="flex gap-3 componentsBorder hoverSecondaryColorLight dark:hoverWhiteColorLight p-3 rounded-xl mt-2.5 ">
          <div className="  w-10 h-10">
            <img
              src="../src/assets/ayo.jpg"
              alt=""
              className=" rounded-full cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-2.5 ">
            <div className="flex flex-col">
              <small className="text-secondaryColor dark:text-whiteColor text-[12px] font-semibold">
                FirstName LastName
              </small>
              <small className="text-secondaryColor dark:text-whiteColor text-[10px] italic">
                Follows you
              </small>
            </div>
            {/* Follow/Ignore Buttons */}
            <div className="flex flex-row gap-2.5">
              <button className="btnPrimary text-[9px] pt-1 pb-1 pl-2 pr-2 font-semibold">
                Follow Back
              </button>
              <button className="btnPrimaryReject text-[9px] pt-1 pb-1 pl-4 pr-4 font-semibold">
                Ignore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuggestedFriend;
