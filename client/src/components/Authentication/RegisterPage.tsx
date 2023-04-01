import { useEffect, useRef, useState } from "react";
import useTheme from "../../hooks/useTheme";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const RegisterPage = () => {
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const [base64Image, setBase64Image] = useState<string | Blob | null>();
  const [isFileLarger, setIsFileLarger] = useState<boolean>(false);
  const [profilePicturePreview, setProfilePicturePreview] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // In Megabytes
  const approvedFileSize = 2;

  useEffect(() => {
    if (profilePicturePreview) {
      URL.revokeObjectURL(profilePicturePreview);
    }
  }, [profilePicturePreview]);

  // Styling--------------------------------------
  const inputClassname =
    "w-full text-sm pr-4 pl-4 pt-2 pb-2 mt-1 rounded-lg  dark:text-secondaryColor text-secondaryColor outline-none pr-10";

  const labelClassName = "text-[12.5px] font-semibold";

  let activeClassName =
    "rounded-full bg-primaryColor pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer";

  let inActiveClassName =
    "rounded-full bg-offlineGray bg- pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer";

  // --------------------------------------------

  interface RegisterFormData {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicture?: File | string;
  }

  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: undefined,
  });

  // Setting value destructured from FormData
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPassword,
    profilePicture,
  } = registerFormData;

  // Buttons Handlers
  // input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setRegisterFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check for Profile Picture Upload locally
    if (files && name === "profilePicture") {
      const profilePicture = files[0];
      // console.log(profilePicture.size);

      if (profilePicture) {
        const fileSizeInBytes = profilePicture?.size;
        const fileSizeInMB = Math.round(fileSizeInBytes / (1024 * 1000));

        if (fileSizeInMB > approvedFileSize) {
          console.log(`File is larger than ${approvedFileSize} mb`);
          setIsFileLarger(true);
          // URL.revokeObjectURL(profilePicturePreview as string);

          return;
        } else {
          setIsFileLarger(false);
          // Setting Preview
          setProfilePicturePreview(URL.createObjectURL(profilePicture));
        }

        // Converting to Base 64
        // ---------------------------------------------

        // Revoke the previous objectURL

        if (isFileLarger === false) {
          const reader = new FileReader();
          reader.readAsDataURL(profilePicture);
          reader.onload = (event: ProgressEvent<FileReader>) => {
            setBase64Image(reader.result?.toString());
          };
        }
      }
    }
  };

  // -----------------------------------------------------------------------------

  // Upload to Cloudinary and submit Registration form
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<object | undefined> => {
    e.preventDefault();

    if (base64Image) {
      const data = new FormData();
      data.append("file", base64Image);
      data.append("upload_preset", `${upload_preset}`);
      data.append("cloud_name", `${cloud_name}`);

      await fetch("https://api.cloudinary.com/v1_1/dpcdcpyln/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setRegisterFormData((prev) => ({
            ...prev,
            profilePicture: data.url,
          }));
        })
        .catch((error) => {
          throw new Error("Unable to fetch back the Profile Picture", error);
        });
    } else {
      // console.log(registerFormData);
      return registerFormData;
    }
  };

  // -----------------------------------------------------------------------

  // console.log(registerFormData);
  // console.log(registerFormData.profilePicture);
  console.log(isFileLarger);
  console.log(profilePicturePreview);
  console.log("typeof", typeof profilePicturePreview);

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
            action=""
            onSubmit={handleRegister}
            className="flex flex-col gap-2"
          >
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className={labelClassName}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter First name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                className={inputClassname}
              />
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className={labelClassName}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter Last name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                className={inputClassname}
              />
            </div>
            {/* Username */}
            <div>
              <label htmlFor="username" className={labelClassName}>
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your preferred username"
                name="userName"
                value={userName}
                onChange={handleChange}
                className={inputClassname}
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClassName}>
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
                className={inputClassname}
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className={labelClassName}>
                Password
              </label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className={inputClassname}
                />

                {showPassword && (
                  <FiEyeOff
                    size={14}
                    className="absolute top-[38%] right-[5%] text-secondaryColor cursor-pointer"
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
            </div>

            {/*Confirm  Password */}
            <div>
              <label htmlFor="password" className={labelClassName}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  className={inputClassname}
                />

                {showPassword && (
                  <FiEyeOff
                    size={14}
                    className="absolute top-[38%] right-[5%] text-secondaryColor cursor-pointer"
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
            </div>

            {/* Profile Picture */}
            <div className="flex items-center gap-2.5 mt-1 mb-1">
              <div className=" flex justify-center items-center w-8 h-8 rounded-full">
                {isFileLarger === false ||
                profilePicturePreview === undefined ? (
                  <img
                    src={profilePicturePreview}
                    alt={profilePicturePreview}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                ) : (
                  <FaUserCircle size={24} />
                )}
              </div>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="profilePicture"
                id="profilePicture"
                className="mt-1 mb-1"
                onChange={handleChange}
                ref={profilePictureRef}
              />
            </div>

            <button className="btnPrimary" type="submit">
              {isLoading ? "...Loading" : "Register"}
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
    </div>
  );
};
export default RegisterPage;
