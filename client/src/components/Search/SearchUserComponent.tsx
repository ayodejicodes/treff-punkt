import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { User, setKeyword } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface SearchResults {
  searchResult: User;
}

const SearchUserComponent = ({ searchResult }: SearchResults) => {
  //   const { user, isSuccess, isError, message } = useSelector(
  //     (state: RootState) => state.auth
  //   );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <div className="hidden lg:flex justify-center z-50">
      <div
        className="w-[80%] flex justify-between   dark:bg-secondaryColor text-secondaryColor dark:text-whiteColor bg-white pl-6 pr-6 rounded-lg  mb-6 cursor-pointer"
        onClick={() => {
          navigate(`/users/${searchResult._id}`);
          dispatch(setKeyword(null));
        }}
      >
        <div className="flex justify-between items-center w-full h-20">
          <div className="flex items-center gap-6">
            <div>
              <div className="  w-12 h-12 ">
                <img
                  src={searchResult?.profilePic}
                  alt=""
                  className="object-cover w-full h-full rounded-full cursor-pointer"
                />
              </div>
            </div>

            <div>
              <p className="font-semibold break-words">{`${searchResult.firstName} ${searchResult.lastName}`}</p>
            </div>
          </div>
          <div>
            <button className="btnPrimary text-[12px]">Show profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchUserComponent;
