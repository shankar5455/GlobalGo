"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const type = queryParams.get("type")
  const itemId = queryParams.get("id")

  const [paymentStep, setPaymentStep] = useState(1)
  const [itemDetails, setItemDetails] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  })
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login")
      return
    }

    let url = ""
    if (type === "flight") url = `http://localhost:8080/api/flights/${itemId}`
    else if (type === "hotel") url = `http://localhost:8080/api/hotels/${itemId}`
    else if (type === "cab") url = `http://localhost:8080/api/cabs/${itemId}`
    else {
      navigate("/")
      return
    }

    setLoading(true)
    axios.get(url)
      .then((res) => {
        setItemDetails({ ...res.data, type })
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch data", err)
        navigate("/")
      })
  }, [type, itemId, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setPaymentDetails({
      ...paymentDetails,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const validatePaymentDetails = () => {
    const newErrors = {}

    if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }

    if (!paymentDetails.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required"
    }

    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format"
    }

    if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (paymentStep === 1) {
      setPaymentStep(2)
    } else {
      const validationErrors = validatePaymentDetails()

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      setLoading(true)
      // Simulate payment processing with backend
      axios.post(`http://localhost:8080/api/payments`, {
        itemId,
        type,
        paymentMethod,
        paymentDetails,
        amount: getTotalPrice()
      })
      .then(() => {
        const bookingId = Math.floor(Math.random() * 10000)
        navigate(`/confirmation?bookingId=${bookingId}&type=${type}`)
      })
      .catch((err) => {
        console.error("Payment failed", err)
        setLoading(false)
      })
    }
  }

  const getTotalPrice = () => {
    if (!itemDetails) return 0

    if (type === "flight") {
      return itemDetails.price
    } else if (type === "hotel") {
      // Assume 3 nights stay
      return itemDetails.price * 3
    } else if (type === "cab") {
      // Assume 3 hours usage
      return itemDetails.price * 3
    }

    return 0
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="container text-center">
          <p>Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (!itemDetails) {
    return (
      <div className="page-container">
        <div className="container text-center">
          <p>Item not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Complete Your Booking</h1>
          <p>You're just a few steps away from confirming your booking</p>
        </div>

        <div className="flex" style={{ gap: "30px", alignItems: "flex-start" }}>
          {/* Booking Details */}
          <div className="card" style={{ flex: "1" }}>
            <div className="card-content">
              <h3 className="card-title">Booking Summary</h3>

              {type === "flight" && (
                <div>
                  <div className="my-2">
                    <strong>Flight:</strong> {itemDetails.airline} - {itemDetails.flightNumber}
                  </div>
                  <div className="my-2">
                    <div>
                      <strong>From:</strong> {itemDetails.departureCity}
                    </div>
                    <div>
                      <strong>To:</strong> {itemDetails.arrivalCity}
                    </div>
                  </div>
                  <div className="my-2">
                    <div>
                      <strong>Departure:</strong> {itemDetails.departureTime}
                    </div>
                    <div>
                      <strong>Arrival:</strong> {itemDetails.arrivalTime}
                    </div>
                  </div>
                  <div className="my-2">
                    <div>
                      <strong>Duration:</strong> {itemDetails.duration}
                    </div>
                    <div>
                      <strong>Class:</strong> {itemDetails.class || "Economy"}
                    </div>
                  </div>
                </div>
              )}

              {type === "hotel" && (
                <div>
                  <div className="my-2">
                    <strong>Hotel:</strong> {itemDetails.name}
                  </div>
                  <div className="my-2">
                    <div>
                      <strong>Location:</strong> {itemDetails.location}
                    </div>
                    <div>
                      <strong>Address:</strong> {itemDetails.address}
                    </div>
                  </div>
                  <div className="my-2">
                    <div>
                      <strong>Check-in:</strong> [Selected Date] at 3:00 PM
                    </div>
                    <div>
                      <strong>Check-out:</strong> [Selected Date + 3 days] at 11:00 AM
                    </div>
                  </div>
                  <div className="my-2">
                    <div>
                      <strong>Amenities:</strong> {itemDetails.amenities?.join(", ")}
                    </div>
                  </div>
                </div>
              )}

              {type === "cab" && (
                <div>
                  <div className="my-2">
                    <strong>Cab:</strong> {itemDetails.name} ({itemDetails.type})
                  </div>
                  <div className="my-2">
                    <div>
                      <strong>Pickup:</strong> [Selected Location] at [Selected Time]
                    </div>
                    <div>
                      <strong>Duration:</strong> 3 hours
                    </div>
                  </div>
                  <div className="my-2">
                    <div>
                      <strong>Capacity:</strong> {itemDetails.capacity} passengers
                    </div>
                    <div>
                      <strong>Features:</strong> {itemDetails.features?.join(", ")}
                    </div>
                  </div>
                </div>
              )}

              <div className="my-2" style={{ borderTop: "1px solid #ddd", paddingTop: "15px" }}>
                <div className="flex justify-between">
                  <strong>Base Price:</strong>
                  <span>
                    ₹
                    {type === "hotel"
                      ? itemDetails.price + " x 3 nights"
                      : type === "cab"
                        ? itemDetails.price + " x 3 hours"
                        : itemDetails.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Taxes & Fees:</strong>
                  <span>₹{Math.round(getTotalPrice() * 0.1)}</span>
                </div>
                <div
                  className="flex justify-between"
                  style={{ marginTop: "10px", fontWeight: "bold", fontSize: "1.2rem" }}
                >
                  <strong>Total:</strong>
                  <span>₹{getTotalPrice() + Math.round(getTotalPrice() * 0.1)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="card" style={{ flex: "1" }}>
            <div className="card-content">
              <h3 className="card-title">Payment Details</h3>

              {paymentStep === 1 ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Select Payment Method</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={paymentMethod === "credit-card"}
                          onChange={() => setPaymentMethod("credit-card")}
                        />{" "}
                        Credit/Debit Card
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                        />{" "}
                        PayPal
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      className="form-control"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={handleChange}
                    />
                    {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      className="form-control"
                      placeholder="John Doe"
                      value={paymentDetails.cardName}
                      onChange={handleChange}
                    />
                    {errors.cardName && <div className="error-message">{errors.cardName}</div>}
                  </div>

                  <div className="flex gap-20">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        className="form-control"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={handleChange}
                      />
                      {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
                    </div>

                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        className="form-control"
                        placeholder="123"
                        value={paymentDetails.cvv}
                        onChange={handleChange}
                      />
                      {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={paymentDetails.saveCard}
                        onChange={handleChange}
                      />{" "}
                      Save card for future bookings
                    </label>
                  </div>

                  <div className="form-group">
  <Link to="/history" style={{ width: "100%" }}>
    <button type="button" className="btn btn-primary" style={{ width: "100%" }}>
      Complete Payment
    </button>
  </Link>
</div>

                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ width: "100%" }}
                      onClick={() => setPaymentStep(1)}
                    >
                      Back
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment