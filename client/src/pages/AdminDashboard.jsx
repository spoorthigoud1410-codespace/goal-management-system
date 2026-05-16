export default function AdminDashboard({ logout }) {
  const goals =
    JSON.parse(localStorage.getItem("goals")) || [];

  const total = goals.length;

  const approved = goals.filter(
    (g) => g.status === "Approved"
  ).length;

  const pending = total - approved;

  return (
    <div className="page">
      <div className="topbar">
        <h1>📊 Admin Dashboard</h1>

        <button className="red-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Total Goals</h2>
          <h1>{total}</h1>
        </div>

        <div className="card">
          <h2>Approved</h2>
          <h1>{approved}</h1>
        </div>

        <div className="card">
          <h2>Pending</h2>
          <h1>{pending}</h1>
        </div>
      </div>
    </div>
  );
}