"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true")
  const [username, setUsername] = useState(localStorage.getItem("username") || "User")
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true") // ✅ Correctly parsing as boolean
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true" // ✅ Parse correctly
    setUsername(storedUsername || "User")
    setIsAdmin(storedIsAdmin)
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    setUsername("")
    setIsAdmin(false)
    navigate("/")
    window.location.reload()
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            GlobalGo
          </Link>

          <ul className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            {isLoggedIn ? (
              <>
                {/* ✅ Admin Header */}
                {isAdmin ? (
                  <>
                    <li>
                      <Link to="/admin-dashboard">Admin Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/manage-users">Manage Users</Link>
                    </li>
                    <li>
                      <Link to="/reports">Reports</Link>
                    </li>
                    <li>
                      <Link to="/profile" className="welcome-text">
                        Welcome, <strong>{username}</strong> 👑
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {/* ✅ User Header */}
                    <li>
                      <Link to="/flights">Flights</Link>
                    </li>
                    <li>
                      <Link to="/hotels">Hotels</Link>
                    </li>
                    <li>
                      <Link to="/cabs">Cabs</Link>
                    </li>
                    <li>
                      <Link to="/restaurants">Restaurants</Link>
                    </li>
                    <li>
                      <Link to="/history">My Bookings</Link>
                    </li>
                    <li>
                      <Link to="/profile" className="welcome-text">
                        Welcome, <strong>{username}</strong> 👋
                      </Link>
                    </li>

                  </>
                )}
                <li>
                  <button className="btn btn-outline" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Login/Register Options */}
                <li>
                  <Link to="/flights">Flights</Link>
                </li>
                <li>
                  <Link to="/hotels">Hotels</Link>
                </li>
                <li>
                  <Link to="/cabs">Cabs</Link>
                </li>
                <li>
                  <Link to="/restaurants">Restaurants</Link>
                </li>
                <li>
                  <Link to="/login" className="btn btn-outline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="btn btn-primary">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu */}
          <div className="mobile-menu">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <i className={`fas fa-${menuOpen ? "times" : "bars"}`}></i>
            </button>
          </div>

          {menuOpen && (
            <div className="mobile-nav">
              {isLoggedIn ? (
                <>
                  {isAdmin ? (
                    <>
                      <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                      <Link to="/manage-users" onClick={() => setMenuOpen(false)}>
                        Manage Users
                      </Link>
                      <Link to="/reports" onClick={() => setMenuOpen(false)}>
                        Reports
                      </Link>
                      <Link to="/profile" onClick={() => setMenuOpen(false)}>
                        Welcome, {username} 👑
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/flights" onClick={() => setMenuOpen(false)}>
                        Flights
                      </Link>
                      <Link to="/hotels" onClick={() => setMenuOpen(false)}>
                        Hotels
                      </Link>
                      <Link to="/cabs" onClick={() => setMenuOpen(false)}>
                        Cabs
                      </Link>
                      <Link to="/restaurants" onClick={() => setMenuOpen(false)}>
                        Restaurants
                      </Link>
                      <Link to="/history" onClick={() => setMenuOpen(false)}>
                        My Bookings
                      </Link>
                      <Link to="/profile" onClick={() => setMenuOpen(false)}>
                        Welcome, {username} 👋
                      </Link>
                    </>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
