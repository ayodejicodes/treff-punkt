const PostCard = () => {
  return (
    <div className="flex flex-col  bg-whiteColor dark:bg-secondaryColor border border-secondaryColor/[10%] dark:border-blackColor/[10%] rounded-xl p-10 gap-4">
      {/* User details and post creation date */}

      <div className="flex flex-row items-center gap-4">
        <div className="  w-12 h-12">
          <img src="../src/assets/ayo.jpg" alt="" className=" rounded-full" />
        </div>
        <div>
          <h3 className="font-bold text-secondaryColor">Firstname Lastname</h3>
          <small className=" text-secondaryColor">17 March at 08:25 PM</small>
        </div>
      </div>

      {/* Post Text */}
      <p className=" text-secondaryColor">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolorum
        quia consectetur mollitia, fuga doloribus ipsum dolores! Asperiores,
        iure pariatur?
      </p>

      {/* Picture */}
      <div className=" w-full h-[400px] bg-red-500"></div>
    </div>
  );
};
export default PostCard;
