import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const navigate = useNavigate();

  const onLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in local storage");
      return;
    }
    const baseUrl = process.env.REACT_APP_API_URL;
    try {
      const apiUrl = `${baseUrl}/dev/auth/logout`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Logout failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <>
      
        <div className="navbar bg-neutral text-neutral-content"> 
          <div className="flex flex-1 mx-6">
            {/* Center Title */}
            <h1 className="text-xl font-bold mx-auto">Quick Data Processor</h1>
          </div>
          <div className="flex-none mx-4 gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <FontAwesomeIcon icon={faUser} size="2x" className="text-white" /> 
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" 
              >
                <li>
                  <a onClick={onLogout} className="flex items-center text-black"> 
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-red-500" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
   
    </>
  );
};

export default Header;
