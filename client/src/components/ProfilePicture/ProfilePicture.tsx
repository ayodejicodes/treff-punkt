import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Post, getPosts } from "../../features/posts/postSlice";

const ProfilePicture = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <img
      src={user?.profilePic}
      alt="profile"
      className={`object-cover w-full h-full rounded-full cursor-pointer`}
    />
  );
};
export default ProfilePicture;
