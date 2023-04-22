import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    // <div className="flex justify-center items-center">
    <div className=" w-full flex items-center  bgSecondaryColorLight dark:bgWhiteColorLight  overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark mt-[4vh]">
      <div className="flex flex-col items-center justify-center">
        <p className="text-secondaryColor dark:text-whiteColor mt-5 text-[25px] md:text-[30px] font-semibold">
          404, Not Found
        </p>
        <div className="w-[35%] h-[35%] flex items-center justify-center mt-5">
          <img
            src="https://res.cloudinary.com/dpcdcpyln/image/upload/v1682151030/treffPunkt/dbuv8zdqjjx2hliltmmr.png"
            alt=""
          />
        </div>

        <p className="text-secondaryColor dark:text-whiteColor mt-5 text-sm md:text-md">
          You were lost, but we've got you covered
        </p>

        <Link to="/">
          <button className="btnPrimary flex items-center gap-2 mt-3">
            Now, return home
            <AiFillHome className="text-secondaryColor " />
          </button>
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
