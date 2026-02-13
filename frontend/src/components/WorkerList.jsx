const workers = [
  { id: 1, name: "Ramesh", role: "Mason" },
  { id: 2, name: "Suresh", role: "Labour" },
];

export default function WorkerList() {
  return (
    <div className="bg-gray-800 rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4 text-white">Active Workers</h3>

      {workers.map(w => (
        <div
          key={w.id}
          className="flex justify-between border-b border-gray-700 py-2 last:border-none"
        >
          <span className="text-white">{w.name}</span>
          <span className="text-sm text-gray-400">{w.role}</span>
        </div>
      ))}
    </div>
  );
}
