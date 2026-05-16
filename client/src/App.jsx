import { useEffect, useState } from "react";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) return <Login setUser={setUser} />;

  if (user.role === "Employee")
    return <EmployeeDashboard logout={logout} />;

  if (user.role === "Manager")
    return <ManagerDashboard logout={logout} />;

  if (user.role === "Admin")
    return <AdminDashboard logout={logout} />;

  return null;
}