import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../../components/project/ProjectForm";
import { getProjectById, updateProject } from "../../services/projectService";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const project = await getProjectById(id);

      setInitialData({
        project_name: project.project_name,
        parent_project: project.parent_project,
        location: project.location,
        start_date: new Date(project.start_date).toISOString().split('T')[0],
        end_date: project.end_date ? new Date(project.end_date).toISOString().split('T')[0] : "",
        status: project.status || "",
        hold_reason: project.hold_reason || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    await updateProject(id, data);
    navigate("/projects");
  };

  if (loading) return <p>Loading project...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Project</h2>

      <ProjectForm
        initialData={initialData}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
