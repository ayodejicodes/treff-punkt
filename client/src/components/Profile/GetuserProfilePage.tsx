import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import {
  User,
  followUser,
  setFollowingsCountDecrement,
  setFollowingsCountIncrement,
  unfollowUser,
} from "../../features/auth/authSlice";
import axios from "axios";
import NotFound from "../../pages/NotFound";
import { MdVerified } from "react-icons/md";
import { BiPlusMedical } from "react-icons/bi";
import { format } from "date-fns";
import {
  Chat,
  createChat,
  getChats,
  setSelectedChatId,
} from "../../features/chats/chatSlice";
import Spinner from "../Spinner/Spinner";

const GetUserProfile = () => {
  const { user, followingsCount } = useSelector(
    (state: RootState) => state.auth
  );
  const { chats, selectedChatId, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.chats
  );
  const { id } = useParams();
  const token = user?.token;
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isFollowed, setIsFollowed] = useState<Boolean | undefined>();
  // const [followingsCount, setFollowingsCount] = useState();

  const [followings, setFollowings] = useState<number>();
  const [followers, setFollowers] = useState<number>();

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
        setFollowings(res.followings.length);
        setFollowers(res.followers.length);
      } catch (error) {
        setError(true);
      }
    };

    getSingleUser();
  }, [id, isFollowed, followingsCount]);

  useEffect(() => {
    setIsFollowed(userProfile?.followers.includes(user?._id as string));
  }, [userProfile]);

  if (error) {
    return <NotFound />;
  }
  const handleFollow = async (id: string) => {
    try {
      await dispatch(followUser({ id }));
      setIsFollowed(true);
      dispatch(setFollowingsCountIncrement());
    } catch (error) {
      setIsFollowed(false);
      throw new Error("Could not Follow");
    }
  };
  const handleUnfollow = async (id: string) => {
    try {
      await dispatch(unfollowUser({ id }));
      setIsFollowed(false);
      dispatch(setFollowingsCountDecrement());
    } catch (error) {
      throw new Error("Could not Unfollow");
    }
  };

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
        <div className=" w-full lg:w-[50%] lg:flex flex-col gap-5  bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark z-10">
          {/* Cover and Profile Picture */}

          <div className="relative ">
            {!userProfile?.coverPic && (
              <img
                src="../../src/assets/cover-pic.jpg"
                alt="cover-pic"
                className="object-cover w-full h-48"
              />
            )}
            {userProfile?.coverPic && (
              <img
                src={userProfile?.coverPic}
                alt="cover-pic"
                className="object-cover w-full h-48"
              />
            )}

            <div className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center w-28 h-28 ">
              <img
                src={userProfile?.profilePic}
                alt="profile"
                className={`object-cover w-full h-full rounded-full cursor-pointer`}
              />
            </div>
          </div>

          <div className="mt-5 lg:mt-2 flex flex-col items-center justify-between h-full pt-12 pb-7 pl-20 pr-20">
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
              <div className="flex justify-center mb-10">
                <div className="flex gap-3 mt-1">
                  {!isFollowed && (
                    <button
                      className="btnPrimary text-[12px] flex items-center"
                      onClick={() => handleFollow(id as string)}
                    >
                      Follow
                      <BiPlusMedical
                        size={12}
                        className="text-secondaryColor dark:text-whiteColor cursor-pointer ml-2"
                      />
                    </button>
                  )}
                  {isFollowed && (
                    <button
                      className="btnPrimary text-[12px] flex items-center"
                      onClick={() => handleUnfollow(id as string)}
                    >
                      Unfollow?
                    </button>
                  )}
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
              <div>
                {/* Followers/Following */}
                <div className="flex flex-row justify-center mt-8 mb-10">
                  <div className="flex justify-between gap-1.5">
                    <div className="flex gap-1 items-center">
                      <small className="text-secondaryColor dark:text-whiteColor text-[14px] font-bold ">
                        {followings}
                      </small>
                      <small className="text-secondaryColor dark:text-whiteColor text-[14px] ">
                        Following
                      </small>
                    </div>

                    {/* Line Break */}
                    <div>
                      <small className=" textSecondaryColorLight  dark:textWhiteColorLight ">
                        |
                      </small>
                    </div>
                    {/* --------- */}

                    <div className="flex gap-1 items-center">
                      <small className="text-secondaryColor dark:text-whiteColor text-sm font-bold ">
                        {followers}
                      </small>
                      <small className="text-secondaryColor dark:text-whiteColor  text-[14px]  ">
                        {followers && followers > 1 ? "Followers" : "Follower"}
                      </small>
                    </div>
                  </div>
                </div>
                {userProfile?.bio && (
                  <>
                    <h1 className="text-secondaryColor dark:text-whiteColor font-semibold">
                      Bio
                    </h1>
                    <p className="text-center text-secondaryColor dark:text-whiteColor italic text-sm">
                      {userProfile.bio}
                    </p>
                  </>
                )}
                {!userProfile?.bio && (
                  <>
                    <h1 className="text-secondaryColor dark:text-whiteColor font-semibold">
                      Bio
                    </h1>
                    <p className="text-center text-secondaryColor dark:text-whiteColor italic text-sm">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptatem itaque dolor voluptates veniam explicabo!
                      Cumque illo dolore dicta aliquam ullam, asperiores
                      deserunt sint reprehenderit aspernatur!
                    </p>
                  </>
                )}
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
