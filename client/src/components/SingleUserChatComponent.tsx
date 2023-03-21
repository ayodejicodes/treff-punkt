import { useEffect, useState } from "react";
import NotificationIcon from "./NotificationIcon";

const SingleUserChatComponent = () => {
  const [online, setOnline] = useState<Boolean>(false);

  useEffect(() => {
    if (window.navigator.onLine === true) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, []);

  return (
    <div>
      {/* Image and Details */}
      <div className="border-t-2  w-full borderSecondaryColorLight dark:borderWhiteColorLight cursor-pointer">
        <div className="flex gap-3 componentsBorder hoverSecondaryColorLight dark:hoverWhiteColorLight p-3 rounded-xl mt-2.5 ">
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

          {/* Message Details */}
          <div className="flex flex-col  w-full">
            <div className="flex flex-col">
              <small className="text-secondaryColor dark:text-whiteColor text-[12px] font-semibold ">
                FirstName LastName
              </small>
              <small className="text-secondaryColor dark:text-whiteColor text-[10px] italic ">
                {online ? "Online" : "Offline"}
              </small>
            </div>
            <div className="flex gap-3 justify-between items-center">
              <small className="text-secondaryColor dark:text-whiteColor text-[12px] overflow-hidden whitespace-nowrap overflow-ellipsis w-4 grow">
                What's your plans for tomorrow eveing
              </small>
              <NotificationIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleUserChatComponent;
