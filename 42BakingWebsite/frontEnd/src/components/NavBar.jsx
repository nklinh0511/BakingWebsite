import { useState } from "react";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom"; // Use Link instead of <a> for routing

const NavBar = ({ isLoggedIn, onLogin, onLogout }) => {
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleClick = () => {
    if (!openNavigation) return;
    setOpenNavigation(false);
  };

  console.log(isLoggedIn);

  return (
    <div className="fixed top-0 left-0 w-full max-w-full z-50">
      <div className="flex items-center my-6 px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link to="/" className="block w-[12rem] xl:mr-8 text-color-2 font-titan text-2xl">
          42Baking
        </Link>

        <nav className="fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto lg:bg-transparent">
          {/* Optionally, you can add navigation links here */}
          <SearchBox />
        </nav>

        

        <div className="flex">
          {/* Conditionally render buttons based on login state */}
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button
                  className="block relative py-2 px-6 mx-2 lg:-mr-0.25 text-color-6 font-poppins font-bold bg-color-4 button hover:bg-color-7 hover:text-color-3"
                >
                  Log In
                </button>
              </Link>

              <Link to="/signup">
                <button
                  className="block relative py-2 px-6 mx-2 lg:-mr-0.25 text-color-6 font-poppins font-bold bg-color-4 button hover:bg-color-7 hover:text-color-3"
                >
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={onLogout} // Call the onLogout function passed as prop
              className="block relative py-2 px-6 mx-2 lg:-mr-0.25 text-color-6 font-poppins font-bold bg-color-4 button hover:bg-color-7 hover:text-color-3"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
