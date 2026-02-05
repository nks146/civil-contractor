import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Projects from "./pages/project/Projects";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProject from "./pages/project/AddProject";
import EditProject from "./pages/project/EditProject";

export default function App() {
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
      </Route>
    </Routes>
  );
}
