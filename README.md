# MAXIMIZE CRM / RetailMax CRM

> An enterprise-ready Retail Customer Relationship Management (CRM) web application developed with **Angular 21**, **Spring Boot 4.1.1 (Java 25)**, and **Oracle Database 26ai Free**. Designed to manage customer records, track prospective sales leads across lifecycle stages, and deliver real-time operational dashboard analytics.

---

## 1. Project Title
**MAXIMIZE CRM / RetailMax CRM**
*Academic Capstone / Enterprise Software Engineering Project (2026)*

---

## 2. Project Overview
RetailMax CRM is a full-stack retail management solution built to streamline how retail organizations capture, monitor, and convert prospect inquiries while maintaining an authoritative record of existing customers.

The application centralizes core retail business workflows:
- Maintaining customer directories with strict data validation.
- Tracking sales prospects (leads) from multiple acquisition channels.
- Moving leads systematically through standardized sales pipeline stages.
- Visualizing pipeline conversion efficiency, source breakdown, and recent lead activity through a real-time analytics dashboard.

---

## 3. Problem Statement
Retail organizations frequently manage customer contacts and sales inquiries using ad-hoc tools such as personal spreadsheets, paper logbooks, and isolated messaging channels. This decentralized approach creates substantial operational hurdles:
- **Data Fragmentation & Inconsistency:** Customer contact records are scattered with no centralized validation or deduplication.
- **Lost Sales Opportunities:** Follow-ups with promising prospects are missed due to the absence of a defined lifecycle progression.
- **Unclear Channel Attribution:** Retail managers cannot identify which marketing channels (website, referrals, social media) generate the highest return on investment.
- **Lack of Real-Time Reporting:** Management has no instant overview of active sales pipeline volume or conversion success rates.

RetailMax CRM resolves these challenges by providing an integrated, robust web platform backed by an Oracle relational database to enforce data integrity, eliminate duplicates, and provide actionable operational reporting.

---

## 4. Objectives
- **Centralize Customer Records:** Provide a single source of truth for customer contact information with automated duplicate email prevention.
- **Standardize Sales Lead Tracking:** Capture prospective retail inquiries and monitor their progression through defined pipeline milestones.
- **Channel Performance Attribution:** Track origin sources for all incoming leads to evaluate acquisition channels.
- **Deliver Real-Time Dashboard Metrics:** Aggregate key business indicators (total customers, total leads, stage distribution, and conversion rates).
- **Maintain a Decoupled RESTful Architecture:** Ensure high maintainability and testability by cleanly separating the Angular presentation layer, Spring Boot service layer, and Oracle persistence tier.

---

## 5. Key Features
- **Responsive Single Page Application (SPA):** Built with Angular 21 standalone components and modern CSS.
- **RESTful Backend Services:** Spring Boot 4 REST controllers offering full CRUD operations and semantic HTTP status codes.
- **Dual-Layer Validation:** Jakarta Bean Validation on the backend (`@Valid`, `@NotBlank`, `@Email`, `@Size`) paired with reactive client-side form validation.
- **Conflict & Duplicate Detection:** Proactive detection of duplicate email addresses with `HTTP 409 Conflict` feedback.
- **Pipeline & Channel Analytics:** Dynamic calculation of lead distribution by status stage and acquisition source.
- **Secure Configuration:** Externalized secrets configuration using environment variables (`${DB_PASSWORD}`) to safeguard database credentials.

---

## 6. Modules

### A. Customer Management Module
- **Customer Creation:** Add customers with name, email address, and phone number.
- **Directory Viewing:** Tabular display of all registered customers.
- **Real-Time Search:** Instant filtering across customer name, email, and phone number.
- **Customer Updates:** In-place editing modal with validation checks.
- **Safe Record Deletion:** Deletion confirmation dialog to prevent accidental data loss.
- **Duplicate Prevention:** Rejects duplicate email submissions at both service and database levels.

