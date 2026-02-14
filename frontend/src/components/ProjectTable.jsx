const projects = [
  { id: 1, name: "House Construction", status: "Running", budget: "₹12L" },
  { id: 2, name: "Shop Renovation", status: "Completed", budget: "₹4L" },
];

export default function ProjectTable() {
  return (
    <div className="bg-gray-800 rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4 text-white">Recent Projects</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400">
            <th>Project</th>
            <th>Status</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id} className="border-t border-gray-700">
              <td className="py-3 text-white">{p.name}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    p.status === "Running" ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="text-gray-300">{p.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
