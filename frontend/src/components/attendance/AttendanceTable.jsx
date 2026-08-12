export default function AttendanceTable({
    attendanceRows,
    filteredRows,
    onAttendanceChange,
}) {
    const rows = filteredRows ?? attendanceRows ?? [];
    if (rows.length === 0) {
        return (
            <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
                <p className="text-gray-400">
                    No attendance data available.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="px-5 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">
                    Worker Attendance
                </h2>
                {/*<p className="text-sm text-gray-400 mt-1">
                    Mark attendance for each worker.
                </p>*/}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-900 text-gray-300 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 text-center">
                                Sr. No.
                            </th>
                            <th className="px-4 py-3">
                                Worker Name
                            </th>
                            <th className="px-4 py-3">
                                Expertise
                            </th>
                            <th className="px-4 py-3">
                                Rate / Day
                            </th>
                            <th className="px-4 py-3 text-center">
                                Full Day
                            </th>
                            <th className="px-4 py-3 text-center">
                                Half Day
                            </th>
                            <th className="px-4 py-3 text-center">
                                Absent
                            </th>
                            <th className="px-4 py-3">
                                Comment
                            </th>
                            <th className="px-4 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {rows.map((worker, index) => (
                            <tr
                                key={worker.id || worker.worker_id}
                                className="hover:bg-gray-750 transition"
                            >
                                {/* Serial Number */}
                                <td className="px-4 py-4 text-center text-gray-400">
                                    {index + 1}
                                </td>

                                {/* Worker Name */}
                                <td className="px-4 py-4">
                                    <div className="font-medium text-white">
                                        {worker.worker_name}
                                    </div>
                                </td>

                                {/* Expertise */}
                                <td className="px-4 py-4 text-gray-300">
                                    {worker.expertise || "-"}
                                </td>

                                {/* Rate */}
                                <td className="px-4 py-4 text-gray-300">
                                    ₹{worker.rate_per_day}
                                </td>

                                {/* Full Day */}
                                <td className="px-4 py-4 text-center">
                                    <input
                                        type="radio"
                                        name={`attendance-${worker.worker_id}`}
                                        checked={
                                            worker.attendance_type ===
                                            "Full Day"
                                        }
                                        onChange={() =>
                                            onAttendanceChange(
                                                worker.worker_id,
                                                "Full Day"
                                            )
                                        }
                                        className="h-4 w-4 accent-indigo-500 cursor-pointer"
                                    />
                                </td>

                                {/* Half Day */}
                                <td className="px-4 py-4 text-center">
                                    <input
                                        type="radio"
                                        name={`attendance-${worker.worker_id}`}
                                        checked={
                                            worker.attendance_type ===
                                            "Half Day"
                                        }
                                        onChange={() =>
                                            onAttendanceChange(
                                                worker.worker_id,
                                                "Half Day"
                                            )
                                        }
                                        className="h-4 w-4 accent-indigo-500 cursor-pointer"
                                    />
                                </td>

                                {/* Absent */}
                                <td className="px-4 py-4 text-center">
                                    <input
                                        type="radio"
                                        name={`attendance-${worker.worker_id}`}
                                        checked={
                                            worker.attendance_type ===
                                            "Absent"
                                        }
                                        onChange={() =>
                                            onAttendanceChange(
                                                worker.worker_id,
                                                "Absent"
                                            )
                                        }
                                        className="h-4 w-4 accent-indigo-500 cursor-pointer"
                                    />
                                </td>

                                {/* Comment */}
                                <td className="px-4 py-4">
                                    <input
                                        type="text"
                                        value={worker.comment || ""}
                                        onChange={(e) =>
                                            onAttendanceChange(
                                                worker.worker_id,
                                                worker.attendance_type,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Optional"
                                        className="
                                            w-full
                                            min-w-[180px]
                                            bg-gray-900
                                            border border-gray-700
                                            rounded-lg
                                            px-3 py-2
                                            text-gray-200
                                            placeholder-gray-500
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-indigo-500
                                        "
                                    />
                                </td>

                                {/* Action */}
                                <td className="px-4 py-4 text-center">
                                    <button
                                        type="button"
                                        className="
                                            text-yellow-400
                                            hover:text-yellow-300
                                            font-medium
                                            transition
                                        "
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}