### B. Lead Management Module
- **Lead Creation:** Intake prospective buyers with contact details, acquisition channel, and initial status.
- **Lead Directory:** Comprehensive table displaying contact data, source, and lifecycle stage.
- **Multi-Field Filtering:** Search leads dynamically across name, email, phone, source, and status.
- **Stage Progression:** Update lead statuses as prospects advance through the sales funnel.
- **Lead Removal:** Safe deletion confirmation flow.
- **Email Uniqueness:** Enforces unique email constraints across active leads.

### C. Dashboard & Reporting Module
- **Total Customer Counter:** Live count of registered retail customers.
- **Total Lead Counter:** Live count of all recorded sales leads.
- **Lead Status Breakdown:** Stage distribution counter (`NEW`, `CONTACTED`, `QUALIFIED`, `CONVERTED`, `LOST`).
- **Lead Source Breakdown:** Visualized channel distribution and percentage share (`WEBSITE`, `REFERRAL`, `SOCIAL_MEDIA`, `ADVERTISEMENT`, `OTHER`).
- **Conversion Rate Metric:** Calculated percentage of leads successfully reaching `CONVERTED` status.
- **Recent Leads Feed:** Quick table showing the 5 most recently created leads.
- **Live System Health Indicator:** Communicates with `/api/health` to confirm active backend connectivity.

---

## 7. Technology Stack

### Frontend
- **Framework:** Angular 21 (v21.2.0)
- **Language:** TypeScript 5.9
- **Architecture:** Standalone Components, Angular Signals / Reactive Forms
- **HTTP Client:** Angular `provideHttpClient`
- **Routing:** Angular Router
- **Styling:** CSS3 (modern responsive card layout, status badges, modal overlays)

### Backend
- **Framework:** Spring Boot 4.1.1
- **Language:** Java 25 (LTS)
- **Web Layer:** Spring Web MVC (`@RestController`)
- **Data Access:** Spring Data JPA
- **Persistence Engine:** Hibernate / Jakarta Persistence API (JPA)
- **Validation:** Jakarta Validation API / Hibernate Validator (`spring-boot-starter-validation`)
- **Database Driver:** Oracle JDBC Driver (`ojdbc17`, runtime scope)
- **Build & Dependency Management:** Apache Maven / Maven Wrapper

### Database
- **RDBMS:** Oracle Database 26ai Free (compatible with Oracle XE 21c/19c)
- **Pluggable Database (PDB):** `FREEPDB1`
- **Application User / Schema:** `RETAILMAX`
- **Port:** `1521`

---

## 8. System Architecture

The project implements a decoupled multi-tiered architecture:

```
┌────────────────────────────────────────────────────────┐
│             Angular 21 Frontend (Port 4200)            │
│   (DashboardComponent, CustomerComponent, LeadComponent) │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP / JSON REST Calls
                            ▼
┌────────────────────────────────────────────────────────┐
│           Spring Boot 4 Backend API (Port 8080)        │
│   ┌────────────────────────────────────────────────┐   │
│   │ Controllers (CustomerController, LeadController)│  │
│   └───────────────────────┬────────────────────────┘   │
│                           ▼                            │
│   ┌────────────────────────────────────────────────┐   │
│   │ Services (CustomerService, LeadService)        │   │
│   │ Business logic, validation, duplicate checks   │   │
│   └───────────────────────┬────────────────────────┘   │
│                           ▼                            │
│   ┌────────────────────────────────────────────────┐   │
│   │ Repositories (CustomerRepository, LeadRepository) │
│   └───────────────────────┬────────────────────────┘   │
│                           ▼                            │
│   ┌────────────────────────────────────────────────┐   │
│   │ Hibernate / JPA ORM Layer                      │   │
│   └────────────────────────────────────────────────┘   │
└───────────────────────────┬────────────────────────────┘
                            │ Oracle JDBC Thin Client (Port 1521)
                            ▼
┌────────────────────────────────────────────────────────┐
│          Oracle Database 26ai Free (FREEPDB1)          │
│            CUSTOMERS Table  |  LEADS Table             │
└────────────────────────────────────────────────────────┘
```

---

## 9. Project Structure

