import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsMoon, BsSun } from "react-icons/bs";
import useTheme from "../../hooks/useTheme";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  profilePicture: FileList;
};

// Approved File Size
// in Bytes
const approvedProfilePicSizeBytes = 5 * 1000000;
const approvedProfilePicSizeMB = Math.round(
  approvedProfilePicSizeBytes / 1000000
);

// Form Validation---------------------------------------------------
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  userName: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  profilePicture: yup
    .mixed()
    .required("Profile picture is required")
    .test(
      "fileSize",
      `Profile picture size must not exceed ${approvedProfilePicSizeMB}MB`,
      (value) =>
        value &&
        (value as FileList)[0] &&
        (value as FileList)[0].size <= approvedProfilePicSizeBytes
    )
    .test(
      "fileType",
      "Profile picture must be a JPG, JPEG, PNG, or GIF",
      (value) =>
        value &&
        (value as FileList)[0] &&
        ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
          (value as FileList)[0].type
        )
    ),
});

// ------------------------------------------------------------------

const Register = () => {
  const { theme, setTheme } = useTheme();

  // Styling--------------------------------------
  const inputClassname =
    "w-full text-sm pr-4 pl-4 pt-2 pb-2 mt-1 rounded-lg  dark:text-secondaryColor text-secondaryColor outline-none pr-10";

  const labelClassName = "text-[12.5px] font-semibold mb-[-4px]";
  const errorClassName =
    "text-[12.5px] font-semibold mb-[-4px]  text-red-500 ml-1";

  let activeClassName =
    "rounded-full bg-primaryColor pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer";

  let inActiveClassName =
    "rounded-full bg-offlineGray bg- pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer";

  // --------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(validationSchema) });

  // ----------------------------------------------
  // Checking File Size

  const [profilePictureSizeError, setProfilePictureSizeError] = useState("");

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.size > approvedProfilePicSizeBytes) {
      setProfilePictureSizeError(
        `Profile picture size must not exceed ${approvedProfilePicSizeMB}MB`
      );
    } else {
      setProfilePictureSizeError("");
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    console.log(data);
  };

  {
    profilePictureSizeError !== "" && toast.error(profilePictureSizeError);
  }
  // console.log(profilePictureSizeError);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-secondaryColor dark:text-whiteColor">
      {/* ---------Light/Dark ----------*/}
      <div className="absolute top-8 right-12 flex items-center gap-2 ">
        <small>{`${
          theme == "dark" ? "Light" : "Dark"
        } mode? Click icon`}</small>
        {theme === "dark" ? (
          <BsSun
            size={20}
            className="cursor-pointer text-secondaryColor dark:text-whiteColor "
            onClick={() => {
              setTheme("light");
            }}
          />
        ) : (
          <BsMoon
            size={18}
            className="cursor-pointer text-secondaryColor  "
            onClick={() => setTheme("dark")}
          />
        )}
      </div>
      {/* ------------------------- */}

      {/* Register/ Login Navigation */}

      <div className="flex bg-secondaryColor/[30%] dark:bg-white/[30%] p-2 rounded-full gap-2 mb-6 mt-2">
        <NavLink
          to="/register"
          className={({ isActive }) => {
            if (isActive) {
              return activeClassName;
            } else if (!isActive) {
              return inActiveClassName;
            } else {
              return "";
            }
          }}
        >
          <h1 className="text-[13px]">Register </h1>
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) => {
            if (isActive) {
              return activeClassName;
            } else if (!isActive) {
              return inActiveClassName;
            } else {
              return "";
            }
          }}
        >
          <h1 className="text-[13px]">Log In</h1>
        </NavLink>
      </div>

      {/* Register */}
      {/* Form */}
      <div className="flex w-[55em] h-[37em] bg-secondaryColor/[95%] dark:bg-whiteColor dark:text-secondaryColor text-whiteColor rounded-xl ">
        {/* left */}
        <div className="w-[50%]   rounded-xl ">
          <img
            src="../src/assets/registerpagepic.jpg"
            alt=""
            className="object-cover w-full h-full rounded-xl 
            "
          />
        </div>
        {/* Right */}
        <div className="w-[50%] p-8">
          {/* Form inputs */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            {/* First Name------------------------------------------------------------------- */}
            {errors.firstName ? (
              <p className={errorClassName}>{errors.firstName.message}</p>
            ) : (
              <label htmlFor="firstName" className={labelClassName}>
                First Name
              </label>
            )}
            <input
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
              type="text"
              placeholder="Enter Last name"
              {...register("lastName")}
              className={inputClassname}
            />
            {/* ---------------------------------------------------------------------------- */}

            {/* Email------------------------------------------------------------------- */}
            {errors.email ? (
              <p className={errorClassName}>{errors.email.message}</p>
            ) : (
              <label htmlFor="email" className={labelClassName}>
                Email
              </label>
            )}
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email")}
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
              type="text"
              placeholder="Enter Username"
              {...register("userName")}
              className={inputClassname}
            />
            {/* ---------------------------------------------------------------------------- */}

            {/* Password------------------------------------------------------------------- */}
            {errors.password ? (
              <p className={errorClassName}>{errors.password.message}</p>
            ) : (
              <label htmlFor="password" className={labelClassName}>
                Password
              </label>
            )}
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password")}
              className={inputClassname}
            />
            {/* ---------------------------------------------------------------------------- */}

            {/* Confirm Password------------------------------------------------------------------- */}
            {errors.confirmPassword ? (
              <p className={errorClassName}>{errors.confirmPassword.message}</p>
            ) : (
              <label htmlFor="confirmPassword" className={labelClassName}>
                Confirm Password
              </label>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={inputClassname}
            />
            {/* ---------------------------------------------------------------------------- */}

            {/* Profile Picture------------------------------------------------------------------- */}

            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              {...register("profilePicture")}
              className={inputClassname}
              onChange={handleProfilePictureChange}
            />
            {/* ---------------------------------------------------------------------------- */}

            <button className="btnPrimary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
