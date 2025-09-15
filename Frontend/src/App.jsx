import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./style.css"

import Header from "./Componets/Header"
import Footer from "./Componets/Footer"

import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Dashboard from "./Pages/Dashboard"
import AdminDashboard from "./Pages/AdminDashBoard"
import Flights from "./Pages/Flights"
import Hotels from "./Pages/Hotels"
import Cabs from "./Pages/Cabs"
import Restaurant from "./Pages/Restaurant"
import ProtectedRoute from "./Componets/ProtectedRoute"
import Profile from "./Pages/Profile"
import ManageUser from "./Pages/ManageUsers"
import Payment from "./Pages/Payment"
import MyBookings from "./Pages/MyBookings"


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/restaurants" element={<Restaurant />} />
            <Route path="/cabs" element={<Cabs />} />
            <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
            <Route path="/manageusers" element={<ProtectedRoute> <ManageUser /> </ProtectedRoute>} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/history" element={<MyBookings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App