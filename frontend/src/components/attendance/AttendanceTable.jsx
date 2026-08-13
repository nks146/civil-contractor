import AttendanceRow from "./AttendanceRow";

export default function AttendanceTable({
    attendanceRows,
    filteredRows,
    onAttendanceChange,
    onEdit,
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

            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">
                    Worker Attendance
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                    Mark attendance for each worker.
                </p>
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

                            <AttendanceRow
                                key={
                                    worker.worker_id ||
                                    worker.id
                                }
                                worker={worker}
                                index={index}
                                onAttendanceChange={
                                    onAttendanceChange
                                }
                                onEdit={onEdit}
                            />

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}