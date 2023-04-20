import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { User, setKeyword } from "../features/auth/authSlice";
import SearchUserComponent from "./SearchUserComponent";

const SearchParentComponent = () => {
  const { user, keyword } = useSelector((state: RootState) => state.auth);

  const token = user?.token;
  const [searchResults, setSearchResults] = useState<User[]>([]);

  // --------------------------------------------------------------------------------

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const searchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1024/api/users/?search=${keyword}`,
          config
        );
        const res = await response.data;
        setSearchResults([...res]);
      } catch (error) {
        throw new Error("Could not find Search request");
      }
    };

    searchUser();
  }, [keyword]);

  //   Handles Outside box Click---------------------------------------
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(e.target as Node)
    ) {
      dispatch(setKeyword(null));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef]);

  return (
    <div>
      {keyword && (
        <div
          ref={searchBoxRef}
          className={`absolute ${
            searchResults.length == 0
              ? "top-24"
              : searchResults.length == 1
              ? "top-36"
              : "top-48 xl:top-52 "
          } hidden lg:block rounded-lg left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[36%] items-center  bg-secondaryColor text-whiteColor dark:bg-white dark:text-secondaryColor z-50`}
        >
          <p className="text-center mt-2 mb-2">{`Search Result${
            searchResults.length > 1 ? "s" : ""
          }`}</p>
          {searchResults.length === 0 && (
            <p className="text-center mb-2 text-sm">
              No Matching Result- Click outside to close Window
            </p>
          )}
          {searchResults.length > 0 && (
            <p className="text-center mb-2 text-sm">
              View Profile or Click outside to close Window
            </p>
          )}
          {searchResults
            .slice(0, 2)
            ?.map((searchResult: User, index: number) => (
              <SearchUserComponent searchResult={searchResult} key={index} />
            ))}
        </div>
      )}
    </div>
  );
};
export default SearchParentComponent;
