import backgroundImg from "../assets/image/heroBackground.jpg"
import AddRecipes from "./AddRecipes"
import NavBar from "./NavBar"
import Ratings from "./Ratings"
import RecipeCard from "./RecipeCard"
import ViewRecipes from "./ViewRecipes"
import { useLocation } from 'react-router-dom';

const Hero = ({isLoggedIn}) => {
  const location = useLocation();
  const username = location.state?.username || "";

  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">

      <div className="relative m-0">
        <img src={backgroundImg} className="block w-full"/>
        <h1 className="absolute z-50 top-1/3 left-52 mt-10 p-0 w-full text-6xl font-titan text-color-6">
        Welcome to 42Baking!</h1>
        <h2 className="absolute z-50 top-1/2 left-2/4 m-0 p-0 w-full text-xl font-poppins text-color-6">Explore recipes by name or by ingredients</h2>
      </div>

      <div>
        
      </div>


      <div>
        {!isLoggedIn ? (
          <div></div>
          ) : (
           <AddRecipes />
          )}

         <ViewRecipes />

      </div>
    </div>
  )
}

export default Hero
