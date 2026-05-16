import { useEffect, useState } from "react";

export default function ManagerDashboard({ logout }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    setGoals(JSON.parse(localStorage.getItem("goals")) || []);
  }, []);

  const save = (data) => {
    setGoals(data);
    localStorage.setItem("goals", JSON.stringify(data));
  };

  const updateStatus = (id, status) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, status } : g
    );

    save(updated);
  };

  return (
    <div className="page">
      <div className="topbar">
        <h1>🧑‍💼 Manager Dashboard</h1>

        <button className="red-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="grid">
        {goals.map((g) => (
          <div className="card" key={g.id}>
            <h3>{g.title}</h3>

            <p>🎯 Target: {g.target}</p>
            <p>📊 Actual: {g.actual}</p>
            <p>📌 Status: {g.status}</p>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="green-btn"
                onClick={() =>
                  updateStatus(g.id, "Approved")
                }
              >
                Approve
              </button>

              <button
                className="orange-btn"
                onClick={() =>
                  updateStatus(g.id, "Rejected")
                }
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}