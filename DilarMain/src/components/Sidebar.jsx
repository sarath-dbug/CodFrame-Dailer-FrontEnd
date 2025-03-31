import { Button } from "@mui/material";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { RxDashboard } from "react-icons/rx";
import { TbLogout, TbReportSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { AiOutlineCustomerService } from "react-icons/ai";
import { BsPeople, BsPersonBadge } from "react-icons/bs";
import { MenuIcon } from "@heroicons/react/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { selectCurrentToken, selectCurrentUser, clearCredentials } from '../features/authSlice';
import { setCurrentTeam, clearCurrentTeam } from '../features/teamSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const navLinkClasses = ({ isActive }) =>
  `w-full !py-4 !justify-start flex gap-3 text-[15px] !text-[#9da4b0] hover:!text-stone-500 !font-[500] items-center px-4 ${
    isActive
      ? "py-3 border-l-4 border-red-500 rounded-md bg-stone-200 !text-black"
      : "border-r-4 border-transparent"
  }`;

function Sidebar({ toggleSidebar, isSidebarOpen }) {
  const sidebarRef = useRef(null);
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [error, setError] = useState(null);

  const currentTeam = useSelector(state => state.team.currentTeam);
  const [selectedTeam, setSelectedTeam] = useState(currentTeam);

  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch Team Dialog Handlers
  const fetchTeams = useCallback(async () => {
    try {
      const userId = user?.id;
      if (!userId) return;
      
      const response = await axios.get(`${API_BASE_URL}/api/team/fetchTeamsByUser`, {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` }
      });

      setTeams(response.data.data);

      if (response.data.data?.length > 0) {
        let teamToSelect = currentTeam; 
        
        if (currentTeam && !response.data.data.some(t => t._id === currentTeam._id)) {
          teamToSelect = null;
        }
        
        if (!teamToSelect) {
          teamToSelect = response.data.data[0];
          dispatch(setCurrentTeam(teamToSelect));
        }
        
        setSelectedTeam(teamToSelect);
      }
    } catch (err) {
      console.error("Error fetching teams:", err);
    }
  }, [user, token, currentTeam, dispatch]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(clearCurrentTeam()); 
    sessionStorage.removeItem('auth');
    navigate('/login');
  };

  const toggleTeamDropdown = (e) => {
    e.preventDefault();
    setTeamDropdownOpen(!teamDropdownOpen);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    dispatch(setCurrentTeam(team));
    setTeamDropdownOpen(false);
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-0 bottom-0 bg-[#0F172A] shadow-lg z-50 transition-all duration-300 flex flex-col ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex-grow">
        {/* Sidebar Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          {isSidebarOpen ? (
            <h1 className="text-lg font-semibold text-blue-700">Admin Panel</h1>
          ) : (
            <span className="text-sm font-medium text-blue-600">AP</span>
          )}
          <button
            onClick={() => toggleSidebar()}
            className="p-2 hover:bg-stone-300 rounded-full mr-2 cursor-pointer"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <MenuIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-4 space-y-2 px-4">
          <li className="relative">
            {/* Team menu with dropdown toggle */}
            <div
              onClick={toggleTeamDropdown}
              className={`w-full mb-5 py-3 flex gap-3 text-[14px] text-[#9da4b0] hover:text-stone-500 font-[500] items-center px-4 cursor-pointer bg-[#1E293B] rounded ${
                selectedTeam 
                  ? "border-l-4 border-red-500" 
                  : "border-r-4 border-transparent"
              }`}
            >
              {isSidebarOpen && (
                <>
                  <span className="flex-grow">
                    Team: {selectedTeam?.name || "No team selected"}
                  </span>
                  {teams.length > 0 && (
                    teamDropdownOpen ? (
                      <FaChevronUp className="text-[10px]" />
                    ) : (
                      <FaChevronDown className="text-[10px]" />
                    )
                  )}
                </>
              )}
            </div>
            
            {/* Team dropdown */}
            {isSidebarOpen && teamDropdownOpen && teams.length > 0 && (
              <div className="pl-4 mt-1 space-y-1 bg-[#1E293B] rounded p-2">
                {teams.map(team => (
                  <button
                    key={team._id}
                    className={`w-full text-left flex items-center py-1 px-3 text-[12px] rounded ${
                      selectedTeam?._id === team._id
                        ? "bg-[#334155] text-white" 
                        : "text-[#9da4b0] hover:text-white hover:bg-[#334155]"
                    }`}
                    onClick={() => handleTeamSelect(team)}
                  >
                    <span>{team.name}</span>
                  </button>
                ))}
              </div>
            )}
          </li>

          {/* Dashboard */}
          <li>
            <NavLink to="/app/dashboard" className={navLinkClasses}>
              <RxDashboard className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </NavLink>
          </li>

          {/* CRM */}
          <li>
            <NavLink to="/app/contacts" className={navLinkClasses}>
              <AiOutlineCustomerService className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">CRM</span>}
            </NavLink>
          </li>

          {/* Member */}
          <li>
            <NavLink to="/app/members" className={navLinkClasses}>
              <BsPersonBadge className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">Member</span>}
            </NavLink>
          </li>

          {/* Team */}
          <li>
            <NavLink to="/app/teams" className={navLinkClasses}>
              <BsPeople className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">Team</span>}
            </NavLink>
          </li>

          {/* Call Logs & Reports */}
          <li>
            <NavLink to="/app/reports" className={navLinkClasses}>
              <TbReportSearch className="text-[20px] text-red-500" />
              {isSidebarOpen && (
                <span className="ml-3">Call Logs & Reports</span>
              )}
            </NavLink>
          </li>

          {/* Settings */}
          <li>
            <NavLink to="/app/settings" className={navLinkClasses}>
              <MdOutlineSettings className="text-[20px] text-red-500" />
              {isSidebarOpen && <span className="ml-3">Settings</span>}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
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