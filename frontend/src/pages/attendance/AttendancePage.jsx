import { useEffect, useMemo, useState } from "react";
import AttendanceFilter from "../../components/attendance/AttendanceFilter";
import AttendanceSummary from "../../components/attendance/AttendanceSummary";
import AttendanceTable from "../../components/attendance/AttendanceTable";
//import AttendanceConfirmModal from "../../components/attendance/AttendanceConfirmModal";
import EditAttendanceModal from "../../components/attendance/EditAttendanceModal";
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

    const [editingWorker, setEditingWorker] = useState(null);
    const [updatingAttendance, setUpdatingAttendance] = useState(false);

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
    const handleSubmitAttendance = () => {
        setSubmitMode(
            attendanceStatus === "Saved"
                ? "update"
                : "save"
        );
        setShowConfirmModal(true);
    };

    // Confirm modal actions
    const handleConfirmSubmit = async () => {
        setShowConfirmModal(false);
        setLoading(true);
        try {
            if (submitMode === "save") {
                await saveAttendance({
                    projectId: selectedProject,
                    attendanceDate,
                    attendanceRows
                });
            }
            else if (submitMode === "update") {
                await updateAttendance({
                    projectId: selectedProject,
                    attendanceDate,
                    attendanceRows
                });
            }
            // reload the attendance data after saving/updating
            await loadAttendance();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleCancelSubmit = () => {
        setShowConfirmModal(false); 
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

            setAttendanceRows((previousRows) =>
            previousRows.map((worker) => {
                if (worker.id !== attendanceId) {
                return worker;
                }

                return {
                ...worker,
                attendance_type: attendanceType,
                comment,
                };
            })
            );

            setEditingWorker(null);
        } catch (error) {
            console.error("Failed to update attendance:", error);
        } finally {
            setUpdatingAttendance(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">
                    Attendance
                </h1>
                <p className="text-gray-400 mt-1">
                    Manage daily worker attendance
                </p>
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
            <AttendanceSummary summary={summary}/>
            <AttendanceTable
                attendanceRows={attendanceRows}
                filteredRows={filteredRows}
                onAttendanceChange={handleAttendanceChange}
                onEdit={handleEditAttendance}
            />
            {editingWorker && (
                <EditAttendanceModal
                    worker={editingWorker}
                    loading={updatingAttendance}
                    onClose={handleCloseEditModal}
                    onUpdate={handleUpdateAttendance}
                />
            )}
        </div>
    );
};