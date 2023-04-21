import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Spinner from "../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../../features/auth/authSlice";
import { AppDispatch, RootState } from "../../../src/app/store";
import ThemeSwitcherIcon from "../Theme/ThemeSwitcherIcon";
import {
  FaCloudUploadAlt,
  FaGithubSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaUserCircle,
} from "react-icons/fa";

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

// Form Validation---------------------------------------------------
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  userName: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

// ------------------------------------------------------------------

const Register = () => {
  // Styling--------------------------------------
  const inputClassname =
    "w-full text-sm pr-4 pl-4 pt-2 pb-2 mt-1 mb-1.5 rounded-lg  dark:text-secondaryColor text-secondaryColor outline-none pr-10";

  const labelClassName = "text-[12.5px] font-semibold mb-[-8px] ";
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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRegistrationLoading, setIsRegistrationLoading] =
    useState<boolean>(false);
  const [base64ProfilePic, setBase64ProfilePic] = useState<
    string | undefined
  >();
  const [profileImage, setProfileImage] = useState<File | undefined>();

  const [isProfilePicLoading, setIsProfilePicLoading] =
    useState<Boolean>(false);

  const registerDataObject = {
    firstName: watch("firstName"),
    lastName: watch("lastName"),
    userName: watch("userName"),
    email: watch("email"),
    password: watch("password"),
    confirmPassword: watch("confirmPassword"),
  };

  const { firstName, lastName, email, userName, password, confirmPassword } =
    registerDataObject;

  // ---Redux Tool kit--------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //     setIsRegistrationLoading(false);
  //   }
  //   if (isSuccess || user) {
  //     toast.success("Registration Successful");
  //     setIsRegistrationLoading(false);
  //     navigate("/");
  //   }
  //   dispatch(reset());
  // }, [user, isLoading, isError, message, dispatch]);

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

  // -------------------------------------------------------------------------

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsRegistrationLoading(true);
    const responseDataProfilePic = await handleProfilePictureUpload();

    await Promise.resolve();

    const userData = {
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword,
    };

    if (!responseDataProfilePic) {
      await dispatch(registerUser(userData));
    }
    if (responseDataProfilePic) {
      await dispatch(
        registerUser({
          ...userData,
          profilePic: responseDataProfilePic.url.toString(),
        })
      );
    }

    setIsRegistrationLoading(false);
    toast.success("Registration Successfully");

    navigate("/");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-secondaryColor dark:text-whiteColor">
      {/* ---------Light/Dark ----------*/}
      <div className="absolute top-7 right-12 flex items-center gap-2 ">
        <small className="hidden md:flex">Switch Theme</small>

        <ThemeSwitcherIcon size={20} />
      </div>
      {/* ------------------------- */}

      {/* Register/ Login Navigation */}

      <div className="flex bg-secondaryColor/[30%] dark:bg-white/[30%] p-2 rounded-full gap-2 mb-3 md:mb-4  md:mt-2">
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
      <div className="flex w-[22em] md:w-[40em] lg:w-[55em] h-[36em] bg-secondaryColor/[95%] dark:bg-whiteColor dark:text-secondaryColor text-whiteColor rounded-xl  ">
        {/* left */}
        <div className="hidden lg:flex md:w-[50%] rounded-xl ">
          <img
            src="https://res.cloudinary.com/dpcdcpyln/image/upload/v1682115114/treffPunkt/jdwzanwhu3nhxop2x1lp.jpg"
            alt=""
            className="object-cover w-full h-full rounded-xl 
            "
          />
        </div>
        {/* Right */}
        <div className="w-full  lg:w-[50%] flex flex-col justify-center p-8">
          {/* Form inputs */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-1.5"
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

            {/* Email------------------------------------------------------------------- */}
            {errors.email ? (
              <p className={errorClassName}>{errors.email.message}</p>
            ) : (
              <label htmlFor="email" className={labelClassName}>
                Email
              </label>
            )}
            <input
              id="email"
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
              id="userName"
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
            <div className="relative">
              <input
                id="password"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter Password"
                {...register("password")}
                className={inputClassname}
              />
              {showPassword && (
                <FiEyeOff
                  size={14}
                  className="  absolute top-[38%] right-[5%] text-secondaryColor cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
              {!showPassword && (
                <FiEye
                  size={14}
                  className=" absolute top-[38%] right-[5%] text-secondaryColor cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
            </div>

            {/* ---------------------------------------------------------------------------- */}

            {/* Confirm Password------------------------------------------------------------------- */}
            {errors.confirmPassword ? (
              <p className={errorClassName}>{errors.confirmPassword.message}</p>
            ) : (
              <label htmlFor="confirmPassword" className={labelClassName}>
                Confirm Password
              </label>
            )}
            <div className="relative">
              <input
                id="confirmPassword"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className={inputClassname}
              />
              {showPassword && (
                <FiEyeOff
                  size={14}
                  className=" absolute top-[38%] right-[5%] text-secondaryColor cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
              {!showPassword && (
                <FiEye
                  size={14}
                  className="absolute top-[38%] right-[5%] text-secondaryColor cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
            </div>
            {/* --------------------------Profile Pic upload-------------------------------------------------- */}

            <div className=" flex items-center gap-2.5 mt-[0.5] mb-[0.5]">
              {/* Preview */}
              <div className=" flex justify-center items-center w-8 h-8 rounded-full ">
                {base64ProfilePic ? (
                  <img
                    src={base64ProfilePic}
                    alt=""
                    className="w-8 h-8 object-cover rounded-full"
                  />
                ) : (
                  <FaUserCircle
                    size={24}
                    className="text-whiteColor dark:text-secondaryColor"
                  />
                )}
              </div>
              <div className=" relative flex gap-3 items-center pt-1 pb-1 pl-2 pr-2 bg-whiteColor rounded-lg hover:bg-offlineGray/[10%]">
                <div>
                  <FaCloudUploadAlt size={22} className="text-secondaryColor" />
                </div>
                <small className="whitespace-nowrap text-secondaryColor  ">
                  Upload Profile Picture
                </small>

                <input
                  id="profilePic"
                  type="file"
                  accept=".jpg,.jpeg, .png"
                  className="absolute left-0 mt-1 mb-1 w-48 opacity-0"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setProfileImage(e.target?.files?.[0])
                  }
                />
              </div>
            </div>

            {/* ---------------------------------------------------------------------------- */}

            <button className="btnPrimary mt-1" type="submit">
              {isRegistrationLoading ? <Spinner /> : "Register"}
            </button>

            <small className="text-center">
              Already have an account?
              <Link
                to="/login"
                className="underline ml-1 hover:text-primaryColor"
              >
                Login
              </Link>
            </small>
          </form>
        </div>
      </div>
      {/* Copyright */}
      <div className=" mt-3">
        <small className="text-secondaryColor dark:text-whiteColor text-[11px] text-center opacity-75">
          &copy;
          {` ${new Date().getFullYear()} | Designed and Developed by `}
          <span className="font-semibold"> Ayodeji Fabusiwa</span>
        </small>
        <div className="flex justify-center gap-2 mt-[1px]">
          <Link to="https://github.com/ayodejicodes" target="_blank">
            <FaGithubSquare
              size={17}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
            />
          </Link>

          <Link
            to="https://www.linkedin.com/in/ayodeji-fabusiwa/"
            target="_blank"
          >
            <FaLinkedin
              size={17}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              onClick={() => navigate("/")}
            />
          </Link>

          <Link to="https://twitter.com/ayodejicodes" target="_blank">
            <FaTwitterSquare
              size={17}
              className="text-secondaryColor dark:text-whiteColor cursor-pointer"
              onClick={() => navigate("/")}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
