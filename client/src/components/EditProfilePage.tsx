import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { updateUser } from "../features/auth/authSlice";

export type FormData = {
  firstName: string;
  lastName: string;
  userName: string;
  bio: string;
  profilePic?: string;
  coverPic?: string;
};

interface UpdateObject {
  [key: string]: string | number | undefined;
}

// Form Validation---------------------------------------------------
const validationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  userName: yup.string(),
  bio: yup.string(),
});

// ------------------------------------------------------------------

const EditProfilePage = () => {
  // Styling--------------------------------------
  const inputClassname =
    "w-full text-sm pr-4 pl-4 pt-2 pb-2 mt-1 mb-1.5 rounded-lg  dark:text-whiteColor text-secondaryColor outline-none pr-10 dark:bg-secondaryColor bg-white";

  const labelClassName =
    "text-[12.5px] font-semibold mb-[-8px] dark:text-whiteColor text-secondaryColor ";
  const errorClassName = "text-[12.5px] font-semibold mb-[-8px] text-red-500";

  let activeClassName =
    "rounded-full bg-primaryColor pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer";

  let inActiveClassName =
    "rounded-full bg-offlineGray bg- pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer";

  // --------------------------------------------

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  // ----------------------------------------------

  const [isRegistrationLoading, setIsRegistrationLoading] =
    useState<boolean>(false);

  const [base64ProfilePic, setBase64ProfilePic] = useState<
    string | undefined
  >();
  const [base64CoverPic, setBase64CoverPic] = useState<string | undefined>();
  const [isProfilePicLoading, setIsProfilePicLoading] =
    useState<Boolean>(false);
  const [isCoverPicLoading, setIsCoverPicLoading] = useState<Boolean>(false);
  const [isUpdatUserLoading, setIsUpdatUserLoading] = useState<Boolean>(false);
  const [profileImage, setProfileImage] = useState<File | undefined>();
  const [coverImage, setCoverImage] = useState<File | undefined>();

  const registerDataObject = {
    firstName: watch("firstName"),
    lastName: watch("lastName"),
    userName: watch("userName"),
    bio: watch("bio"),
  };

  // ---Redux Tool kit--------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  // Set Preview------------------------------------------------------------
  useEffect(() => {
    const reader = new FileReader();
    if (profileImage) {
      reader.readAsDataURL(profileImage as File);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // base64-encoded string
        setBase64ProfilePic(e.target?.result as string);
      };
    }
  }, [profileImage]);

  useEffect(() => {
    const reader = new FileReader();
    if (coverImage) {
      reader.readAsDataURL(coverImage as File);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // base64-encoded string
        setBase64CoverPic(e.target?.result as string);
      };
    }
  }, [coverImage]);

  // -------------------------------------------------------------------------
  // Upload to Cloudinary
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handleProfilePictureUpload = async () => {
    if (!base64ProfilePic) {
      setBase64ProfilePic(undefined);
      setIsProfilePicLoading(false);
    }

    if (base64ProfilePic) {
      const data = new FormData();
      data.append("file", base64ProfilePic as string);
      data.append("upload_preset", `${upload_preset}`);
      data.append("cloud_name", `${cloud_name}`);

      try {
        setIsProfilePicLoading(true);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpcdcpyln/upload",
          {
            method: "post",
            body: data,
          }
        );
        const responseData = await response.json();
        setIsProfilePicLoading(false);
        return responseData;
      } catch (error) {
        setIsProfilePicLoading(false);
        throw new Error("Upload Failed");
      }
    }
  };

  const handleCoverPictureUpload = async () => {
    if (!base64CoverPic) {
      setBase64CoverPic(undefined);
      setIsCoverPicLoading(false);
    }

    if (base64CoverPic) {
      const data = new FormData();
      data.append("file", base64CoverPic as string);
      data.append("upload_preset", `${upload_preset}`);
      data.append("cloud_name", `${cloud_name}`);

      try {
        setIsCoverPicLoading(true);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpcdcpyln/upload",
          {
            method: "post",
            body: data,
          }
        );
        const responseData = await response.json();
        setIsCoverPicLoading(false);
        return responseData;
      } catch (error) {
        setIsCoverPicLoading(false);
        throw new Error("Upload Failed");
      }
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsUpdatUserLoading(true);

    const { firstName, lastName, userName, bio } = registerDataObject;

    if (
      !firstName &&
      !lastName &&
      !userName &&
      !bio &&
      !profileImage &&
      !coverImage
    ) {
      toast.warn(`You did not change anything, ${user?.firstName}`);
      setIsUpdatUserLoading(false);
      return;
    }

    const responseDataProfilePic = await handleProfilePictureUpload();
    const responseDataCoverPic = await handleCoverPictureUpload();

    await Promise.resolve();

    const updateObject = {
      ...registerDataObject,
    };

    const filteredUpdateObject: UpdateObject = {};

    for (const [key, value] of Object.entries(updateObject)) {
      if (value !== "" && value !== undefined) {
        filteredUpdateObject[key] = value;
      }
    }
    // filteredUpdateObject;

    if (!isProfilePicLoading && !isCoverPicLoading) {
      if (!responseDataProfilePic && !responseDataCoverPic) {
        await dispatch(updateUser(filteredUpdateObject));
      }

      if (responseDataProfilePic && !responseDataCoverPic) {
        await dispatch(
          updateUser({
            ...filteredUpdateObject,
            profilePic: responseDataProfilePic.url.toString(),
          })
        );
      }

      if (!responseDataProfilePic && responseDataCoverPic) {
        await dispatch(
          updateUser({
            ...filteredUpdateObject,
            coverPic: responseDataCoverPic.url.toString(),
          })
        );
      }

      if (responseDataProfilePic && responseDataCoverPic) {
        await dispatch(
          updateUser({
            ...filteredUpdateObject,
            profilePic: responseDataProfilePic.url.toString(),
            coverPic: responseDataCoverPic.url.toString(),
          })
        );
      }
    }

    setIsUpdatUserLoading(false);

    toast.success("Profile Updated Successfully");

    navigate("/profile");
  };

  return (
    <div className=" w-full lg:w-[50%] lg:flex flex-col gap-5 p-7   bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark z-10">
      <h1 className="text-center dark:text-whiteColor text-secondaryColor font-semibold text-lg mt-2">
        Edit Profile
      </h1>
      <small className="text-center dark:text-whiteColor text-secondaryColor text-sm italic">
        Fill out only the Fields you want to update
      </small>
      {/* Form inputs */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* First Name------------------------------------------------------------------- */}
        {errors.firstName ? (
          <p className={errorClassName}>{errors.firstName.message}</p>
        ) : (
          <label htmlFor="firstName" className={labelClassName}>
            First Name
          </label>
        )}
        <input
          id="firstName"
          type="text"
          placeholder="Enter First name"
          {...register("firstName")}
          className={inputClassname}
        />
        {/* ---------------------------------------------------------------------------- */}

        {/* Last Name------------------------------------------------------------------- */}
        {errors.lastName ? (
          <p className={errorClassName}>{errors.lastName.message}</p>
        ) : (
          <label htmlFor="lastName" className={labelClassName}>
            Last Name
          </label>
        )}
        <input
          id="lastName"
          type="text"
          placeholder="Enter Last name"
          {...register("lastName")}
          className={inputClassname}
        />
        {/* ---------------------------------------------------------------------------- */}

        {/* User Name-------------------------------------------------------------------  */}
        {errors.userName ? (
          <p className={errorClassName}>{errors.userName.message}</p>
        ) : (
          <label htmlFor="userName" className={labelClassName}>
            Username
          </label>
        )}
        <input
          id="userName"
          type="text"
          placeholder="Enter Username"
          {...register("userName")}
          className={inputClassname}
        />
        {/* ---------------------------------------------------------------------------- */}

        {/* Bio-------------------------------------------------------------------  */}
        {errors.bio ? (
          <p className={errorClassName}>{errors.bio.message}</p>
        ) : (
          <label htmlFor="bio" className={labelClassName}>
            Bio
          </label>
        )}
        <input
          id="bio"
          type="text"
          placeholder="Enter Bio"
          {...register("bio")}
          className={inputClassname}
        />
        {/* ---------------------------------------------------------------------------- */}

        {/* Profile Pic-------------------------------------------------------------------  */}

        <label htmlFor="profilePic" className={labelClassName}>
          Profile Picture
        </label>

        <input
          id="profilePic"
          type="file"
          accept=".jpg,.jpeg, .png"
          className={inputClassname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProfileImage(e.target?.files?.[0])
          }
        />
        {/* ---------------------------------------------------------------------------- */}

        {/* Cover Pic-------------------------------------------------------------------  */}

        <label htmlFor="coverPic" className={labelClassName}>
          Cover Picture
        </label>

        <input
          id="coverPic"
          type="file"
          accept=".jpg,.jpeg, .png"
          className={inputClassname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCoverImage(e.target?.files?.[0])
          }
        />
        {/* ---------------------------------------------------------------------------- */}

        {/* ---------------------------------------------------------------------------- */}

        <div className="flex justify-end gap-4">
          <button className="btnPrimary mt-4" type="submit">
            {isUpdatUserLoading ? "Updating..." : "Update Profile"}
          </button>
          <button
            className="btnPrimary mt-4"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
