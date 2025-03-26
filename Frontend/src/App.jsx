import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./style.css"

import Header from "./Componets/Header"
import Footer from "./Componets/Footer"

import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"



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

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

