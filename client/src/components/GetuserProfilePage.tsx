import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { User } from "../features/auth/authSlice";
import axios from "axios";
import NotFound from "../pages/NotFound";
import { MdVerified } from "react-icons/md";
import { BiPlusMedical } from "react-icons/bi";
import { format } from "date-fns";
import {
  Chat,
  createChat,
  getChats,
  setSelectedChatId,
} from "../features/chats/chatSlice";
import Spinner from "./Spinner";

const GetUserProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { chats, selectedChatId, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.chats
  );
  const { id } = useParams();
  const token = user?.token;
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const getSingleUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1024/api/users/${id}`,
          config
        );
        const res = await response.data;
        setUserProfile(res);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };

    getSingleUser();
  }, [id]);

  if (error) {
    return <NotFound />;
  }
  const handleFollow = () => {};

  const handleChatClick = async (id: any) => {
    try {
      const createChatDispatch = await dispatch(createChat({ userID: id }));
      dispatch(setSelectedChatId(createChatDispatch.payload._id));
      const chats = await dispatch(getChats());
    } catch (error) {
      console.log(error);
    }
    navigate("/chats");
  };

  return (
    <>
      {userProfile ? (
        <div className="md:w-[50%] flex flex-col gap-5  bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark">
          {/* Cover and Profile Picture */}
          <div className="relative ">
            <img
              src="../../src/assets/cover-pic.jpg"
              alt="cover-pic"
              className="object-cover w-full h-48"
            />

            <div className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center w-28 h-28 ">
              <img
                src={userProfile?.profilePic}
                alt="profile"
                className={`object-cover w-full h-full rounded-full cursor-pointer`}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between h-full pt-12 pb-7 pl-7 pr-7">
            {/* Details-------------------------------------*/}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1  ">
                <small className="text-secondaryColor dark:text-whiteColor text-[16px] font-semibold ">
                  {`${userProfile?.firstName} ${userProfile?.lastName}`}
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
                  {`@${userProfile?.userName}`}
                </small>
                <small className="text-secondaryColor dark:text-whiteColor mt-1.5 mb-1.5 ">
                  {`Joined ${format(
                    new Date(user?.createdAt as string),
                    "  dd MMM yyyy"
                  )}`}
                </small>
              </div>
              {/* Edit/Message/Follow */}
              <div>
                <div className="flex gap-3 mt-1">
                  <button className="btnPrimary text-[12px] flex items-center">
                    Follow
                    <BiPlusMedical
                      size={12}
                      className="text-secondaryColor dark:text-whiteColor cursor-pointer ml-2"
                      onClick={handleFollow}
                    />
                  </button>
                  <button
                    className="btnPrimary text-[12px]"
                    onClick={() => {
                      handleChatClick(id);
                    }}
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default GetUserProfile;
