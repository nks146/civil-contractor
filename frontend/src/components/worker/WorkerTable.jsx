import { Link } from "react-router-dom";

export default function WorkerTable({ workers }) {
    if (workers.length === 0) {
        return (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-gray-400">
                No workers found.
            </div>
        );
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-700">
                    <tr className="text-gray-300">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Mobile</th>                        
                        <th className="p-3 text-left">Address</th>
                        <th className="p-3 text-left">Base Rate</th>
                        <th className="p-3 text-left">Expertise</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Created On</th>
                        <th className="p-3 text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {workers.map(worker => (
                        <tr
                            key={worker.id}
                            className="border-t border-gray-700 hover:bg-gray-700"
                        >
                            <td className="p-3">
                                <Link
                                    to={`/workers/${worker.id}/attendance`}
                                    className="text-blue-400 hover:text-blue-300"
                                >
                                    {worker.worker_name}
                                </Link>
                            </td>
                            <td className="p-3">{worker.contact}</td>                            
                            <td className="p-3">{worker.address}</td>
                            <td className="p-3">₹{worker.base_rate}</td>
                            <td className="p-3">{worker.expertise}</td>
                            <td className="p-3">
                                <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs">
                                    {worker.status || "Active"}
                                </span>
                            </td>
                            <td className="p-3">
                                {worker.created_on
                                    ? new Date(worker.created_on).toLocaleDateString()
                                    : "-"}
                            </td>
                            <td className="p-3 flex gap-3">
                                <Link
                                    to={`/workers/${worker.id}/edit`}
                                    className="text-yellow-400"
                                >
                                    Edit
                                </Link>
                                <button className="text-red-400">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}
