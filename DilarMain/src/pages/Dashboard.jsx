// Dashboard.js
import React, { useState, useEffect } from "react";
import { HiPhoneMissedCall } from "react-icons/hi";
import { Link } from "react-router-dom";
import Graphs from "../components/Graphs";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Date & Time Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-md shadow-lg space-y-2 md:space-y-0">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-ping"></div>
          <h2 className="text-2xl font-semibold text-gray-700">
            {formatDate(currentTime)}
          </h2>
        </div>
        <div className="text-xl font-medium text-blue-600">
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calls Card */}
            <Link to="/">
              <div className="bg-white shadow-xl rounded-md p-6 h-48 cursor-pointer relative hover:border hover:ease-in-out">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="font-bold text-lg md:text-2xl text-gray-700">
                      Calls
                    </h2>
                    <span className="font-bold text-2xl md:text-4xl text-gray-500 block mt-1 md:mt-2">
                      0
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 font-medium">Today</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Agents Card */}
            <div className="bg-white shadow-xl rounded-md p-6 h-48 cursor-pointer relative hover:border hover:ease-in-out">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="font-bold text-lg md:text-2xl text-gray-700">
                    Agents
                  </h2>
                  <span className="font-bold text-2xl md:text-4xl text-gray-500 block mt-1 md:mt-2">
                    0/1
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Card */}
          <div className="bg-white shadow-xl rounded-md p-6 cursor-pointer h-48 relative hover:border hover:ease-in-out">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="font-bold text-lg md:text-2xl text-gray-700">
                  Attendance
                </h2>
                <span className="font-bold text-2xl md:text-4xl text-gray-500 block mt-1 md:mt-2">
                  0/1
                </span>
              </div>
              <div className="text-right">
                <p className="text-gray-500 font-medium">Present</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 bg-white shadow-xl rounded-md p-6 cursor-pointer">
          <div className="flex flex-col justify-between h-full">
            <h2 className="font-bold text-lg md:text-2xl text-gray-700">
              Calls Overview
            </h2>
            <div className="text-center my-auto items-center flex justify-center flex-col">
              <span className="font-bold text-4xl md:text-6xl lg:text-8xl block">
                <HiPhoneMissedCall />
              </span>
              <p className="text-gray-500 text-lg md:text-xl lg:text-2xl font-medium mt-2">
                No Call Today
              </p>
            </div>
            <div className="text-right text-gray-500 text-sm md:font-medium">
              Last updated: {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </main>
      <Graphs/>
    </div>
  );
}

export default Dashboard;
