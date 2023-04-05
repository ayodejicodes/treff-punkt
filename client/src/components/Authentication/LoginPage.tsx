import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import ThemeSwitcherIcon from "../Theme/ThemeSwitcherIcon";

const LoginPage = () => {
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

  const [emailField, setEmailField] = useState<string>("");
  const [passwordField, setPasswordField] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Guest User
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPassword, setGuestPassword] = useState<string>("");
  const [isGuestClicked, setIsGuestClicked] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  // --------------------------------------------

  // ---Redux Tool kit--------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      toast.success("Login Successful");

      navigate("/");
    }
    dispatch(reset());
  }, [user, isLoading, isError, message, dispatch]);

  // -------------------------------------------------------------------------

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email: guestEmail ? guestEmail : emailField,
      password: guestPassword ? guestPassword : passwordField,
    };

    dispatch(login(userData));
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-secondaryColor dark:text-whiteColor">
      {/* ---------Light/Dark ----------*/}
      <div className="absolute top-8 right-12 flex items-center gap-2 ">
        <small>Switch Theme</small>

        <ThemeSwitcherIcon size={20} />
      </div>
      {/* ------------------------- */}

      {/* Regsiter/ Login Navigation */}

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
      <div className="flex w-[55em] h-[36em] bg-secondaryColor/[95%] dark:bg-whiteColor dark:text-secondaryColor text-whiteColor rounded-xl ">
        {/* left */}
        <div className="w-[50%] rounded-xl ">
          <img
            src="../src/assets/loginpic.jpg"
            alt=""
            className="object-cover w-full h-full rounded-xl 
            "
          />
        </div>
        {/* Right */}
        <div className="w-[50%] flex flex-col justify-center p-8">
          <div className=" text-center mb-6">
            <h1 className="text-[20px] font-semibold">Login</h1>
          </div>

          {/* Form inputs */}

          <form action="" onSubmit={onSubmit} className=" flex flex-col gap-2">
            {/* Email------------------------------------------------------------------- */}

            <label htmlFor="email" className={labelClassName}>
              Email
            </label>

            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
              value={guestEmail !== "" ? guestEmail : emailField}
              disabled={isDisabled}
              onChange={(e) => setEmailField(e.target.value)}
              className={inputClassname}
            />
            {/* ---------------------------------------------------------------------------- */}

            {/* Password------------------------------------------------------------------- */}

            <label htmlFor="password" className={labelClassName}>
              Password
            </label>

            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Enter Password"
                value={guestPassword !== "" ? guestPassword : passwordField}
                disabled={isDisabled}
                onChange={(e) => setPasswordField(e.target.value)}
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

            <button type="submit" className="btnPrimary mt-4">
              {!isGuestClicked ? "Login" : "Login As Guest"}
            </button>

            <div className="flex flex-col justify-center gap-2">
              <small className="text-center mb-2">
                Don't have an account yet?
                <Link
                  to="/register"
                  className="underline ml-1 hover:text-primaryColor"
                >
                  Register
                </Link>
                {isGuestClicked && (
                  <Link
                    to="/login"
                    className="underline ml-1 hover:text-primaryColor"
                    onClick={() => {
                      setIsGuestClicked(false);
                      setGuestEmail("");
                      setGuestPassword("");
                      setIsDisabled(false);
                    }}
                  >
                    or Login as a User
                  </Link>
                )}
              </small>

              {/* Guest User */}
              {!isGuestClicked && (
                <div className="flex flex-col gap-2">
                  <small className="text-center">or</small>
                  <button
                    className="btnPrimary"
                    onClick={() => {
                      setGuestEmail("guestemail@tref.co");
                      setGuestPassword("guestpasswordtest123");
                      setIsGuestClicked(true);
                      setIsDisabled(true);
                    }}
                  >
                    Login As a Guest
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
