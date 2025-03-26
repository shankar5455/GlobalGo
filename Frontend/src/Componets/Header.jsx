"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true")
  const [username, setUsername] = useState(localStorage.getItem("username") || "")
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
          <Link to="/" className="logo">
            GlobalGo
          </Link>

          <ul className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
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

            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/history">My Bookings</Link>
                </li>
                <li>
                  <Link to="/profile" className="welcome-text">
                    Welcome, <strong>{username}</strong> 👋
                  </Link>
                </li>
                <li>
                  <button className="btn btn-outline" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
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

              {isLoggedIn ? (
                <>
                  <Link to="/history" onClick={() => setMenuOpen(false)}>
                    My Bookings
                  </Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    Welcome, {username} 👋
                  </Link>
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
