import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">
        Civil Contractor
      </h2>

      <nav className="space-y-2">
        <NavLink to="/" className="block px-4 py-2 rounded hover:bg-gray-200">
          Dashboard
        </NavLink>

        <NavLink to="/projects" className="block px-4 py-2 rounded hover:bg-gray-200">
          Projects
        </NavLink>

        <NavLink to="/workers" className="block px-4 py-2 rounded hover:bg-gray-200">
          Workers
        </NavLink>
      </nav>
    </div>
  );
}
