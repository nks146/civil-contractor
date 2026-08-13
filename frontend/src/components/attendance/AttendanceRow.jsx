export default function AttendanceRow({
    worker,
    index,
    onAttendanceChange,
    onEdit,
}) {
    const workerId = worker.worker_id || worker.id;
    const handleAttendanceChange = (attendanceType) => {
        onAttendanceChange(
            workerId,
            attendanceType
        );
    };

    const handleCommentChange = (e) => {
        onAttendanceChange(
            workerId,
            worker.attendance_type,
            e.target.value
        );
    };

    return (
        <tr className=" border-t border-gray-700 hover:bg-gray-750 transition">
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

            {/* Rate Per Day */}
            <td className="px-4 py-4 text-gray-300 whitespace-nowrap">
                ₹{Number(worker.rate_per_day || 0).toLocaleString("en-IN")}
            </td>

            {/* Full Day */}
            <td className="px-4 py-4 text-center">
                <input
                    type="radio"
                    name={`attendance-${workerId}`}
                    value="Full Day"
                    checked={
                        worker.attendance_type === "Full Day"
                    }
                    onChange={() =>
                        handleAttendanceChange("Full Day")
                    }
                    className="h-4 w-4 accent-indigo-500 cursor-pointer" 
                />
            </td>

            {/* Half Day */}
            <td className="px-4 py-4 text-center">
                <input
                    type="radio"
                    name={`attendance-${workerId}`}
                    value="Half Day"
                    checked={
                        worker.attendance_type === "Half Day"
                    }
                    onChange={() =>
                        handleAttendanceChange("Half Day")
                    }
                    className="h-4 w-4 accent-indigo-500 cursor-pointer"
                />
            </td>

            {/* Absent */}
            <td className="px-4 py-4 text-center">
                <input
                    type="radio"
                    name={`attendance-${workerId}`}
                    value="Absent"
                    checked={
                        worker.attendance_type === "Absent"
                    }
                    onChange={() =>
                        handleAttendanceChange("Absent")
                    }
                    className="h-4 w-4 accent-indigo-500 cursor-pointer"
                />
            </td>

            {/* Comment */}
            <td className="px-4 py-4">
                <input
                    type="text"
                    value={worker.comment || ""}
                    onChange={handleCommentChange}
                    placeholder="Optional"
                    className="
                        w-full
                        min-w-[180px]
                        bg-gray-900
                        border
                        border-gray-700
                        rounded-lg
                        px-3
                        py-2
                        text-gray-200
                        placeholder-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                        focus:border-indigo-500
                    "
                />
            </td>

            {/* Action */}
            <td className="px-4 py-4 text-center">
                 {worker.attendance_id !== "" && worker.attendance_id != null && (
                    <button
                    type="button"
                    onClick={() => onEdit(worker)}
                    className="text-yellow-400 hover:text-yellow-300 font-medium transition"
                    >
                    Edit
                    </button>
                )}
            </td>

        </tr>
    );
}