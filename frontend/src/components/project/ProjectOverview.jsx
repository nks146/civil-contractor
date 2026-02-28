export default function ProjectOverview({ project }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-2xl font-bold text-white">
            {project.project_name}
          </h2>

          <p className="text-gray-400 mt-1">
            {project.location}
          </p>
        </div>

        <span className="px-3 py-1 rounded text-sm bg-green-900 text-green-300">
          {project.status || "Pending"}
        </span>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-sm">

        <div>
          <p className="text-gray-400">Start Date</p>
          <p className="text-gray-200">
            {project.start_date?.slice(0,10)}
          </p>
        </div>

        <div>
          <p className="text-gray-400">End Date</p>
          <p className="text-gray-200">
            {project.end_date?.slice(0,10) || "-"}
          </p>
        </div>

      </div>

    </div>
  );
}