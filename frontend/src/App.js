import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Homepage from "./pages/Hompage";
import LoginPage from "./pages/Loginpage";
import "./index.css";

function App() {
  // ProtectedRoute component checks for the presence of a token
  const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    
    // If the token is valid, render the protected routes; otherwise, navigate to the login page
    return token ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          
          
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Homepage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
