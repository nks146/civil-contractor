import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      // Redux
      dispatch(
        loginSuccess({
          user: res.data.user || res.data.userData,
          token: res.data.token,
        })
      );

      // Persistence
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user || res.data.userData));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Contractor Login</h2>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-700 bg-gray-700 text-white p-2 rounded mb-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-700 bg-gray-700 text-white p-2 rounded mb-6 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}
