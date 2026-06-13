import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWorkers } from "../../services/workerService";
import WorkerTable from "../../components/worker/WorkerTable";

export default function Workers() {

  const [workers,setWorkers] = useState([]);
  const [search,setSearch] = useState("");
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{
    loadWorkers();
  },[]);

  const loadWorkers = async()=>{
    try {
      setLoading(true);
      setError("");
      const data = await getWorkers();
      setWorkers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load workers");
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkers = workers.filter(worker =>
    (worker.worker_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return(
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Workers
          </h1>
          <p className="text-gray-400">
            Manage all workers
          </p>
        </div>

        <Link
          to="/workers/add"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
        >
          + Add Worker
        </Link>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
        <input
          type="text"
          placeholder="Search worker..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
        />
      </div>

      {error && (
        <div className="bg-red-950 border border-red-800 text-red-200 rounded-xl p-4 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading workers...</p>
      ) : (
        <WorkerTable workers={filteredWorkers}/>
      )}

    </div>

  );

}
