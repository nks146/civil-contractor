import { useEffect, useState } from "react";
import { getRootProjects } from "../../services/projectService";
import { validateAddProject } from "../../utils/validation";

export default function ProjectForm({ onSubmit, initialData = {} }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    project_name: "",
    parent_project: 0,
    location: "",
    start_date: "",
    end_date: "",
    status: "",
    hold_reason: "",
    ...initialData,
  });

  useEffect(() => {
    getRootProjects().then(setProjects);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    const validationError = validateAddProject(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit({
      ...form,
      parent_project: Number(form.parent_project),
      end_date: form.end_date || null,
      status: form.status || null,
      hold_reason: form.status === "Hold" ? form.hold_reason : null,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <p className="bg-red-900 text-red-200 p-2 rounded">
          {error}
        </p>
      )}

      <div>
        <label className="text-sm font-medium text-gray-300">Project Name *</label>
        <input
          name="project_name"
          value={form.project_name}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-gray-700 text-white px-3 py-2 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">Parent Project</label>
        <select
          name="parent_project"
          value={form.parent_project}
          onChange={handleChange}
          disabled={initialData?.parent_project === 0}
          className={`w-full border border-gray-700 bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500 ${
            initialData?.parent_project === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value={0}>No Parent (Main Project)</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.project_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">Location *</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-gray-700 text-white px-3 py-2 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">Start Date *</label>
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">End Date</label>
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">Not Set</option>
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Hold">Hold</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {form.status === "Hold" && (
        <div>
          <label className="text-sm font-medium text-gray-300">Hold Reason *</label>
          <textarea
            name="hold_reason"
            value={form.hold_reason}
            onChange={handleChange}
            className="w-full border border-gray-700 bg-gray-700 text-white px-3 py-2 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Save Project
        </button>
      </div>
    </form>
  );
}
