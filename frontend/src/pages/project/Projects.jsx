import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, deleteProject } from "../../services/projectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const AllProjects = await getProjects();
      setProjects(AllProjects); // API returns array
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const projectDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await deleteProject(id);
      //setProjects(projects.filter((p) => p.id !== id));
      fetchProjects(); // Refresh list after deletion
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Projects</h2>

        <button onClick={() => navigate("/projects/add")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow p-4 flex gap-4"
          >
            {/* IMAGE */}
            <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
              Image
            </div>

            {/* DETAILS */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">
                {p.project_name + (p.root_project ? ` (${p.root_project})` : "")}
              </h3>

              <p className="text-sm text-gray-600">📍 {p.location}</p>

              <p className="text-sm text-gray-500">
                Start:{" "}
                {p.start_date
                  ? new Date(p.start_date).toLocaleDateString()
                  : "N/A"}
              </p>

              <p className="mt-1">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    p.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : p.status === "Deleted"
                      ? "bg-red-100 text-red-700"
                      : p.status === "Hold"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {p.status}
                </span>
              </p>

              {/* ACTIONS */}
              <div className="mt-3 space-x-3 text-sm">
                <button
                  onClick={() => navigate(`/projects/${p.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>

                <button
                  onClick={() => navigate(`/projects/${p.id}/edit`)}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => projectDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
