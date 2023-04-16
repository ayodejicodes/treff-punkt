import { MdVerified } from "react-icons/md";
// import useOnlineStatus from "../hooks/useOnlineStatus";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShortProfile = () => {
  const { user, followingsCount } = useSelector(
    (state: RootState) => state.auth
  );
  const [followings, setFollowings] = useState<string[]>(
    user?.followings || []
  );
  const [followers, setFollowers] = useState<number>(
    user?.followers?.length || 0
  );

  // useEffect(() => {
  //   setFollowers((prev) => prev + followingsCount);
  //   // console.log("followers", followers);
  // }, [followingsCount]);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="flex gap-3  hoverSecondaryColorLight dark:hoverWhiteColorLight p-3 rounded-xl overf ">
          {/* Image */}

          <div className="relative w-10 h-10">
            <ProfilePicture />

            {/* {online ? (
              <div className="absolute border-4 border-whiteColor bg-onlineGreen w-4 h-4 right-0 top-0 rounded-full mt-7"></div>
            ) : (
              <di v className="absolute border-4 border-whiteColor bg-offlineGray w-4 h-4 right-0 top-0 rounded-full mt-7"></div>
            )} */}
          </div>

          {/* Details */}
          <div className="flex flex-col ">
            <div className="flex flex-col">
              <div
                className="flex items-center gap-1 cursor-pointer "
                // onClick={handleGetUserProfile}
              >
                <small className="text-secondaryColor dark:text-whiteColor text-sm font-semibold">
                  {`${user?.firstName} ${user?.lastName}`}
                </small>
                <span>
                  <MdVerified
                    size={12}
                    className=" text-secondaryColor dark:text-whiteColor"
                  />
                </span>
              </div>
              <small className="text-secondaryColor dark:text-whiteColor italic">
                {`@${user?.userName}`}
              </small>
            </div>

            <hr className="border-t-1  w-full mt-1.5 mb-1.5 border borderSecondaryColorLight dark:borderWhiteColorLight "></hr>

            {/* Followers/Following */}
            <div className="flex flex-row">
              <div className="flex justify-between gap-1.5">
                <div className="flex gap-1 items-center">
                  <small className="text-secondaryColor dark:text-whiteColor text-sm font-bold ">
                    {followingsCount}
                  </small>
                  <small className="text-secondaryColor dark:text-whiteColor ">
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
                    {user?.followers?.length}
                  </small>
                  <small className="text-secondaryColor dark:text-whiteColor  ">
                    {followers > 1 ? "Followers" : "Follower"}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShortProfile;
