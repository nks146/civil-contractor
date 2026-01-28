import Sidebar from "./includes/Sidebar";
import Navbar from "./includes/Navbar";
import StatCard from "./includes/StatCard";
import ProjectTable from "./ProjectTable";
import WorkerList from "./WorkerList";

export default function Dashboard() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <StatCard title="Total Projects" value="8" />
            <StatCard title="Running Projects" value="3" />
            <StatCard title="Workers" value="25" />
            <StatCard title="Total Expense" value="₹18L" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <ProjectTable />
            </div>
            <WorkerList />
          </div>

        </div>
      </div>
    </div>
  );
}
