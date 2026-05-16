import { useState } from "react";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");

  const login = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const user = { email, role };

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h1 className="login-title">🚀 Performance Portal</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Employee</option>
          <option>Manager</option>
          <option>Admin</option>
        </select>

        <button className="green-btn" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}