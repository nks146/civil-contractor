export default function AttendanceActions({
  loading,
  savingAttendance,
  selectedProject,
  attendanceRows,
  attendanceStatus,
  onSave,
}) {
  const isDisabled =
    loading ||
    savingAttendance ||
    !selectedProject ||
    attendanceRows.length === 0;

     if (attendanceStatus === "Saved") {
      return (
        <div className="mt-6 flex justify-end">
          <div className="text-sm text-green-400">
            ✓ Attendance already submitted for this date.
          </div>
        </div>
      );
    }

  return (
    <div className="mt-6 flex justify-end">
      <button
        type="button"
        onClick={onSave}
        disabled={isDisabled}
        className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {savingAttendance ? "Saving..." : "Save Attendance"}
      </button>
    </div>
  );
}