```
RetailMax-CRM/
│
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI for backend and frontend builds
│
├── backend/                     # Spring Boot Java application
│   ├── .mvn/                    # Maven Wrapper settings
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/retailmax/crm/
│   │   │   │   ├── RetailmaxBackendApplication.java
│   │   │   │   ├── common/
│   │   │   │   │   ├── AppStatusController.java    # /api/health endpoint
│   │   │   │   │   └── CorsConfig.java             # CORS mapping for localhost:4200
│   │   │   │   ├── customer/
│   │   │   │   │   ├── Customer.java               # JPA Entity
│   │   │   │   │   ├── CustomerController.java     # REST Controller
│   │   │   │   │   ├── CustomerRepository.java     # Spring Data JPA Repository
│   │   │   │   │   ├── CustomerRequest.java        # Validation Record (DTO)
│   │   │   │   │   └── CustomerService.java        # Business Logic & Conflict Detection
│   │   │   │   └── lead/
│   │   │   │       ├── Lead.java                   # JPA Entity
│   │   │   │       ├── LeadController.java         # REST Controller
│   │   │   │       ├── LeadRepository.java         # Spring Data JPA Repository
│   │   │   │       ├── LeadRequest.java            # Validation Record (DTO)
│   │   │   │       └── LeadService.java            # Business Logic & Conflict Detection
│   │   │   └── resources/
│   │   │       └── application.properties          # Server port, datasource config (${DB_PASSWORD})
│   │   └── test/
│   │       └── java/com/retailmax/crm/
│   │           └── RetailmaxBackendApplicationTests.java
│   ├── mvnw                     # Maven Wrapper (Unix/macOS)
│   ├── mvnw.cmd                 # Maven Wrapper (Windows)
│   └── pom.xml                  # Maven project descriptor
│
├── frontend/                    # Angular 21 Single Page Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── customers/       # Customer component, modal form, service, model
│   │   │   ├── dashboard/       # Dashboard analytics, pipeline cards, distribution tables
│   │   │   ├── leads/           # Lead component, modal form, service, model
│   │   │   ├── app.config.ts    # App routing & HTTP provider setup
│   │   │   ├── app.html         # Navbar layout and router outlet
│   │   │   ├── app.routes.ts    # Application route definitions
│   │   │   └── app.ts           # Root component
│   │   ├── index.html           # HTML template
│   │   ├── main.ts              # Angular entry point
│   │   └── styles.css           # Global typography and base CSS
│   ├── angular.json             # Angular workspace configuration
│   ├── package.json             # Dependencies and NPM scripts
│   └── tsconfig.json            # TypeScript configuration
│
├── database/                    # SQL DDL Scripts
│   ├── 01_create_customers.sql  # Schema for CUSTOMERS table
│   └── 02_create_leads.sql      # Schema for LEADS table
│
├── .gitignore                   # Excludes build outputs, node_modules, secrets, IDE files
└── README.md                    # Project documentation
```

---

## 10. Database Design

Database DDL scripts are provided in the `database/` folder and are designed for direct execution in Oracle Database 26ai Free (`FREEPDB1`).

### Decoupled Table Architecture
The database consists of two primary operational tables: **`CUSTOMERS`** and **`LEADS`**.

> **Important Architecture Note:**
> `CUSTOMERS` and `LEADS` are intentionally modeled as **separate, decoupled tables without a direct foreign key relationship**. Leads represent prospective opportunities that may or may not result in a sale, possessing attributes specific to the sales pipeline (`source`, `status`) that do not belong to confirmed customer records.

---

## 11. Customer Database
**Table Name:** `CUSTOMERS`
**Migration Script:** `database/01_create_customers.sql`

| Column | Oracle Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `ID` | `NUMBER` | `GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY` | Unique customer identifier |
| `NAME` | `VARCHAR2(150)` | `NOT NULL` | Customer's full name |
| `EMAIL` | `VARCHAR2(255)` | `NOT NULL UNIQUE` | Customer email address (strictly unique) |
| `PHONE` | `VARCHAR2(30)` | `NULL` | Optional contact telephone number |

