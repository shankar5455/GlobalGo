"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUserShield, FaChartLine, FaUsers, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"

const AdminHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true")
  const [username, setUsername] = useState(localStorage.getItem("username") || "Admin")
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    setUsername("")
    navigate("/")
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          {/* Logo Section */}
          <Link to="/admin" className="logo">
            GlobalGo <span style={{ color: "#ff4d4d" }}>Admin</span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <li>
              <Link to="/admin" className="nav-link">
                <FaChartLine style={{ marginRight: "5px" }} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="nav-link">
                <FaUsers style={{ marginRight: "5px" }} />
                Manage Users
              </Link>
            </li>
            <li>
              <Link to="/admin/deals" className="nav-link">
                <FaUserShield style={{ marginRight: "5px" }} />
                Manage Deals
              </Link>
            </li>
            <li>
              <Link to="/admin/reviews" className="nav-link">
                <FaChartLine style={{ marginRight: "5px" }} />
                Review Feedback
              </Link>
            </li>

            {/* Admin Logout and Profile */}
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/admin/profile" className="welcome-text">
                    Welcome, <strong>{username}</strong> 👑
                  </Link>
                </li>
                <li>
                  <button className="btn btn-outline" onClick={handleLogout}>
                    <FaSignOutAlt style={{ marginRight: "5px" }} />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/admin/login" className="btn btn-outline">
                  Admin Login
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="mobile-menu">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Links */}
          {menuOpen && (
            <div className="mobile-nav">
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/admin/users" onClick={() => setMenuOpen(false)}>
                Manage Users
              </Link>
              <Link to="/admin/deals" onClick={() => setMenuOpen(false)}>
                Manage Deals
              </Link>
              <Link to="/admin/reviews" onClick={() => setMenuOpen(false)}>
                Review Feedback
              </Link>

              {isLoggedIn ? (
                <>
                  <Link to="/admin/profile" onClick={() => setMenuOpen(false)}>
                    Welcome, {username} 👑
                  </Link>
                  <button onClick={handleLogout} className="btn btn-outline">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/admin/login" onClick={() => setMenuOpen(false)}>
                  Admin Login
                </Link>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default AdminHeader
