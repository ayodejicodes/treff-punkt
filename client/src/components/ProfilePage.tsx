import { MdVerified } from "react-icons/md";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { reset } from "../features/auth/authSlice";
import moment from "moment";

import { format, parse, addDays } from "date-fns";
import PostCard from "./PostCard";
import axios from "axios";
import { Post } from "../features/posts/postSlice";

import { BiPlusMedical } from "react-icons/bi";

const ProfilePage = () => {
  const { user, followingsCount } = useSelector(
    (state: RootState) => state.auth
  );

  // const createdAt = moment(user?.createdAt).format("MMMM DD YYYY");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleteBoxOpen, setIsDeleteBoxOpen] = useState(false);

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

  // const [posts, setPosts] = useState<Post[]>();
  // const [error, setError] = useState(false);
  // const filteredPosts = posts?.filter((post) => post.author._id === user?._id);
  // const token = user?.token;

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   const getAllPosts = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:1024/api/posts",
  //         config
  //       );
  //       const res = await response.data;
  //       setPosts(res);
  //       setError(false);
  //     } catch (error) {
  //       setError(true);
  //     }
  //   };

  //   getAllPosts();
  // }, []);

  // console.log("filteredPosts", filteredPosts);

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
    <>
      <div className=" w-full lg:w-[50%] lg:flex flex-col gap-5  bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark z-10">
        {/* Cover and Profile Picture */}
        <div className="relative ">
          {!user?.coverPic && (
            <img
              src="../../src/assets/cover-pic.jpg"
              alt="cover-pic"
              className="object-cover w-full h-48"
            />
          )}
          {user?.coverPic && (
            <img
              src={user?.coverPic}
              alt="cover-pic"
              className="object-cover w-full h-48"
            />
          )}

          <div className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center w-28 h-28 ">
            <ProfilePicture />
          </div>
        </div>

        <div className="mt-5 lg:mt-2 flex flex-col items-center justify-between h-full pt-12 pb-7 pl-20 pr-20">
          {/* Details-------------------------------------*/}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1  ">
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
              <small className="text-secondaryColor dark:text-whiteColor mt-1.5  ">
                {`Joined ${format(
                  new Date(user?.createdAt as string),
                  "  dd MMM yyyy"
                )}`}
              </small>

              {/* Edit/Message/Follow */}
              <div className="mt-2">
                {/* <div className="flex gap-3 mt-3">
              <button className="btnPrimary text-[12px] flex items-center">
                Follow
                <BiPlusMedical
                  size={12}
                  className="text-secondaryColor dark:text-whiteColor cursor-pointer ml-2"
                  onClick={handleFollow}
                />
              </button>
              <button className="btnPrimary text-[12px]">Message</button>
            </div> */}
                <div className="text-center gap-3 mt-1">
                  <button
                    className="btnPrimary text-[12px]"
                    onClick={() => navigate("/edit-profile")}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

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
              {user?.bio && (
                <>
                  <h1 className="text-secondaryColor dark:text-whiteColor font-semibold">
                    Bio
                  </h1>
                  <p className="text-center text-secondaryColor dark:text-whiteColor italic text-sm">
                    {user.bio}
                  </p>
                </>
              )}
              {!user?.bio && (
                <>
                  <h1 className="text-secondaryColor dark:text-whiteColor font-semibold">
                    Bio
                  </h1>
                  <p className="text-center text-secondaryColor dark:text-whiteColor italic text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptatem itaque dolor voluptates veniam explicabo! Cumque
                    illo dolore dicta aliquam ullam, asperiores deserunt sint
                    reprehenderit aspernatur!
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Delete -------------------------------------------*/}
          {/* <div className="relative flex justify-end w-full ">
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
        </div> */}
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
