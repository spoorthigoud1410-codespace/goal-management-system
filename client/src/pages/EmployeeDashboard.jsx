import { useEffect, useState } from "react";

export default function EmployeeDashboard({ logout }) {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    setGoals(JSON.parse(localStorage.getItem("goals")) || []);
  }, []);

  const save = (data) => {
    setGoals(data);
    localStorage.setItem("goals", JSON.stringify(data));
  };

  const addGoal = () => {
    if (!title || !target) {
      alert("Enter all fields");
      return;
    }

    const newGoal = {
      id: Date.now(),
      title,
      target: Number(target),
      actual: 0,
      status: "Pending",
    };

    save([...goals, newGoal]);

    setTitle("");
    setTarget("");
  };

  const updateActual = (id, value) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, actual: Number(value) } : g
    );

    save(updated);
  };

  // ✅ DELETE FEATURE
  const deleteGoal = (id) => {
    const updated = goals.filter((g) => g.id !== id);
    save(updated);
  };

  const progress = (g) => {
    if (!g.target) return 0;
    return ((g.actual / g.target) * 100).toFixed(1);
  };

  return (
    <div className="page">
      <div className="topbar">
        <h1>👨‍💼 Employee Dashboard</h1>

        <button className="red-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
        <input
          placeholder="Goal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <button className="green-btn" onClick={addGoal}>
          Add Goal
        </button>
      </div>

      <div className="grid">
        {goals.map((g) => (
          <div className="card" key={g.id}>
            <h3>{g.title}</h3>

            <p>🎯 Target: {g.target}</p>
            <p>📊 Actual: {g.actual}</p>
            <p>🚀 Progress: {progress(g)}%</p>
            <p>📌 Status: {g.status}</p>

            <input
              placeholder="Update Actual"
              value={g.actual}
              onChange={(e) =>
                updateActual(g.id, e.target.value)
              }
            />

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                className="blue-btn"
                onClick={() =>
                  updateActual(g.id, g.actual + 1)
                }
              >
                + Progress
              </button>

              <button
                className="red-btn"
                onClick={() => deleteGoal(g.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}