import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
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
                  <a className="flex items-center text-black"> 
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