*Legacy Column Note:* In existing or migrated Oracle environments, the `CUSTOMERS` table may contain legacy columns such as `FIRST_NAME`, `LAST_NAME`, `CREATED_AT`, or `UPDATED_AT`. The current RetailMax application actively maps and uses `ID`, `NAME`, `EMAIL`, and `PHONE`. No unused functionality is invented around legacy fields.

---

## 12. Lead Database
**Table Name:** `LEADS`
**Migration Script:** `database/02_create_leads.sql`

| Column | Oracle Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `ID` | `NUMBER` | `GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY` | Unique lead identifier |
| `NAME` | `VARCHAR2(150)` | `NOT NULL` | Lead prospect full name |
| `EMAIL` | `VARCHAR2(255)` | `NOT NULL UNIQUE` | Lead email address (strictly unique) |
| `PHONE` | `VARCHAR2(30)` | `NULL` | Optional contact telephone number |
| `SOURCE` | `VARCHAR2(50)` | `NOT NULL` | Marketing/acquisition channel |
| `STATUS` | `VARCHAR2(50)` | `NOT NULL` | Current lifecycle stage in the funnel |

---

## 13. Lead Sources
The application tracks five distinct acquisition channels:
- **`WEBSITE`:** Inquiries submitted through digital store portals or web contact forms.
- **`REFERRAL`:** Word-of-mouth recommendations from existing clients or partners.
- **`SOCIAL_MEDIA`:** Leads generated from social media marketing campaigns.
- **`ADVERTISEMENT`:** Inquiries resulting from print, billboard, or targeted online ads.
- **`OTHER`:** In-store walk-ins, exhibitions, or miscellaneous promotional events.

---

## 14. Lead Status Lifecycle
Leads transition through a standardized 5-stage sales funnel:

```
[ NEW ] ──▶ [ CONTACTED ] ──▶ [ QUALIFIED ] ──▶ [ CONVERTED ]
                                        │
                                        └───▶ [ LOST ]
```

1. **`NEW`:** A freshly submitted prospect inquiry awaiting initial sales outreach.
2. **`CONTACTED`:** Initial contact established by sales representative (call, email, in-person consultation).
3. **`QUALIFIED`:** Lead verified to have budget, decision-making authority, and genuine retail product intent.
4. **`CONVERTED`:** Prospect completed a retail purchase or transaction.
5. **`LOST`:** Prospect decided not to purchase, became unresponsive, or disqualified themselves.

---

## 15. REST API Endpoints

All endpoints are hosted under the `/api` context path on port `8080`.

### Health & Connectivity
| HTTP Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Application status & health check | `200 OK` |

### Customer Endpoints (`/api/customers`)
| HTTP Method | Endpoint | Description | Payload | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/customers` | Retrieve all customers | None | `200 OK` |
| `GET` | `/api/customers/{id}` | Retrieve customer by ID | None | `200 OK`, `404 Not Found` |
| `POST` | `/api/customers` | Create a new customer | `CustomerRequest` (JSON) | `201 Created` (with `Location`), `400 Bad Request`, `409 Conflict` |
| `PUT` | `/api/customers/{id}` | Update existing customer | `CustomerRequest` (JSON) | `200 OK`, `400 Bad Request`, `404 Not Found`, `409 Conflict` |
| `DELETE` | `/api/customers/{id}` | Remove a customer | None | `204 No Content`, `404 Not Found` |

### Lead Endpoints (`/api/leads`)
| HTTP Method | Endpoint | Description | Payload | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/leads` | Retrieve all leads | None | `200 OK` |
| `GET` | `/api/leads/{id}` | Retrieve lead by ID | None | `200 OK`, `404 Not Found` |
| `POST` | `/api/leads` | Create a new lead | `LeadRequest` (JSON) | `201 Created` (with `Location`), `400 Bad Request`, `409 Conflict` |
| `PUT` | `/api/leads/{id}` | Update existing lead | `LeadRequest` (JSON) | `200 OK`, `400 Bad Request`, `404 Not Found`, `409 Conflict` |
| `DELETE` | `/api/leads/{id}` | Remove a lead | None | `204 No Content`, `404 Not Found` |

