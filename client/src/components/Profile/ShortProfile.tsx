import { MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShortProfile = () => {
  const { user, followingsCount, followersCount } = useSelector(
    (state: RootState) => state.auth
  );
  const [followings, setFollowings] = useState<number>();
  const [followers, setFollowers] = useState<number>();

  const token = user?.token;
  const [error, setError] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const getAuthUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1024/api/users/${user?._id}`,
          config
        );
        const res = await response.data;

        setFollowings(res.followings.length);
        setFollowers(res.followers.length);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };

    getAuthUser();
  }, [followingsCount]);

  const navigate = useNavigate();

  return (
    <div>
      <div
        className="flex justify-center w-full cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <div className="flex gap-4 hoverSecondaryColorLight dark:hoverWhiteColorLight p-3 rounded-xl overf ">
          {/* Image */}

          <div className="relative w-9 h-9">
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
                <small className="text-secondaryColor dark:text-whiteColor text-[14px] font-semibold  ">
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
                    {followings}
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
                    {followers}
                  </small>
                  <small className="text-secondaryColor dark:text-whiteColor  ">
                    {followers && followers > 1 ? "Followers" : "Follower"}
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
