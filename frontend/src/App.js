import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Homepage from "./pages/Hompage";
import LoginPage from "./pages/Loginpage";
import DataProcessingpage1 from "./pages/DataProcessingpage1"
import DataProcessingPage2 from "./pages/DataProcessingPage2";
import DataProcessingPage3 from "./pages/DataProcessingPage3";
import FeedbackPage from "./pages/FeedbackPage";
import ProtectedRoute from "./utils/ProtectedRoute"; // Import the ProtectedRoute
import { AuthProvider } from "./context/AuthContext"; // Import the AuthContext provider
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />

            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dataprocessing1"
              element={
                <ProtectedRoute>
                  <DataProcessingpage1/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dataprocessing2"
              element={
                <ProtectedRoute>
                  <DataProcessingPage2/>
                </ProtectedRoute>
              }
            />
             <Route
              path="/dataprocessing3"
              element={
                <ProtectedRoute>
                  <DataProcessingPage3/>
                </ProtectedRoute>
              }
            />
                   <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;