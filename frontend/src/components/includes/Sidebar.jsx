export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-8">Contractor Panel</h2>

      <ul className="space-y-4">
        <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-400 cursor-pointer">Projects</li>
        <li className="hover:text-blue-400 cursor-pointer">Workers</li>
        <li className="hover:text-blue-400 cursor-pointer">Expenses</li>
        <li className="hover:text-blue-400 cursor-pointer">Reports</li>
      </ul>
    </div>
  );
}
