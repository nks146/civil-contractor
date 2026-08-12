/**
 * Calculate attendance summary
 *
 * @param {Array} attendanceRows
 * @returns {Object}
 */
export const calculateAttendanceSummary = (attendanceRows = []) => {
    const summary = {
        totalWorkers: attendanceRows.length,
        fullDay: 0,
        halfDay: 0,
        absent: 0,
    };

    attendanceRows.forEach((worker) => {
        switch (worker.attendance_type) {
            case "Full Day":
                summary.fullDay++;
                break;

            case "Half Day":
                summary.halfDay++;
                break;

            case "Absent":
                summary.absent++;
                break;

            default:
                break;
        }
    });
    return summary;
};


/**
 * Calculate total labour cost
 *
 * Full Day  = 100% of rate
 * Half Day  = 50% of rate
 * Absent    = 0
 *
 * @param {Array} attendanceRows
 * @returns {number}
 */
export const calculateLabourCost = (attendanceRows = []) => {
    return attendanceRows.reduce((total, worker) => {
        const rate = Number(worker.rate_per_day) || 0;

        switch (worker.attendance_type) {
            case "Full Day":
                return total + rate;

            case "Half Day":
                return total + rate * 0.5;

            case "Absent":
                return total;

            default:
                return total;
        }
    }, 0);
};