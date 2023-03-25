import { MdVerified } from "react-icons/md";
import useOnlineStatus from "../hooks/useOnlineStatus";

const ShortProfile = () => {
  const online = useOnlineStatus();
  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="flex gap-3  hoverSecondaryColorLight dark:hoverWhiteColorLight p-3 rounded-xl ">
          {/* Image */}
          <div>
            <div className="relative w-10 h-10">
              <img
                src="../src/assets/ayo.jpg"
                alt=""
                className=" rounded-full "
              />
              {online ? (
                <div className="absolute border-4 border-whiteColor bg-onlineGreen w-4 h-4 right-0 top-0 rounded-full mt-7"></div>
              ) : (
                <div className="absolute border-4 border-whiteColor bg-offlineGray w-4 h-4 right-0 top-0 rounded-full mt-7"></div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col ">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 ">
                <small className="text-secondaryColor dark:text-whiteColor text-sm font-semibold">
                  FirstName LastName
                </small>
                <span>
                  <MdVerified
                    size={12}
                    className=" text-secondaryColor dark:text-whiteColor"
                  />
                </span>
              </div>
              <small className="text-secondaryColor dark:text-whiteColor italic">
                @dejifabz
              </small>
            </div>

            <hr className="border-t-1  w-full mt-1.5 mb-1.5 border borderSecondaryColorLight dark:borderWhiteColorLight "></hr>

            {/* Followers/Following */}
            <div className="flex flex-row">
              <div className="flex justify-between gap-1.5">
                <div className="flex gap-1 items-center">
                  <small className="text-secondaryColor dark:text-whiteColor text-sm font-bold ">
                    987
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
                    800
                  </small>
                  <small className="text-secondaryColor dark:text-whiteColor  ">
                    Followers
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
