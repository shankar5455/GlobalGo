import React from 'react';
import '../style/MyBooking.css';

const MyBookings = () => {
  const bookings = [
    {
      id: 1,
      type: 'Flight',
      provider: 'Delta Airlines - DL1234',
      from: 'New York (JFK)',
      to: 'Los Angeles (LAX)',
      date: '2023-07-15',
      departure: '08:00 AM',
      arrival: '11:30 AM',
      duration: '5h 30m',
      price: '$299',
      status: 'confirmed',
      bookedOn: '2023-06-15',
    },
  ];

  return (
    <div className="booking-page-container">
      <h2 className="booking-page-title">My Bookings</h2>
      <p className="booking-page-subtitle">View and manage your bookings</p>

      <div className="booking-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <h3>{booking.provider}</h3>
              <span className={`booking-status ${booking.status}`}>{booking.status}</span>
              <span className="booking-id">Booking ID: #{booking.id}</span>
            </div>

            <div className="booking-details">
              <p><strong>From:</strong> {booking.from}</p>
              <p><strong>To:</strong> {booking.to}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Departure:</strong> {booking.departure}</p>
              <p><strong>Arrival:</strong> {booking.arrival}</p>
              <p><strong>Duration:</strong> {booking.duration}</p>
              <p><strong>Total Price:</strong> {booking.price} <span className="booking-paid">(paid)</span></p>
              <p><strong>Booked on:</strong> {booking.bookedOn}</p>
            </div>

            {/* <button className="booking-details-btn">View Details</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