### Semantic Response Codes
- **`200 OK`:** Read or update request completed successfully.
- **`201 Created`:** New entity created; returns created entity and `Location` header.
- **`204 No Content`:** Deletion completed successfully.
- **`400 Bad Request`:** Validation failure (e.g. empty name, malformed email).
- **`404 Not Found`:** Resource does not exist for the supplied ID.
- **`409 Conflict`:** Email already registered to another record.

---

## 16. Backend Architecture
The backend is structured into clear layers using Spring Boot best practices:
- **`CustomerController` & `LeadController`:** Expose RESTful endpoints, parse incoming JSON, and enforce `@Valid` request boundaries.
- **`CustomerService` & `LeadService`:** Manage transactional boundaries (`@Transactional`), enforce uniqueness rules via `existsByEmail()`, and throw standardized `ResponseStatusException` errors.
- **`CustomerRepository` & `LeadRepository`:** Extend Spring Data's `JpaRepository<T, ID>` with custom derived query methods (`findByEmail`, `existsByEmail`).
- **`Customer` & `Lead` Entities:** JPA entities mapped to database tables with column definitions and identity sequences.
- **`CorsConfig`:** Configures Spring MVC CORS mappings to allow cross-origin requests from the Angular dev server (`http://localhost:4200`).
- **`AppStatusController`:** Exposes `/api/health` providing instant visibility into backend operational status.

---

## 17. Frontend Architecture
The frontend is built using Angular 21's modern standalone architecture:
- **`DashboardComponent`:** Uses RxJS `forkJoin` to fetch customer and lead lists concurrently, aggregating totals, status counts, channel percentages, and conversion rates.
- **`CustomerComponent`:** Handles full CRUD workflows for customers, supporting in-memory real-time search, form validation, edit state toggles, and delete modals.
- **`LeadComponent`:** Manages lead CRUD workflows, source tracking, status stage progression, and search filtering.
- **`CustomerService` & `LeadService`:** Injectable Angular services using `HttpClient` to communicate with backend REST endpoints.
- **Reactive State & Validation:** HTML5 and template-driven validation with visual inline error indicators.

---

## 18. Setup / Installation

### Prerequisites
- **Java Development Kit (JDK):** Version 25 (e.g. `C:\Program Files\Java\jdk-25.0.2` or OpenJDK 25)
- **Node.js:** Version 22 (LTS)
- **npm:** Version 10 or 11 (bundled with Node 22)
- **Oracle Database:** Oracle Database 26ai Free (or Oracle XE 21c/19c)
- **Git:** Version 2.30+

---

## 19. Oracle Database Setup
1. Verify Oracle Database 26ai Free is running on `localhost:1521`.
2. Connect to the container database as `SYS` or `SYSTEM` and switch to the pluggable database `FREEPDB1`:
   ```sql
   ALTER SESSION SET CONTAINER = FREEPDB1;
   ```
3. Create the `RETAILMAX` user:
   ```sql
   CREATE USER RETAILMAX IDENTIFIED BY "YOUR_SECURE_PASSWORD";
   GRANT CONNECT, RESOURCE TO RETAILMAX;
   ALTER USER RETAILMAX QUOTA UNLIMITED ON USERS;
   ```
4. Connect as user `RETAILMAX` to `FREEPDB1` and execute the schema scripts in order:
   ```sql
   -- 1. Create customers table
   @database/01_create_customers.sql

   -- 2. Create leads table
   @database/02_create_leads.sql
   ```

---

## 20. Environment Variable Configuration
The backend application externalizes the Oracle password using `${DB_PASSWORD}` in `application.properties`:

```properties
spring.datasource.url=jdbc:oracle:thin:@//localhost:1521/FREEPDB1
spring.datasource.username=RETAILMAX
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
spring.jpa.hibernate.ddl-auto=none
server.port=8080
```

### Setting `DB_PASSWORD` Locally

