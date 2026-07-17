import { useEffect, useState } from "react";

export default function AssignProjectModal({
    isOpen,
    onClose,
    worker,
    projects,
    onAssign,
}) {
    const [formData, setFormData] = useState({
        project_id: "",
        rate_per_day: "",
        work_start_date: "",
    });

    useEffect(() => {
        if (worker) {
            setFormData({
                project_id: "",
                rate_per_day: worker.base_rate,
                work_start_date: new Date().toISOString().split("T")[0],
            });
        }
    }, [worker]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onAssign({
            worker_id: worker.id,
            ...formData,
        });
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl border border-gray-700">
                {/* Header */}
                <div className="border-b border-gray-700 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">
                        📌 Assign Worker To Project
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Worker Information */}
                    <div className="px-6 py-5">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Worker Information
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                            <InfoField label="Worker Name" value={worker.worker_name} />
                            <InfoField label="Mobile" value={worker.contact} />
                            <InfoField label="Address" value={worker.address} />
                            <InfoField label="Expertise" value={worker.expertise} />
                            <InfoField label="Default Rate" value={`₹${worker.base_rate} / Day`} />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-700"></div>
                    {/* Assignment */}
                    <div className="px-6 py-5">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Assignment Details
                        </h3>
                        {/* Project */}

                        <div className="mb-5">
                            <label className="block text-gray-300 mb-2">
                                Project <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="project_id"
                                value={formData.project_id}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                            >
                                <option value=""> Select Project </option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>
                                        {project.project_name} | {project.location} | {new Date(project.start_date).toLocaleDateString("en-GB")}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Rate + Date */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">
                                    Rate Per Day
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="rate_per_day"
                                    value={formData.rate_per_day}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">
                                    Work Start Date
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="work_start_date"
                                    value={formData.work_start_date}
                                    onChange={handleChange}
                                    required
                                    style={{ colorScheme: "dark" }}
                                    className="w-full bg-gray-900 border border-indigo-400/70 rounded-lg px-4 py-3 text-white shadow-sm shadow-indigo-500/20 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-700 px-6 py-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                        >
                            Assign Worker
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function InfoField({ label, value }) {
    return (
        <div>
            <p className="text-sm text-gray-400"> {label} </p>
            <p className="mt-1 text-white font-medium"> {value} </p> 
        </div>
    );
}
