/*export default function Navbar() {
  return (
    <div className="bg-white p-4 shadow flex justify-between items-center">
      <h3 className="text-lg font-semibold">Dashboard</h3>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Hello, Niraj</span>
        <div className="w-8 h-8 bg-blue-500 rounded-full" />
      </div>
    </div>
  );
}
*/

import { useState } from 'react';
//const userData = localStorage.getItem("user");
  //console.log(userData);
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  let user = null;
  const userData = localStorage.getItem("user");
    if (userData) {
      user = JSON.parse(userData);
    }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    window.location.href = "/login";
  };

  return (
    <div className="bg-white p-4 shadow flex justify-between items-center">
      <h3 className="text-lg font-semibold">Dashboard</h3>
      <div className="flex items-center gap-3 relative">
        <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
        <button
          onClick={toggleDropdown}
          className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none"
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <a
              href="#profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}