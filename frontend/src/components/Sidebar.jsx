import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">
        Civil Contractor
      </h2>

      <nav className="space-y-2">
        <NavLink to="/" className={({ isActive }) =>`block px-4 py-2 rounded ${
    isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`}>
          Dashboard
        </NavLink>

        <NavLink to="/projects" className={({ isActive }) =>`block px-4 py-2 rounded ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`}>
          Projects
        </NavLink>

        <NavLink to="/workers" className={({ isActive }) =>`block px-4 py-2 rounded ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`}>
          Workers
        </NavLink>
      </nav>
    </div>
  );
}
