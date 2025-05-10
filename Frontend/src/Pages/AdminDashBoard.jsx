import { Link } from "react-router-dom"
import { FaUsers, FaTags, FaClipboardList, FaChartBar, FaSignOutAlt } from "react-icons/fa"

const AdminDashboard = () => {
  const username = localStorage.getItem("username") || "Admin"

  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Welcome, {username}!</h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Manage and oversee the platform efficiently</p>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Platform Overview</h2>
            <p>Key statistics at a glance</p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-content">
                <FaUsers size={40} style={{ marginBottom: "10px", color: "#4CAF50" }} />
                <h3 className="card-title">Total Users</h3>
                <p className="card-text">4</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <FaChartBar size={40} style={{ marginBottom: "10px", color: "#E91E63" }} />
                <h3 className="card-title">Monthly Revenue</h3>
                <p className="card-text">₹12,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Controls Section */}
      <section className="section" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="container">
          <div className="section-title">
            <h2>Admin Controls</h2>
            <p>Manage content and user activity</p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Manage Users</h3>
                <p className="card-text">Add, update, or delete users</p>
                <Link to="/admin/users" className="btn btn-outline">
                  View Users
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Manage Deals</h3>
                <p className="card-text">Add or modify featured deals</p>
                <Link to="/admin/deals" className="btn btn-outline">
                  View Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
