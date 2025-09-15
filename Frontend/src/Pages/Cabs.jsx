import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Cabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allCabs, setAllCabs] = useState([]);
  const [filteredCabs, setFilteredCabs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    passengers: 1,
  });
  const [filters, setFilters] = useState({
    cabType: [],
    maxPrice: 5000,
    minCapacity: 1,
  });
  const [loading, setLoading] = useState(true);

  // Fetch cabs from backend
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destination = params.get("destination") || "";
    const fromDate = params.get("fromDate") || "";
    const travelers = params.get("travelers") || 1;

    setSearchParams({
      pickupLocation: destination,
      dropoffLocation: "",
      pickupDate: fromDate,
      pickupTime: "12:00",
      passengers: Number(travelers),
    });

    axios
      .get("http://localhost:8080/api/cabs")
      .then((response) => {
        setAllCabs(response.data);
        setFilteredCabs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cabs:", error);
        setLoading(false);
      });
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let results = [...allCabs];

    // Filter by cab type
    if (filters.cabType.length > 0) {
      results = results.filter((cab) => filters.cabType.includes(cab.type));
    }

    // Filter by price
    results = results.filter((cab) => cab.price <= filters.maxPrice);

    // Filter by capacity
    results = results.filter((cab) => cab.capacity >= filters.minCapacity);

    // Filter by passengers
    results = results.filter((cab) => cab.capacity >= searchParams.passengers);

    setFilteredCabs(results);
  }, [allCabs, searchParams, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prev) => {
        const types = [...prev.cabType];

        if (checked) {
          types.push(value);
        } else {
          const index = types.indexOf(value);
          if (index > -1) {
            types.splice(index, 1);
          }
        }

        return { ...prev, cabType: types };
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  // Handle booking
  const handleBookCab = (cabId) => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate(`/payment?type=cab&id=${cabId}`);
    } else {
      navigate("/login");
    }
  };

  // Get unique cab types for filter
  const cabTypes = [...new Set(allCabs.map((cab) => cab.type))];

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Book a Cab</h1>
          <p>Travel in comfort with our reliable cab services</p>
        </div>

        <div className="search-form">
          <form>
            <div className="search-content">
              <div className="search-input">
                <label className="form-label">Pickup Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter pickup location"
                  value={searchParams.pickupLocation}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      pickupLocation: e.target.value,
                    })
                  }
                />
              </div>

              <div className="search-input">
                <label className="form-label">Dropoff Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter dropoff location"
                  value={searchParams.dropoffLocation}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      dropoffLocation: e.target.value,
                    })
                  }
                />
              </div>

              <div className="search-input">
                <label className="form-label">Pickup Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={searchParams.pickupDate}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      pickupDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="search-input">
                <label className="form-label">Pickup Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={searchParams.pickupTime}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      pickupTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="search-input">
                <label className="form-label">Passengers</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="10"
                  value={searchParams.passengers}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      passengers: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="search-btn">
                <button type="button" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex" style={{ gap: "20px", alignItems: "flex-start" }}>
          {/* Filters */}
          <div className="filter-sidebar" style={{ minWidth: "250px" }}>
            <h3>Filters</h3>

            <div className="filter-section">
              <h4>Cab Type</h4>
              <div className="filter-options">
                {cabTypes.map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      value={type}
                      checked={filters.cabType.includes(type)}
                      onChange={handleFilterChange}
                    />{" "}
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="filter-options">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="5"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="range-slider"
                />
                <div>Max: ₹{filters.maxPrice}</div>
              </div>
            </div>

            <div className="filter-section">
              <h4>Minimum Capacity</h4>
              <div className="filter-options">
                <input
                  type="number"
                  className="form-control"
                  name="minCapacity"
                  min="1"
                  max="10"
                  value={filters.minCapacity}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>

          {/* Cab List */}
          <div className="cab-results" style={{ flex: 1 }}>
            {loading ? (
              <div className="text-center">Loading cabs...</div>
            ) : filteredCabs.length === 0 ? (
              <div className="text-center">No cabs found matching your criteria.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCabs.map((cab) => (
                  <div
                    key={cab.id}
                    className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition-all"
                  >
                    <img
                      src={cab.image || "/placeholder.svg"}
                      alt={cab.name}
                      className="w-full h-48 object-cover rounded-xl mb-3"
                    />
                    <h3 className="text-xl font-bold">
                      {cab.name} ({cab.type})
                    </h3>
                    <p className="text-gray-600">
                      Capacity: {cab.capacity} | Luggage: {cab.luggage}
                    </p>
                    <p className="text-gray-800 font-medium mt-2">
                      ₹{cab.price} / hr
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                      {cab.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <button
                      className="btn btn-primary mt-4 w-full"
                      onClick={() => handleBookCab(cab.id)}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cabs;