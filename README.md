# Inventory Management System

Simple school project with a MERN-style folder structure using SQLite instead of MongoDB.

## Tech stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: SQLite
- Authentication: JWT
- Styling: basic CSS

## Project structure

- `backend/`
  - `server.js` - Express server entry
  - `database.js` - SQLite database initialization
  - `routes/` - API route definitions
  - `controllers/` - business logic for auth and products
  - `middleware/` - JWT auth middleware

- `frontend/`
  - `src/` - React application source
  - `src/pages/` - pages for login, register, inventory, add, edit
  - `src/components/` - shared layout components
  - `src/services/` - API helper and auth/product services

## Setup

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```powershell
   cd backend
   npm install
   ```
3. Start the backend server:
   ```powershell
   npm run dev
   ```
4. The backend runs on `http://localhost:5000`

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```powershell
   cd frontend
   npm install
   ```
3. Start the frontend app:
   ```powershell
   npm run dev
   ```
4. Open the browser at the URL shown by Vite (usually `http://localhost:5173`).

## Features

- Dashboard with inventory stats, low stock alerts, and category summaries
- Register and login with hashed passwords and JWT tokens
- Protected inventory pages with search and category filter
- Add, view, edit, and delete products
- Local SQLite database stored in `backend/database.sqlite`

## Default credentials

A default admin user is seeded automatically when the backend starts:

- Email: `admin@inventory.local`
- Password: `Admin123!`

## Notes

- The backend uses `sqlite3` and initializes the tables automatically.
- JWT secret is defined in code by default (`inventory-secret`). You can set `JWT_SECRET` in environment variables.
- The frontend stores the JWT token and user profile data in `localStorage`.
