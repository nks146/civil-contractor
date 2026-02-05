import { useNavigate } from "react-router-dom";
import ProjectForm from "../../components/project/ProjectForm";
import { createProject } from "../../services/projectService";

export default function AddProject() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createProject(data);
    navigate("/projects");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
      <ProjectForm onSubmit={handleCreate} />
    </div>
  );
}
