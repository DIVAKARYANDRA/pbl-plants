import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { inputClass } from "./components/AdminUI";

export default function AdminLogin() {
  const { isAuthenticated, login, error } = useAuth();
  const { settings } = useSiteData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await login(email, password)) {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-forest-800 flex items-center justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 leaf-divider opacity-10" />
      <div className="relative w-full max-w-md bg-cream-50 rounded-xl3 shadow-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <span className="font-display text-2xl text-forest-800">{settings.logoText}</span>
          <p className="eyebrow mt-2">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-forest-800">Email</span>
            <input
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoFocus
              required
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-forest-800">Password</span>
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <p className="text-sm text-red-500 -mt-1">{error}</p>}

          <button type="submit" className="btn-primary w-full mt-2">
            Log In
          </button>
        </form>

       
      </div>
    </div>
  );
}
