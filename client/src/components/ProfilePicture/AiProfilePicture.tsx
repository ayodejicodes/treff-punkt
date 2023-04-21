import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const AiProfilePicture = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <img
      src="https://res.cloudinary.com/dpcdcpyln/image/upload/v1682114214/treffPunkt/tlh0flkrb5vhfn0mzptb.jpg"
      alt="profile"
      className={`object-cover w-full h-full rounded-full cursor-pointer`}
    />
  );
};
export default AiProfilePicture;