#### Windows PowerShell:
```powershell
$env:DB_PASSWORD = "YOUR_ORACLE_PASSWORD"
```

#### Windows Command Prompt:
```cmd
set DB_PASSWORD=YOUR_ORACLE_PASSWORD
```

#### Linux / macOS:
```bash
export DB_PASSWORD=YOUR_ORACLE_PASSWORD
```

#### IntelliJ IDEA Configuration:
1. Open **Run → Edit Configurations...**
2. Select `RetailmaxBackendApplication`.
3. Under **Environment variables**, add: `DB_PASSWORD=YOUR_ORACLE_PASSWORD`.
4. Click **Apply** and **Run**.

---

## 21. Running Backend

1. Open a terminal and navigate to the `backend/` directory:
   ```powershell
   cd backend
   ```
2. Start the application using the Maven Wrapper:
   - **Windows:**
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```
   - **Linux / macOS:**
     ```bash
     chmod +x mvnw
     ./mvnw spring-boot:run
     ```
3. The Spring Boot backend starts and listens on:
   ```
   http://localhost:8080
   ```
4. Test backend health:
   ```bash
   curl http://localhost:8080/api/health
   # Expected response: {"application":"RetailMax CRM API","status":"UP"}
   ```

---

## 22. Running Frontend

1. Open a separate terminal and navigate to the `frontend/` directory:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm ci
   ```
   *(or `npm install`)*
3. Start the Angular development server:
   ```powershell
   npm start
   ```
4. Access the web interface in your browser:
   ```
   http://localhost:4200
   ```
   The frontend automatically interacts with the Spring Boot backend on port 8080.

---

## 23. GitHub Actions / CI
Automated Continuous Integration is configured in `.github/workflows/ci.yml`.

The workflow runs on:
- Every `push` to branch `main`.
- Every `pull_request` targeting `main`.

### CI Pipeline Features
- **Backend Job (`backend`):** Sets up JDK 25 on Ubuntu, caches Maven packages, compiles production and test classes, and packages the runnable JAR via `./mvnw -B clean package -DskipTests`. It validates build integrity without requiring an external Oracle database or secrets in CI.
- **Frontend Job (`frontend`):** Sets up Node.js 22 on Ubuntu, caches NPM packages, executes clean install (`npm ci`), and builds the Angular application bundle (`npm run build`).

---

## 24. Testing & Verification

The project build and packaging can be tested independently:

### Backend Build Verification
```powershell
cd backend
.\mvnw.cmd clean package -DskipTests
```
*Result: Compiles 13 Java 25 classes and packages `backend/target/retailmax-backend-0.0.1-SNAPSHOT.jar` with zero errors.*

### Frontend Build Verification
```powershell
cd frontend
npm run build
```
*Result: Produces optimized production bundles in `frontend/dist/retailmax-frontend` in ~3 seconds with zero errors.*

---

## 25. Future Scope
The following enhancements represent planned future milestones:
- **Authentication & Authorization:** Integration of Spring Security and JWT-based Role-Based Access Control (RBAC) distinguishing Admin and Sales Representative roles.
- **Direct Lead-to-Customer Conversion:** A streamlined action to convert a `QUALIFIED` lead into a registered customer record with a single click.
- **Automated Communication:** Integration of automated email confirmation, SMS reminders, and messaging notifications upon status changes.
- **Advanced Funnel Analytics:** Funnel conversion visualizations, drop-off rate tracking, and average time-in-stage metrics.
- **AI-Assisted Lead Scoring:** Machine learning models to rank prospect likelihood of conversion based on source and interaction frequency.

---

## 26. Project Team / Author Section
- **Project Name:** MAXIMIZE CRM / RetailMax CRM
- **Author:** Sarvagya Rathour
- **GitHub Repository:** [codebysarvagya/RetailMax-CRM](https://github.com/codebysarvagya/RetailMax-CRM)
- **Academic Year:** 2026

---

## 27. License & Academic Note
This project was developed as an academic software engineering capstone demonstrating full-stack enterprise application architecture, relational database persistence with Oracle Database, and modern single-page frontend engineering with Angular.
