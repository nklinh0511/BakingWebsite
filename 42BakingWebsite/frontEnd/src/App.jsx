import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import LogIn from "./components/LogIn";
import ViewRecipes from "./components/ViewRecipes"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<LogIn alreadyReg/>} />
          <Route path="/signup" element={<LogIn />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
