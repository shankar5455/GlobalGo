# GlobalGo

[![Java](https://img.shields.io/badge/Java-21-orange)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.4-6DB33F)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF)](https://vitejs.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1)](https://www.mysql.com/)

GlobalGo is a full-stack travel booking platform for browsing and managing flights, hotels, cabs, and restaurants, with role-based user/admin flows and profile management.

## Features

- Multi-service travel discovery (flights, hotels, cabs, restaurants)
- User authentication (register/login) with role support (`USER`, `ADMIN`)
- Admin user management (view/delete users)
- User profile management:
  - account updates
  - profile picture upload
  - traveller preferences
  - notification preferences
  - saved card details
- Search and filter interfaces for each booking domain
- Booking/payment UI flow (partially implemented)

## Tech Stack

### Frontend
- React 19
- React Router DOM 7
- Axios
- Vite
- ESLint
- html2pdf.js (installed dependency)

### Backend
- Java 21
- Spring Boot 3.4.4
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Mail
- MySQL Connector/J
- Maven Wrapper (`mvnw`)

### Database
- MySQL 8+
- Hibernate/JPA (`ddl-auto=update`)

## Project Structure

```text
GlobalGo/
├── Backend/
│   └── GlobalGo/
│       ├── pom.xml
│       ├── mvnw / mvnw.cmd
│       └── src/
│           ├── main/java/com/klef/fsd/springboot/
│           │   ├── config/            # Security + CORS config
│           │   ├── controller/        # REST endpoints
│           │   ├── modal/             # JPA entities + enums
│           │   ├── repository/        # Spring Data repositories
│           │   └── service/           # Business logic
│           └── main/resources/
│               └── application.properties
├── Frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── src/
│       ├── Pages/                     # Route-level pages
│       ├── Componets/                 # Shared UI components (spelled as in repo)
│       ├── style/                     # CSS modules
│       ├── api.js                     # auth API helpers
│       └── App.jsx                    # route definitions
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- npm 9+
- Java 21 (required by Maven build)
- MySQL 8+

### 1) Clone repository

```bash
git clone https://github.com/pillyigshankar/GlobalGo.git
cd GlobalGo
```

### 2) Setup database

Create a MySQL database:

```sql
CREATE DATABASE globalgo;
```

### 3) Configure backend

Update backend configuration in:

`/home/runner/work/GlobalGo/GlobalGo/Backend/GlobalGo/src/main/resources/application.properties`

### 4) Install frontend dependencies

```bash
cd /home/runner/work/GlobalGo/GlobalGo/Frontend
npm ci
```

## Environment Variables

> Current codebase uses hardcoded properties and URLs; no `.env.example` is provided.

| Scope | Variable | Required | Default in Repo | Description |
|---|---|---:|---|---|
| Backend | `spring.datasource.url` | Yes | `jdbc:mysql://localhost:3306/globalgo` | MySQL JDBC URL |
| Backend | `spring.datasource.username` | Yes | `root` | DB username |
| Backend | `spring.datasource.password` | Yes | `Shankar@4` (hardcoded) | DB password |
| Backend | `spring.jpa.hibernate.ddl-auto` | Yes | `update` | Hibernate schema strategy |
| Frontend | `VITE_API_BASE_URL` | Recommended | _Not used_ | Suggested replacement for hardcoded `http://localhost:8080` |

## Running the Project

### Backend (Spring Boot)

```bash
cd /home/runner/work/GlobalGo/GlobalGo/Backend/GlobalGo
./mvnw spring-boot:run
```

Backend default URL: `http://localhost:8080`

### Frontend (Vite)

```bash
cd /home/runner/work/GlobalGo/GlobalGo/Frontend
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Build Instructions

### Frontend production build

```bash
cd /home/runner/work/GlobalGo/GlobalGo/Frontend
npm run build
```

### Backend package

```bash
cd /home/runner/work/GlobalGo/GlobalGo/Backend/GlobalGo
./mvnw clean package
```

> Backend is configured with WAR packaging.

## Docker Setup

Docker configuration files (`Dockerfile`, `docker-compose.yml`) are not present in this repository.

## API Documentation

Base URL: `http://localhost:8080`

### Auth/User
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/admin/register`
- `GET /api/auth/user`
- `GET /api/auth/user/{email}`
- `DELETE /api/auth/user/{id}`
- `PUT /api/auth/update`
- `PUT /api/auth/preferences`
- `PUT /api/auth/travellers`
- `PUT /api/auth/payment-methods`
- `PUT /api/auth/notifications`
- `GET /api/auth/me`
- `POST /api/auth/update-profile-picture`
- `POST /api/auth/add-card`

### Flights
- `POST /api/flights`
- `GET /api/flights`
- `GET /api/flights/{id}`
- `DELETE /api/flights/{id}`

### Hotels
- `POST /api/hotels`
- `GET /api/hotels`
- `GET /api/hotels/{id}`

### Cabs
- `POST /api/cabs`
- `GET /api/cabs`
- `GET /api/cabs/{id}`

### Restaurants
- `POST /api/restaurants/add`
- `GET /api/restaurants/all`

### Bookings
- `GET /api/bookings/user`
- `GET /api/bookings/user/{type}`
- `DELETE /api/bookings/{id}`

> Assumption: a payment endpoint is expected by frontend (`POST /api/payments`) but not found in backend controllers.

## Database Setup

- Engine: MySQL
- DB name used by default: `globalgo`
- ORM: Spring Data JPA + Hibernate
- Schema strategy: auto-update (`spring.jpa.hibernate.ddl-auto=update`)
- No migration tooling (Flyway/Liquibase) detected.

## Testing

### Frontend

```bash
cd /home/runner/work/GlobalGo/GlobalGo/Frontend
npm run lint
npm run build
```

### Backend

```bash
cd /home/runner/work/GlobalGo/GlobalGo/Backend/GlobalGo
./mvnw test
```

## Deployment

Detected deployment characteristics:
- Backend packaged as WAR (can run standalone Spring Boot or deploy to external servlet container)
- No infra-as-code or deployment manifests detected
- No CI/CD workflows detected in `.github/workflows`

Recommended minimum deployment path:
1. Externalize DB credentials using environment variables/secrets.
2. Build frontend static assets (`npm run build`) and host via CDN or reverse proxy.
3. Package backend (`./mvnw clean package`) and deploy WAR/JAR to a Java 21 runtime.
4. Provision managed MySQL and configure connection securely.

## Screenshots / Demo

UI assets exist in source (`Frontend/src/Pages/Dash.png`, `Frontend/src/Pages/image.png`).

Suggested additions:
- Home page screenshot
- Search results screenshot
- Profile/settings screenshot
- Admin dashboard screenshot

## Troubleshooting

- **Backend build fails with `release version 21 not supported`**  
  Install/use JDK 21 before running Maven.

- **Frontend build fails on `MyBooking.css` not found**  
  File import in `MyBookings.jsx` references `../style/MyBooking.css`, but naming mismatch may exist.

- **Authentication/token issues**  
  Current implementation uses email string as bearer token (not JWT), so keep frontend header format aligned with backend expectations.

- **CORS issues in local development**  
  Backend CORS currently allows `http://localhost:5173` and `http://localhost:3000`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make focused changes with tests/lint
4. Open a pull request with clear summary and validation steps

### Suggested local quality checks

```bash
# frontend
cd /home/runner/work/GlobalGo/GlobalGo/Frontend && npm run lint && npm run build

# backend
cd /home/runner/work/GlobalGo/GlobalGo/Backend/GlobalGo && ./mvnw test
```

## License

No license file was detected in the repository. Treat usage as **All Rights Reserved** until a license is explicitly added by maintainers.

## Author

- **shankar5455** (<pillyigshankar@gmail.com>)
- Repository owner: [pillyigshankar](https://github.com/pillyigshankar)

---

## Project Improvement Recommendations

### 1) Structure Improvements
- Rename `Frontend/src/Componets` to `Components` for consistency.
- Separate backend DTOs from entities to avoid exposing internal models directly.
- Add dedicated API client configuration in frontend with environment-based base URL.

### 2) Missing Documentation
- Add API request/response examples.
- Add architecture diagram (frontend ↔ backend ↔ DB).
- Add setup docs for seed/sample data.

### 3) Missing Scripts/Configurations
- Add root-level scripts (or Makefile) to run frontend/backend together.
- Add `.env.example` for frontend and backend.
- Add database migrations (Flyway/Liquibase).

### 4) Security Concerns
- Remove hardcoded DB password from source control.
- Replace email-based bearer token with proper JWT/session auth.
- Restrict permissive endpoint authorization in Spring Security.
- Avoid storing raw card CVV/card data in database; use PCI-compliant tokenization provider.

### 5) CI/CD Recommendations
- Add GitHub Actions workflow:
  - Frontend: install, lint, build
  - Backend: Java 21 setup, test, package
- Add dependency vulnerability scanning and SAST checks.
- Add branch protection with required status checks.
