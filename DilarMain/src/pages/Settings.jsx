// import React from 'react';
// import { Typography, Paper, Box, CircularProgress } from '@mui/material';

// function SettingsComingSoon() {
//   return (
//     <Paper elevation={3} className="p-6 max-w-md mx-auto flex flex-col items-center justify-center h-96">
//       <Box display="flex" flexDirection="column" alignItems="center">
//         <CircularProgress color="primary" className="mb-7" />
//         <Typography variant="h5" gutterBottom className="text-center">
//           Settings Coming Soon
//         </Typography>
//         <Typography variant="body2" color="textSecondary" className="text-center">
//           We're working hard to bring you a comprehensive settings experience.
//           Stay tuned for updates!
//         </Typography>
//       </Box>
//     </Paper>
//   );
// }

// export default SettingsComingSoon;

import React, { useState } from "react";
import {
  SettingsBackupRestore,
  Notifications,
  Security,
  Backup,
} from "@mui/icons-material";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword === passwordData.confirmPassword) {
      console.log("Password change request:", passwordData);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleExport = (type) => {
    console.log(`Exporting ${type} data`);
  };

  return (
    <div className="p-6 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <SettingsBackupRestore className="mr-2 text-2xl" />
          Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* App Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            App Preferences
          </h2>

          {/* <div className="mb-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Dark Mode</span>
            </label>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language Preference
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div> */}
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <Notifications className="mr-2 text-lg" />
            Notification Settings
          </h2>

          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 cursor-pointer">Email Notifications</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 cursor-pointer">SMS Notifications</span>
            </label>
          </div>
        </div>

        {/* Admin Password Change */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <Security className="mr-2 text-lg" />
            Admin Security
          </h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Please enter the Current Password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter the new password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter the Confirm Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className=" cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Export Data */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <Backup className="mr-2 text-lg" />
            Data Management
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => handleExport("contacts")}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700"
            >
              <Backup className="w-5 h-5" />
              <span>Export Contacts (CSV)</span>
            </button>

            <button
              onClick={() => handleExport("call-logs")}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700"
            >
              <Backup className="w-5 h-5" />
              <span>Export Call Logs (JSON)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
