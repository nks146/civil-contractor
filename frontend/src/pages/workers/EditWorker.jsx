import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkerForm from "../../components/worker/WorkerForm";

import {getWorkerById, updateWorker} from "../../services/workerService";

export default function EditWorker() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [worker, setWorker] = useState(null);

    useEffect(() => {
        loadWorker();
    },[]);

    const loadWorker = async () => {
        try {
            const data = await getWorkerById(id); console.log(data);
            setWorker(data);
        }
        finally {
            setLoading(false);
        }
    };

    const handleUpdateWorker = async (formData) => {
            await updateWorker(id,formData);
            navigate("/workers");
        };

    if (loading) {
        return (
            <p className="text-white">
                Loading...
            </p>
        );
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h1 className="text-3xl text-white font-bold mb-6">
                Edit Worker
            </h1>
            <WorkerForm
                initialData={worker}
                onSubmit={handleUpdateWorker}
                buttonText="Update Worker"
            />
        </div>
    );

}