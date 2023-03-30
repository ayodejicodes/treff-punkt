import { BsMoon, BsSun } from "react-icons/bs";
import useTheme from "../../hooks/useTheme";

const RegisterPage = () => {
  const { theme, setTheme } = useTheme();

  const inputClassname =
    "w-full text-sm pr-4 pl-4 pt-2 pb-2 mt-1 rounded-lg  dark:text-secondaryColor text-secondaryColor outline-none";

  const labelClassName = "text-sm font-semibold";

  return (
    <div className=" relative flex flex-col items-center justify-center w-full h-screen gap-5">
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

      <div className="flex bg-secondaryColor/[30%] dark:bg-white/[30%] p-2 rounded-full gap-2">
        <div className="rounded-full bg-primaryColor pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer">
          <h1 className="text-[13px]">Register </h1>
        </div>
        <div className="rounded-full bg-primaryColor pt-2 pb-2 pl-4 pr-4 text-sm cursor-pointer">
          <h1 className="text-[13px]">Log In</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex w-[50em] h-[32em] bg-secondaryColor/[95%] dark:bg-whiteColor dark:text-secondaryColor text-whiteColor rounded-xl ">
        {/* left */}
        <div className="w-[50%] bg-blue-500  rounded-xl ">
          <img
            src="../src/assets/registerpagepic.jpg"
            alt=""
            className="object-cover w-full h-full rounded-xl 
            "
          />
        </div>
        {/* Right */}
        <div className="w-[50%] ">
          {/* Form inputs */}

          <form action="" className="p-8 flex flex-col gap-2.5">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className={labelClassName}>
                First Name
              </label>
              <input
                type="text"
                name=""
                id="firstName"
                placeholder="Enter First name"
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
                name=""
                id="lastName"
                placeholder="Enter Last name"
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
                name=""
                id="username"
                placeholder="Enter your preferred username"
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
                name=""
                id="email"
                placeholder="Enter email"
                className={inputClassname}
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className={labelClassName}>
                Password
              </label>
              <input
                type="password"
                name=""
                id="password"
                placeholder="Enter Password"
                className={inputClassname}
              />
            </div>

            {/* Confirm Password */}
            {/* <div>
              <label htmlFor="confirmPassword" className={labelClassName}>
                Confirm Password
              </label>
              <input
                type="password"
                name=""
                id="confirmPassword"
                placeholder="Confirm Password"
                className={inputClassname}
              />
            </div> */}

            {/* Profile Picture */}
            <div>
              <div></div>
              <input
                type="file"
                name=""
                id="confirmPassword"
                placeholder="Confirm Password"
                className="mt-2 mb-2"
              />
            </div>
            <button className="btnPrimary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
