import { MdVerified } from "react-icons/md";
import ProfilePicture from "./Profile/ProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { BsFillTrashFill } from "react-icons/bs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { reset } from "../features/auth/authSlice";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const createdAt = moment(user?.createdAt).format("MMMM DD YYYY");
  // const createdAt = moment(user?.createdAt).format("MMMM Do YYYY, h:mm:ss a");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleteBoxOpen, setIsDeleteBoxOpen] = useState(false);

  // Handles Outside box Click---------------------------------------
  const deleteBoxRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      deleteBoxRef.current &&
      !deleteBoxRef.current.contains(e.target as Node)
    ) {
      setIsDeleteBoxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteBoxRef]);
  // -----------------------------------------------------------------------

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // dispatch(logout());
    // dispatch(logout());
    dispatch(reset());
    navigate("/");

    toast.success("User Deleted Successfully");
  };

  return (
    <div className="md:w-[50%] flex flex-col gap-5  bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark">
      {/* Cover and Profile Picture */}
      <div className="relative ">
        <img
          src="../../src/assets/cover-pic.jpg"
          alt="cover-pic"
          className="object-cover w-full h-48"
        />

        <div className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center w-28 h-28 ">
          <ProfilePicture size={28} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between h-full pt-12 pb-7 pl-7 pr-7">
        {/* Details-------------------------------------*/}
        <div className="text-center">
          <div className="flex items-center gap-1  ">
            <small className="text-secondaryColor dark:text-whiteColor text-[16px] font-semibold text-center">
              {`${user?.firstName} ${user?.lastName}`}
            </small>
            <span>
              <MdVerified
                size={12}
                className=" text-secondaryColor dark:text-whiteColor"
              />
            </span>
          </div>
          <div className="flex flex-col">
            <small className="text-secondaryColor dark:text-whiteColor ">
              {`@${user?.userName}`}
            </small>
            <small className="text-secondaryColor dark:text-whiteColor mt-1.5 mb-1.5 ">
              {`Joined ${createdAt}`}
            </small>
          </div>
          {/* Edit/Message/Follow */}
          <div>
            {/* <div className="flex gap-3 mt-3">
            <button className="btnPrimary text-[12px]">Message</button>
            <button className="btnPrimary text-[12px]">Follow</button>
          </div> */}
            <div className="text-center gap-3 mt-1">
              <button className="btnPrimary text-[12px]">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Delete -------------------------------------------*/}
        <div className="relative flex justify-end w-full ">
          <div className="p-1 rounded-sm bg-secondaryColor text-red-500 dark:text-secondaryColor dark:bg-red-500 cursor-pointer ">
            <BsFillTrashFill
              size={18}
              onClick={() => setIsDeleteBoxOpen(!isDeleteBoxOpen)}
            />
          </div>
          {isDeleteBoxOpen && (
            <div
              className="absolute bottom-10 right-0 w-60 bg-secondaryColor dark:bg-white p-3 rounded-lg "
              ref={deleteBoxRef}
            >
              <div className="absolute bottom-[-3px] right-[6px] w-2.5 h-2.5 gap-3  bg-secondaryColor dark:bg-white rounded-sm   rotate-45"></div>
              <div className="flex flex-col gap-3">
                <small className="text-whiteColor dark:text-secondaryColor text-[13px]   text-center">
                  Are you sure you want to delete your acoount? This cannot be
                  undone.
                </small>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-red-500 pl-2 pr-2 pt-1 pb-1 rounded-full text-[13px] text-secondaryColor "
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button className="bg-reject pl-2 pr-2 pt-1 pb-1 rounded-full text-[13px] text-secondaryColor">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
