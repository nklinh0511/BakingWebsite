import { navigation, loginNav } from "../constants";
import { useState } from "react";
import SearchBox from "./SearchBox";

const NavBar = () => {
  //this is to test git
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };


  return (
    <div className="fixed top-0 left-0 w-full max-w-full z-50 ">
        <div className="flex items-center my-6 px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
          <a className="block w-[12rem] xl:mr-8 text-color-2 font-titan text-2xl" href="./index.html">42Baking</a>
          <nav className="fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto lg:bg-transparent">
            {/*<div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={handleClick}
                  className={`block relative px-6 lg:-mr-0.25 text-color-6 font-poppins`}>
                  {item.title}
                </a>
              ))}
            </div>

            */}

          </nav>

          <SearchBox />

          <div className="flex ">
            {loginNav.map((item) => (
                <button
                  key={item.id}
                  href={item.url}
                  onClick={handleClick}
                  className={`block relative py-2 px-6 mx-2 lg:-mr-0.25  text-color-6 font-poppins font-bold bg-color-4 button hover:bg-color-7 hover:text-color-3`}>
                    <a href={item.url}>{item.title}</a>
                </button>
              ))}
          </div>

        </div>
    </div>
  )
}

export default NavBar
