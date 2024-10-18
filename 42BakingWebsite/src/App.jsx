import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import ViewRecipes from "./components/ViewRecipes"

function App() {

  return (
    <>
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <NavBar />
      <Hero />
      <ViewRecipes />

      </div>
    </>
  )
}

export default App
