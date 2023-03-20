const image = "nature";

interface Prop {
  image: string;
}

const StoryCard = (prop: Prop) => {
  return (
    <div className="relative flex items-center justify-center rounded-lg  bgSecondaryColorLight dark:bgWhiteColorLight  ">
      <div className="w-[6.5em] h-40  rounded-lg ">
        <img
          src={`../src/assets/${prop.image}.jpg`}
          alt=""
          className="rounded-lg object-cover w-[8em] h-40"
        />
      </div>

      {/* Black overlay */}
      <div className="absolute w-[6.5em] h-40 bg-black/[32%] hover:bg-black/[20%] rounded-lg"></div>

      {/* User Stories Ring */}
      <div className="flex flex-col absolute top-24 items-center">
        {/* Image */}
        <div className="relative flex flex-col items-center ">
          <div className="w-8 h-8">
            <img src="../src/assets/ayo.jpg" alt="" className="rounded-full" />
          </div>
          {/* Stories Ring */}
          <div className="absolute bottom-[-12%] w-10 h-10 border-2 border-red-500 rounded-full "></div>
        </div>

        {/* Username */}
        <div>
          <small className=" borderSecondaryColorLight text-whiteColor text-[8px] font-semibold">
            Username
          </small>
        </div>
      </div>
    </div>
  );
};
export default StoryCard;
