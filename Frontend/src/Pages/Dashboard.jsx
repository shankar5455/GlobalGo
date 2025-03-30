import { Link } from "react-router-dom"
import SearchBar from "../Componets/SearchBar"

const Dashboard = () => {
  const username = localStorage.getItem("username") || "User"

  return (
    
    <div className="dashboard-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1519608487953-e999c86e7455)",
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
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Welcome Back, {username}!
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Track and manage your bookings effortlessly.
          </p>
          {/* Search Bar */}
          <div className="search-container">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Quick Stats</h2>
            <p>Get an overview of your activity</p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Total Bookings</h3>
                <p className="card-text">120</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Upcoming Trips</h3>
                <p className="card-text">5</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manage Bookings Section */}
      <section className="section" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="container">
          <div className="section-title">
            <h2>Manage Your Bookings</h2>
            <p>Track and manage your trips and services</p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">View Bookings</h3>
                <p className="card-text">Check your past and upcoming trips</p>
                <Link to="/my-bookings" className="btn btn-outline">
                  View Bookings
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Explore More Services</h3>
                <p className="card-text">Book flights, hotels, and more</p>
                <Link to="/" className="btn btn-outline">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Your Recent Reviews</h2>
            <p>See feedback from your trips</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}>
            <div className="card">
              <div className="card-content">
                <div className="stars">★★★★★</div>
                <p className="card-text">
                  "Had a wonderful stay in Bali. Everything was seamless!"
                </p>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>- John Doe</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="stars">★★★★☆</div>
                <p className="card-text">
                  "Flight was good but had some delays. Overall a decent experience."
                </p>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>- Alex Smith</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logout Section */}
      <section className="section text-center" style={{ backgroundColor: "#ff4d4d", color: "#fff" }}>
        <div className="container">
          <h2>Ready to Logout?</h2>
          <p style={{ maxWidth: "600px", margin: "20px auto" }}>
            Make sure to save any changes before you go.
          </p>
          <button
            className="btn btn-outline"
            onClick={() => {
              localStorage.clear()
              window.location.href = "/login"
            }}
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
