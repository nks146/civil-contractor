import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function EditAttendanceModal({
  worker,
  loading = false,
  onClose,
  onUpdate,
}) {
  const [attendanceType, setAttendanceType] = useState("Full Day");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!worker) return;

    setAttendanceType(worker.attendance_type || "Full Day");
    setComment(worker.comment || "");
  }, [worker]);

  if (!worker) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      attendanceId: worker.attendance_id,
      attendanceType,
      comment,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-xl shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Edit Attendance
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Update attendance for {worker.worker_name}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-white transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-5">

            {/* Worker Information */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Worker</p>
                  <p className="text-white font-medium">
                    {worker.worker_name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-400">Rate / Day</p>
                  <p className="text-white font-medium">
                    ₹
                    {Number(worker.rate_per_day || 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>

              {worker.expertise && (
                <div className="mt-3">
                  <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {worker.expertise}
                  </span>
                </div>
              )}
            </div>

            {/* Attendance Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Attendance
              </label>

              <div className="grid grid-cols-3 gap-3">

                {/* Full Day */}
                <label
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg border cursor-pointer transition ${
                    attendanceType === "Full Day"
                      ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendanceType"
                    value="Full Day"
                    checked={attendanceType === "Full Day"}
                    onChange={(e) => setAttendanceType(e.target.value)}
                    className="h-4 w-4 accent-green-500"
                  />

                  <span className="text-sm font-medium">
                    Full Day
                  </span>
                </label>

                {/* Half Day */}
                <label
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg border cursor-pointer transition ${
                    attendanceType === "Half Day"
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                      : "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendanceType"
                    value="Half Day"
                    checked={attendanceType === "Half Day"}
                    onChange={(e) => setAttendanceType(e.target.value)}
                    className="h-4 w-4 accent-yellow-500"
                  />

                  <span className="text-sm font-medium">
                    Half Day
                  </span>
                </label>

                {/* Absent */}
                <label
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg border cursor-pointer transition ${
                    attendanceType === "Absent"
                      ? "border-red-500 bg-red-500/10 text-red-400"
                      : "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendanceType"
                    value="Absent"
                    checked={attendanceType === "Absent"}
                    onChange={(e) => setAttendanceType(e.target.value)}
                    className="h-4 w-4 accent-red-500"
                  />

                  <span className="text-sm font-medium">
                    Absent
                  </span>
                </label>

              </div>
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="attendance-comment"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Comment
              </label>

              <textarea
                id="attendance-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Optional"
                rows={3}
                maxLength={255}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />

              <p className="text-xs text-gray-500 mt-1 text-right">
                {comment.length}/255
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Attendance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}