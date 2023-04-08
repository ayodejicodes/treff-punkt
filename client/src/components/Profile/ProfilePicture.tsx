import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Post, getPosts } from "../../features/posts/postSlice";

interface ProfilePicture {
  size: number;
  src: string;
}

const ProfilePicture = ({ size }: ProfilePicture) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <img
      src={user?.profilePic}
      alt="profile"
      className={`object-cover w-${size} h-${size} rounded-full`}
    />
  );
};
export default ProfilePicture;
