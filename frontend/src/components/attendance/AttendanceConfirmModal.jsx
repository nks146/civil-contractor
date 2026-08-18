import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AttendanceConfirmModal({
  isOpen,
  projectName,
  attendanceDate,
  totalWorkers,
  loading = false,
  onClose,
  onConfirm,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) {
    return null;
  }

  const formattedDate = attendanceDate
    ? new Date(`${attendanceDate}T00:00:00`).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "-";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Save Attendance
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Please confirm before saving.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-white transition disabled:opacity-50"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-gray-300">
            Are you sure you want to save attendance for the following?
          </p>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex justify-between gap-4">
              <span className="text-sm text-gray-400">
                Project
              </span>

              <span className="text-sm font-medium text-white text-right">
                {projectName || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-sm text-gray-400">
                Date
              </span>

              <span className="text-sm font-medium text-white">
                {formattedDate}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-sm text-gray-400">
                Workers
              </span>

              <span className="text-sm font-medium text-white">
                {totalWorkers}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Once saved, attendance will be recorded for all workers.
          </p>
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
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Confirm & Save"}
          </button>
        </div>
      </div>
    </div>
  );
}