import { Link } from "react-router-dom"
import SearchBar from "../Componets/SearchBar"
import FeaturedDeals from "../Componets/FeaturedDeals"

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://thumbs.dreamstime.com/b/booking-search-flight-ticket-air-travel-vacation-concept-passport-computer-airplane-sky-background-global-map-151531046.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Discover Your Perfect Trip</h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Book flights, hotels, cabs, and restaurants all in one place
          </p>

          {/* Search Bar */}
          <div className="search-container">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <FeaturedDeals />

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>Everything you need for your perfect trip</p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Flights</h3>
                <p className="card-text">Find the best deals on flights to hundreds of destinations worldwide.</p>
                <Link to="/flights" className="btn btn-outline">
                  Book Flights
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Hotels</h3>
                <p className="card-text">From luxury resorts to budget-friendly options, find your perfect stay.</p>
                <Link to="/hotels" className="btn btn-outline">
                  Find Hotels
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Cab Services</h3>
                <p className="card-text">Reliable transportation options to get you where you need to go.</p>
                <Link to="/cabs" className="btn btn-outline">
                  Book Cabs
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Restaurants</h3>
                <p className="card-text">Discover and reserve tables at the best restaurants in town.</p>
                <Link to="/restaurants" className="btn btn-outline">
                  Find Restaurants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="container">
          <div className="section-title">
            <h2>What Our Customers Say</h2>
            <p>Read reviews from travelers who've used our services</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}>
            <div className="card">
              <div className="card-content">
                <div className="stars">★★★★★</div>
                <p className="card-text">
                  "TravelEase made booking my entire trip so simple! Found great flight deals and a perfect hotel."
                </p>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>- Sarah Johnson</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="stars">★★★★★</div>
                <p className="card-text">
                  "Excellent service! The cab booking feature saved me so much time during my business trip."
                </p>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>- Michael Reynolds</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="stars">★★★★★</div>
                <p className="card-text">
                  "I've been using TravelEase for all my trips. Their customer service is top-notch."
                </p>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>- Emily Chen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section">
        <div className="container text-center">
          <h2>Ready to Start Your Adventure?</h2>
          <p style={{ maxWidth: "600px", margin: "20px auto" }}>
            Join thousands of happy travelers who book their perfect trips with TravelEase
          </p>
          <Link to="/register" className="btn btn-primary">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

