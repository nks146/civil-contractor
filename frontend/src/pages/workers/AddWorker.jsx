import { useNavigate } from "react-router-dom";
import WorkerForm from "../../components/worker/WorkerForm";
import { createWorker } from "../../services/workerService";

export default function AddWorker() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createWorker(data);
    navigate("/workers");
  };

  return(

    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">

      <h1 className="text-2xl text-white font-bold mb-6">
        Add Worker
      </h1>

      <WorkerForm onSubmit={handleCreate}/>

    </div>

  );

}
