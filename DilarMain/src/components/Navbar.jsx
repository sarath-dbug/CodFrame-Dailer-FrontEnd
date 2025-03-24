import React, { useState, useRef, useEffect } from "react";
import { SearchIcon, BellIcon, UserCircleIcon, VideoCameraIcon, XIcon } from "@heroicons/react/outline";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navbarRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <nav ref={navbarRef} className="bg-white shadow-md p-4 flex justify-end">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-stone-300 rounded-full cursor-pointer"
          >
            <SearchIcon className="h-5 w-5 text-gray-600" />
          </button>

          {isSearchOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg">
              <div className="flex items-center p-2 bg-stone-200 space-x-2">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search By Contact..."
                  className="p-2 bg-white rounded-md focus:outline-none w-64"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                >
                  <XIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="p-2 hover:bg-stone-300 rounded-full cursor-pointer">
          <BellIcon className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-stone-300 rounded-full cursor-pointer">
          <VideoCameraIcon className="h-5 w-5 text-gray-600" />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="p-2 hover:bg-stone-300 rounded-full cursor-pointer"
          >
            <UserCircleIcon className="h-7 w-7 text-gray-600" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-48">
              <div className="flex justify-between items-center px-4 py-2 border-b">
                <span className="text-sm font-bold">User Menu</span>
                <button
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="p-1 hover:bg-stone-300 rounded-full"
                >
                  <XIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <ul className="py-1">
                {["Profile Settings", "Logout", "Change Password", "Help"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-stone-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;