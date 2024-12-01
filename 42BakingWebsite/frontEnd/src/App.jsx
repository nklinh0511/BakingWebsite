import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import LogIn from './components/LogIn';
import ViewRecipes from './components/ViewRecipes';
import RecipeDetail from './components/RecipeDetail';
import { Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Default is false, user is logged out initially

  // Handle login
  const handleLogin = () => setIsLoggedIn(true);

  // Handle logout
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Routes>
        {/* Render NavBar only for specific routes */}
        <Route
          path="/"
          element={<><NavBar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} /><Hero isLoggedIn={isLoggedIn} /></>}
        />
        
        <Route
          path="/login"
          element={<LogIn onLogin={handleLogin} />} // Login page will not show NavBar
        />
        
        <Route
          path="/signup"
          element={<LogIn onLogin={handleLogin} />} // Sign Up page will not show NavBar
        />
        
        {/* Protect /recipes route */}
        <Route 
          path="/recipes" 
          element={isLoggedIn ? <><NavBar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} /><ViewRecipes /></> : <Navigate to="/login" />} 
        />

        {/* Recipe detail route */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
