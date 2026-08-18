import { useEffect, useMemo, useState } from "react";
import AttendanceFilter from "../../components/attendance/AttendanceFilter";
import AttendanceSummary from "../../components/attendance/AttendanceSummary";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceConfirmModal from "../../components/attendance/AttendanceConfirmModal";
import EditAttendanceModal from "../../components/attendance/EditAttendanceModal";
import AttendanceActions from "../../components/attendance/AttendanceActions";
// Services
import {
    getProjects,
    getAttendance,
    saveAttendance,
    updateAttendance
} from "../../services/attendanceService";

// Utils
import {
    calculateAttendanceSummary,
    calculateLabourCost
} from "../../utils/attendanceUtils";

export default function AttendancePage() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0]);
    const [searchText, setSearchText] = useState("");
    const [attendanceRows, setAttendanceRows] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState(null);  
    const [attendanceToUpdate, setAttendanceToUpdate] = useState(null); 
    const [summary, setSummary] = useState({
        totalWorkers: 0,
        fullDay: 0,
        halfDay: 0,
        absent: 0,
        labourCost: 0
    });

    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [submitMode, setSubmitMode] = useState("save");
    const [savingAttendance, setSavingAttendance] = useState(false);

    const [editingWorker, setEditingWorker] = useState(null);
    const [updatingAttendance, setUpdatingAttendance] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        loadProjects();
    }, []);
    
    const loadProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
        }
        catch (error) {
            console.error(error);
        }
    };

    const loadAttendance = async () => {
        if (!selectedProject) return;
        setLoading(true);
        try {
            const response = await getAttendance(selectedProject, attendanceDate);            
            setAttendanceRows(response.rows);
            setAttendanceStatus(response.status);
        }
        catch (error) {
            console.error(error);
        }

        finally {
            setLoading(false);
        }

    };

    const handleAttendanceChange = (
        workerId,
        attendanceType,
        comment = null
    ) => {
        setAttendanceRows((previousRows) =>
            previousRows.map((worker) => {
                if (worker.worker_id !== workerId) {
                    return worker;
                }
                return {
                    ...worker,
                    attendance_type: attendanceType,
                    ...(comment !== null && {
                        comment,
                    }),
                };
            })
        );
    };

    // for filtering the attendance rows based on search text

    const filteredRows = useMemo(() => {
        if (!searchText) return attendanceRows;
        return attendanceRows.filter(worker => {
            const keyword = searchText.toLowerCase();
            return (
                worker.worker_name.toLowerCase().includes(keyword)
                ||
                worker.expertise.toLowerCase().includes(keyword)
            );
        });

    }, [attendanceRows, searchText]);

    // Summary Cards calculation
    useEffect(() => {
        const attendanceSummary = calculateAttendanceSummary(attendanceRows);
        attendanceSummary.labourCost = calculateLabourCost(attendanceRows);
        setSummary(attendanceSummary);
    }, [attendanceRows]);

    // save attendance
    const handleSaveAttendance = () => {
        if (!selectedProject) {
            return;
        }

        if (!attendanceRows.length) {
            return;
        }

        setSubmitMode("save");
        setShowConfirmModal(true);
    };

    const handleConfirmSaveAttendance = async () => {
        try {
            setSavingAttendance(true);

            const formattedAttendanceData = attendanceRows.map((item) => ({
                workerId: item.worker_id,
                ratePerDay: item.rate_per_day,
                attendanceType: item.attendance_type,
                comment: item.comment,
            }));

            await saveAttendance({
            projectId: selectedProject,
            workingDate: attendanceDate,
            attendanceData: formattedAttendanceData,
            });

            // Close confirmation modal
            setShowConfirmModal(false);
            // Show success message
            setSuccessMessage("Attendance submitted successfully.");
            // Reload from database
            await loadAttendance();
        } catch (error) {
            console.error("Failed to save attendance:", error);
        } finally {
            setSavingAttendance(false);
        }
    };
    

    const handleEditAttendance = (worker) => {
        setEditingWorker(worker);
    };

    const handleCloseEditModal = () => {
        if (updatingAttendance) return;
        setEditingWorker(null);
    };

    const handleUpdateAttendance = async ({
        attendanceId,
        attendanceType,
        comment,
        }) => {
        try {
            setUpdatingAttendance(true);

            await updateAttendance(attendanceId, {
            attendanceType: attendanceType,
            comment,
            });   

            setSuccessMessage("Attendance updated successfully.");
            await loadAttendance();
            setEditingWorker(null);

        } catch (error) {
            console.error("Failed to update attendance:", error);
        } finally {
            setUpdatingAttendance(false);
        }
    };

    useEffect(() => {
        if (!successMessage) return;
        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 4000);
        return () => clearTimeout(timer);
    }, [successMessage]);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">
                    Worker Attendance
                </h1>
            </div>
            <AttendanceFilter
                projects={projects}
                selectedProject={selectedProject}
                attendanceDate={attendanceDate}
                searchText={searchText}
                loading={loading}
                onProjectChange={setSelectedProject}
                onDateChange={setAttendanceDate}
                onSearchChange={setSearchText}
                onLoadAttendance={loadAttendance}
            />

            {successMessage && (
                <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                    ✓ {successMessage}
                </div>
            )}

            <AttendanceSummary summary={summary}/>
            <AttendanceTable
                attendanceRows={attendanceRows}
                filteredRows={filteredRows}
                onAttendanceChange={handleAttendanceChange}
                onEdit={handleEditAttendance}
            />
            <AttendanceActions
                loading={loading}
                savingAttendance={savingAttendance}
                selectedProject={selectedProject}
                attendanceRows={attendanceRows}
                attendanceStatus={attendanceStatus}
                onSave={handleSaveAttendance}
            />            
            {editingWorker && (
                <EditAttendanceModal
                    worker={editingWorker}
                    loading={updatingAttendance}
                    onClose={handleCloseEditModal}
                    onUpdate={handleUpdateAttendance}
                />
            )}
            <AttendanceConfirmModal
                isOpen={showConfirmModal}
                projectName={
                    projects.find(
                    (project) => project.id === Number(selectedProject)
                    )?.project_name
                }
                attendanceDate={attendanceDate}
                totalWorkers={attendanceRows.length}
                loading={savingAttendance}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmSaveAttendance}
            />
        </div>
    );
};