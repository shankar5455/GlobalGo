import { Link } from "react-router-dom";

const deals = [
  {
    id: 1,
    title: "Paris Weekend Getaway",
    description: "Experience the city of love with our special weekend package",
    price: 499,
    image: "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/734/Em11.JPG",
    type: "flight",
  },
  {
    id: 2,
    title: "Luxury Beach Resort",
    description: "All-inclusive beach resort experience in Bali",
    price: 899,
    image: "https://imageio.forbes.com/specials-images/imageserve/648f06a6152abcf5ef5e44a9/e125175d2a6f8fed0c71b983c4d1368d/960x0.jpg?format=jpg&width=960",
    type: "hotel",
  },
  {
    id: 3,
    title: "Mountain Retreat",
    description: "Explore the Swiss Alps with this exclusive package",
    price: 699,
    image: "https://images.stockcake.com/public/0/3/d/03d47a12-c670-4a59-aadf-a65dc63d5adb_large/riverside-mountain-retreat-stockcake.jpg",
    type: "package",
  },
];

const FeaturedDeals = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <h2>Featured Deals</h2>
          <p>Explore our handpicked deals for unforgettable experiences</p>
        </div>

        <div className="grid">
          {deals.map((deal) => (
            <div key={deal.id} className="card">
              <img
                src={deal.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={deal.title}
                className="card-img"
              />
              <div className="card-content">
                <h3 className="card-title">{deal.title}</h3>
                <p className="card-text">{deal.description}</p>
                <div className="flex justify-between align-center">
                  <span className="price">${deal.price}</span>
                  <Link
                    to={`/${
                      deal.type === "flight"
                        ? "flights"
                        : deal.type === "hotel"
                        ? "hotels"
                        : deal.type === "package"
                        ? "packages"
                        : deal.type === "service"
                        ? "services"
                        : ""
                    }/${deal.id}`}
                    className="btn btn-primary"
                  >
                    View Deal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
