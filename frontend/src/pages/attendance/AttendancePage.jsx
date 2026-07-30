import { useEffect, useMemo, useState } from "react";
import AttendanceFilter from "../../components/attendance/AttendanceFilter";
import AttendanceSummary from "../../components/attendance/AttendanceSummary";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceConfirmModal from "../../components/attendance/AttendanceConfirmModal";
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
    const [attendanceData, setAttendanceData] = useState(new Date().toISOString().split("T")[0]);
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
            const response = await getAttendance({
                projectId: selectedProject,
                attendanceDate
            });
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
};