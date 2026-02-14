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
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded shadow min-h-screen mt-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Add New Project</h2>
      <ProjectForm onSubmit={handleCreate} />
    </div>
  );
}
