export default function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow">
      <p className="text-gray-300 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
