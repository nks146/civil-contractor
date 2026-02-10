import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/api/project");
      setProjects(res.data); // API returns array directly
    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-lg">Loading projects...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Projects</h1>

        <button
          onClick={() => alert("Add Project next step")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/projects/${p.id}`)}
              className="bg-white rounded-xl shadow p-5 hover:shadow-lg cursor-pointer transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {p.project_name}
              </h2>

              <p className="text-gray-600 mb-1">📍 {p.location}</p>

              <p className="text-sm text-gray-500">
                Start:{" "}
                {p.start_date
                  ? new Date(p.start_date).toLocaleDateString()
                  : "N/A"}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span
                  className={`font-medium px-2 py-1 rounded text-sm ${
                    p.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : p.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {p.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
