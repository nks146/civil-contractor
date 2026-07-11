import {Link, useNavigate } from "react-router-dom";
import ActionDropdown from "../common/ActionDropdown";
import {PencilSquareIcon, CalendarDaysIcon, TrashIcon} from "@heroicons/react/24/outline";

export default function WorkerTable({ workers, onDelete }) {
    const navigate = useNavigate();

    if (workers.length === 0) {
        return (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-gray-400">
                No workers found.
            </div>
        );
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-visible">
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
                        <th className="p-3 text-left">Updated On</th>
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
                                {worker.status === "Engaged" ? (
                                    <div className="relative group inline-block">
                                        <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs cursor-pointer">
                                            Engaged
                                        </span>
                                        <div
                                            className=" absolute hidden group-hover:block left-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white whitespace-nowrap shadow-lg z-[9999]
                                            "
                                        >
                                            <p className="text-gray-400 text-xs">Engaged Project: </p>
                                            {worker.engaged_project_name}
                                            <p className="text-gray-400 text-xs">Current Daily Rate: </p>
                                            ₹{worker.current_daily_rate}
                                        </div>
                                    </div>
                                ) : worker.status === "Inactive" ? (
                                    <span className="bg-red-900 text-red-300 px-2 py-1 rounded text-xs">
                                        Inactive
                                    </span>
                                ) : (
                                    <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs">
                                        Active
                                    </span>
                                )}
                            </td>
                            <td className="p-3">
                                {worker.created_on
                                    ? new Date(worker.created_on).toLocaleDateString("en-GB")
                                    : "-"}
                            </td>
                            <td className="p-3">
                                {worker.updated_on
                                    ? new Date(worker.updated_on).toLocaleDateString("en-GB")
                                    : "-"}
                            </td>
                            <td className="p-3">
                                <ActionDropdown
                                    items={
                                    worker.status === "Engaged"
                                        ? [
                                            {
                                            label: "Edit",
                                            icon: <PencilSquareIcon className="h-4 w-4" />,
                                            color: "text-yellow-400 hover:text-yellow-300",
                                            onClick: () =>
                                                navigate(`/workers/${worker.id}/edit`)
                                            },
                                            {
                                            label: "Attendance",
                                            icon: <CalendarDaysIcon className="h-4 w-4" />,
                                            color: "text-blue-400 hover:text-blue-300",
                                            onClick: () =>
                                                navigate(`/workers/${worker.id}/attendance`)
                                            }                                            
                                        ]
                                        : [
                                            {
                                            label: "Edit",
                                            icon: <PencilSquareIcon className="h-4 w-4" />,
                                            color: "text-yellow-400 hover:text-yellow-300",
                                            onClick: () =>
                                                navigate(`/workers/${worker.id}/edit`)
                                            },
                                            {
                                            label: "Delete",
                                            icon: <TrashIcon className="h-4 w-4" />,
                                            color: "text-red-400 hover:text-red-300",
                                            onClick: () =>
                                                onDelete(worker.id)
                                            }
                                        ]
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}
