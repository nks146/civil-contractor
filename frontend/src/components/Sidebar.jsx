import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isWorkersOpen, setIsWorkersOpen] = useState(false);
  const location = useLocation();

  // Keeps the submenu open if the user is currently visiting a sub-project route
  const isSubProjectActive = location.pathname.startsWith("/projects/");
  const isSubWorkerActive = location.pathname.startsWith("/workers/");

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };
  const toggleWorkers = () => {
    setIsWorkersOpen(!isWorkersOpen);
  }

  // Shared styling helper for main navigation links
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition-colors ${isActive ? "bg-gray-700 text-white font-medium" : "hover:bg-gray-700 text-gray-300"
    }`;

  // Shared styling helper for sub-project links
  const subLinkClass = ({ isActive }) =>
    `block pl-8 pr-4 py-1.5 rounded text-sm transition-colors ${isActive ? "bg-gray-700 text-white font-medium" : "hover:bg-gray-700 text-gray-400"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-800 text-gray-200 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-blue-300 px-4">
          Civil Contractor
        </h2>

        <nav className="space-y-1">
          {/* Dashboard Link */}
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>

          {/* Projects Link */}
          <NavLink to="/projects" end className={linkClass}>
            Projects
          </NavLink>

          {/* Workers Link */}
          <div>
            <button
              onClick={toggleWorkers}
              className={`w-full flex items-center justify-between px-4 py-2 rounded text-left transition-colors ${isWorkersOpen || isSubWorkerActive ? "bg-gray-700 text-white font-medium" : "hover:bg-gray-700 text-gray-300"
                }`}
            >
              <span>Workers</span>
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${isWorkersOpen || isSubWorkerActive ? "rotate-180" : ""
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Sub Workers Container */}
            {(isWorkersOpen || isSubWorkerActive) && (
              <div className="mt-1 space-y-1 bg-gray-850/50 rounded-md">
                <NavLink to="/workers" end className={subLinkClass}>
                  All Workers
                </NavLink>
                {/* <NavLink to="/workers/attendance" className={subLinkClass}>
                  Attendance
                </NavLink> */}
              </div>
            )}
          </div>
          {/* Attendance Link */}
          <NavLink to="/attendance" className={linkClass}>
            Attendance
          </NavLink>

          {/* Orders Link */}
          <NavLink to="/orders" className={linkClass}>
            Orders
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
