export const users = [
  {
    id: 1,
    username: "johndoe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    bookingHistory: [1, 3],
  },
  {
    id: 2,
    username: "janedoe",
    email: "jane@example.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Doe",
    phone: "098-765-4321",
    address: "456 Oak St, Somewhere, USA",
    bookingHistory: [2],
  },
  {
    id: 3,
    username: "adminuser",
    email: "admin@example.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    phone: "555-555-5555",
    address: "789 Admin St, Adminville, USA",
    isAdmin: true,
    bookingHistory: [],
  },
]

