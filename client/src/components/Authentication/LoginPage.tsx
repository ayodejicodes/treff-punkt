import useTheme from "../../hooks/useTheme";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterPage = () => {
  const { theme, setTheme } = useTheme();

  const inputClassname =
    "w-full text-sm pr-4 pl-4 pt-2 pb-2 mt-1 rounded-lg  dark:text-secondaryColor text-secondaryColor outline-none pr-10";

  const labelClassName = "text-[12.5px] font-semibold";

  let activeClassName =
    "rounded-full bg-primaryColor pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer";

  let inActiveClassName =
    "rounded-full bg-offlineGray pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer text-white";

  // Buttons Handlers\
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  // }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const [emailField, setEmailField] = useState<string>("");
  const [passwordField, setPasswordField] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Guest User
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPassword, setGuestPassword] = useState<string>("");
  const [isGuestClicked, setIsGuestClicked] = useState<boolean>(false);

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
      <div className="flex w-[55em] h-[37em] bg-secondaryColor/[95%] dark:bg-whiteColor dark:text-secondaryColor text-whiteColor rounded-xl ">
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

          <form
            action=""
            onSubmit={handleLogin}
            className=" flex flex-col gap-2"
          >
            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClassName}>
                Email or Username
              </label>
              <input
                type="text"
                name=""
                id="email"
                placeholder="Enter email"
                value={guestEmail ? guestEmail : emailField}
                onChange={(e) => setEmailField(e.target.value)}
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
                  name=""
                  id="password"
                  placeholder="Enter Password"
                  value={guestPassword ? guestPassword : passwordField}
                  onChange={(e) => setPasswordField(e.target.value)}
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

            {!isGuestClicked && (
              <button className="btnPrimary mt-4">Login</button>
            )}
            {isGuestClicked && (
              <button className="btnPrimary mt-4">Login As Guest</button>
            )}

            <div className="flex flex-col gap-2">
              <small className="text-center mb-2">
                Don't have an account yet?
                <Link
                  to="/register"
                  className="underline ml-1 hover:text-primaryColor"
                >
                  Register
                </Link>
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
export default RegisterPage;
