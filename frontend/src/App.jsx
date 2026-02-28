import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./store/slices/authSlice";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Projects from "./pages/project/Projects";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProject from "./pages/project/AddProject";
import EditProject from "./pages/project/EditProject";
import ProjectDetails from "./pages/project/ProjectDetails";

export default function App() {
   const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(
        loginSuccess({
          token,
          user: JSON.parse(user),
        })
      );
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
}
