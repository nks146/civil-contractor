const workers = [
  { id: 1, name: "Ramesh", role: "Mason" },
  { id: 2, name: "Suresh", role: "Labour" },
];

export default function WorkerList() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">Active Workers</h3>

      {workers.map(w => (
        <div
          key={w.id}
          className="flex justify-between border-b py-2 last:border-none"
        >
          <span>{w.name}</span>
          <span className="text-sm text-gray-500">{w.role}</span>
        </div>
      ))}
    </div>
  );
}
