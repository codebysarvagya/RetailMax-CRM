# RetailMax CRM — Today’s workflow

## What is already working

- Oracle AI Database Free is running.
- The `RETAILMAX` schema connects to `FREEPDB1`.
- Spring Boot backend starts at `http://localhost:8080`.
- Customer APIs and the `CUSTOMERS` table work.
- Angular frontend source is in the `frontend` folder.

## Work only from IntelliJ IDEA

1. Open IntelliJ IDEA.
2. Choose **File → Open** and select this `retailmax-backend` folder.
3. If IntelliJ asks, choose **Trust Project**.
4. Set the project SDK to `C:\Program Files\Java\jdk-25.0.2` in **File → Project Structure → Project SDK**.
5. Open `src/main/java/com/retailmax/crm/RetailmaxBackendApplication.java` and click the green run icon beside `main`.
6. Keep this backend run window open. It starts the API at `http://localhost:8080`.

## Start the Angular frontend inside IntelliJ

1. Open **View → Tool Windows → Terminal**.
2. Run these commands, one at a time:

```powershell
cd frontend
npm install
npm start
```

3. Open `http://localhost:4200` in the browser.

The frontend calls the Spring Boot backend on port `8080`. Both must stay running.

## Customer feature

- Create: form on the Angular page
- Read: customer table on the Angular page
- Update: Edit button
- Delete: Delete button

## Important folders

- `src/main/java` — Java Spring Boot backend
- `src/main/resources/application.properties` — Oracle connection settings
- `database/01_create_customers.sql` — Customer table SQL
- `frontend/src/app` — Angular screen and API calls
