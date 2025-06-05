import React, { useState } from 'react';
import { Menu, Search, User, MoreVertical, Settings, LogOut, Bell } from 'lucide-react';

const Header = ({ onToggleSidebar, isSidebarOpen, setToken }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>

          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">MyApp</h1>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="More options"
            >
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <Bell className="h-4 w-4 mr-3" />
                  Notifications
                </a>
                <hr className="my-2" />
                <a className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors" onClick={() => {
                  debugger
                  localStorage.removeItem('token');
                  setToken(null)
                }}>
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
};


export default Header