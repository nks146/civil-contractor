import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AttendanceFilter({
    projects,
    selectedProject,
    attendanceDate,
    searchText,
    loading,
    onProjectChange,
    onDateChange,
    onSearchChange,
    onLoadAttendance,
}) {
    // Today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedProject || !attendanceDate) {
            return;
        }
        onLoadAttendance();
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-end"
            >
                {/* Project */}
                <div>
                    <label
                        htmlFor="project"
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Project <span className="text-red-400">*</span>
                    </label>
                    <select
                        id="project"
                        value={selectedProject || ""}
                        onChange={(e) => onProjectChange(e.target.value)}
                        className="
                            w-full
                            bg-gray-900
                            border border-gray-700
                            text-gray-200
                            rounded-lg
                            px-4 py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            transition
                        "
                    >
                        <option value="">
                            Select Project
                        </option>

                        {projects.map((project) => (
                            <option
                                key={project.id}
                                value={project.id}
                            >
                                {project.project_name}
                                {project.location
                                    ? ` - ${project.location}`
                                    : ""}
                            </option>
                        ))}
                    </select>
                </div>


                {/* Attendance Date */}
                <div>
                    <label
                        htmlFor="attendanceDate"
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Attendance Date{" "}
                        <span className="text-red-400">*</span>
                    </label>

                    <input
                        type="date"
                        id="attendanceDate"
                        value={attendanceDate}
                        max={today}
                        onChange={(e) => onDateChange(e.target.value)}
                        className="
                            w-full
                            bg-gray-900
                            border border-gray-700
                            text-gray-200
                            rounded-lg
                            px-4 py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            transition
                        "
                    />
                </div>


                {/* Search Worker */}
                <div>
                    <label
                        htmlFor="searchWorker"
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Search Worker
                    </label>

                    <div className="relative">

                        <MagnifyingGlassIcon
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
                        />

                        <input
                            type="text"
                            id="searchWorker"
                            value={searchText}
                            onChange={(e) =>
                                onSearchChange(e.target.value)
                            }
                            placeholder="Worker name or expertise..."
                            className="
                                w-full
                                bg-gray-900
                                border border-gray-700
                                text-gray-200
                                placeholder-gray-500
                                rounded-lg
                                pl-10 pr-4 py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                                focus:border-indigo-500
                                transition
                            "
                        />

                    </div>
                </div>


                {/* Load Attendance Button */}
                <div>
                    <button
                        type="submit"
                        disabled={
                            !selectedProject ||
                            !attendanceDate ||
                            loading
                        }
                        className="
                            w-full
                            bg-indigo-600
                            hover:bg-indigo-500
                            disabled:bg-gray-700
                            disabled:text-gray-500
                            disabled:cursor-not-allowed
                            text-white
                            font-medium
                            rounded-lg
                            px-5 py-3
                            transition
                            duration-200
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            focus:ring-offset-2
                            focus:ring-offset-gray-800
                        "
                    >
                        {loading ? "Loading..." : "Load Attendance"}
                    </button>
                </div>
            </form>
        </div>
    );
}