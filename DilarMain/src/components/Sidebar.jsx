import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { RxDashboard } from "react-icons/rx";
import { TbLogout, TbReportSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { AiOutlineCustomerService } from "react-icons/ai";
import { BsPeople, BsPersonBadge  } from "react-icons/bs";
import { MenuIcon } from "@heroicons/react/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCredentials } from '../features/authSlice';

const navLinkClasses = ({ isActive }) =>
  `w-full !py-4 !justify-start flex gap-3 text-[15px] !text-[#9da4b0] hover:!text-stone-500 !font-[500] items-center px-4 ${isActive
    ? "py-3 border-l-4 border-red-500 rounded-md bg-stone-200 !text-black"
    : "border-r-4 border-transparent"
  }`;

function Sidebar({ toggleSidebar, isSidebarOpen }) {
  const sidebarRef = useRef(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear Redux state
    dispatch(clearCredentials());

    // Clear sessionStorage
    sessionStorage.removeItem('auth');

    navigate('/login');
  };


  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-0 bottom-0 bg-[#0F172A] shadow-lg z-50 transition-all duration-300 flex flex-col ${isSidebarOpen ? "w-64" : "w-20"
        }`}
    >
      <div className="flex-grow">
        {/* Sidebar Header */}
        <div className="p-4 flex justify-between items-center border-b">
          {isSidebarOpen ? (
            <h1 className="text-lg font-semibold text-blue-700">Admin Panel</h1>
          ) : (
            <span className="text-sm font-medium text-blue-600">AP</span>
          )}
          <button
            onClick={() => toggleSidebar(!isSidebarOpen)} // Fixed toggle function
            className="p-2 hover:bg-stone-300 rounded-full mr-2 cursor-pointer"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <MenuIcon className="h-6 w-6 text-gray-600" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-4 space-y-2 px-4">
          <li>
            <NavLink to="/app/dashboard" className={navLinkClasses}>
              <RxDashboard className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/contacts" className={navLinkClasses}>
              <AiOutlineCustomerService className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">CRM</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/members" className={navLinkClasses}>
              <BsPersonBadge  className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">Members</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/teams" className={navLinkClasses}>
              <BsPeople  className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">Teams</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/reports" className={navLinkClasses}>
              <TbReportSearch className="text-[20px] text-red-500" />
              {isSidebarOpen && (
                <span className="ml-3">Call Logs & Reports</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/settings" className={navLinkClasses}>
              <MdOutlineSettings className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">Settings</span>}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <Button
          className="!w-full !py-4 gap-5 !text-[#9da4b0] hover:!bg-[#111826] !font-[500]"
          onClick={handleLogout}
        >
          <TbLogout className="text-[20px] text-red-500 font-bold" />
          {isSidebarOpen && (
            <span className="text-sm !text-[#9da4b0] hover:!text-white !font-[500]">
              Log Out
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
