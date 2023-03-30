import RegisterPage from "../components/Authentication/RegisterPage";
import useTheme from "../hooks/useTheme";

const Register = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-screen text-secondaryColor dark:text-whiteColor">
      <div className="container containerPadding gap-6  flex justify-center ">
        <RegisterPage />
      </div>
    </div>
  );
};
export default Register;
