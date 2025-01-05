# MERN Admin Dashboard and User Management App

![Dashboard Preview](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153734.png)

## 🌟 Overview

This is a feature-rich **Admin Dashboard and User Management App** built with the **MERN stack**, designed for secure, scalable, and responsive user management. It leverages modern web development tools such as **JWT tokens**, **Redux Toolkit**, **Firebase**, **Tailwind CSS**, and **TypeScript**.

---

## 🚀 Features

- **Secure Authentication**: Built with access and refresh tokens using **JWT**.
- **Admin User Controls**: Admins can:
  - Add new users.
  - Edit user details.
  - Block or unblock users.
  - Delete users.
- **Profile Management**: Users can upload profile pictures using **Multer**.
- **Search Functionality**: Quickly find users via the search bar.
- **Responsive Design**: Fully responsive UI styled with **Tailwind CSS** for a sleek look on all devices.

---

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (Access and Refresh Tokens)
- **File Uploads**: Multer for handling profile photos
- **Build Tools**: Concurrently, TypeScript

---

## 📝 Installation Guide

### Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/) (v16 or higher).
- **MongoDB**: Set up a MongoDB database (local or cloud).

---

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ayush-Martin/mern-admin-dashboard.git
   cd mern-admin-dashboard
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the `backend` directory with the following details:

   ```plaintext
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   SALT_ROUNDS=10
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRATION_MINUTES=5
   REFRESH_TOKEN_EXPIRATION_DAYS=7
   BACKEND_DOMAIN=http://localhost:5000
   FRONTEND_DOMAIN=http://localhost:4000
   ```

5. **Run the app in development mode**

   ```bash
   npm run dev
   ```

   This will run both the **frontend** and **backend** in development mode concurrently.

6. **Build the app for production**

   ```bash
   npm run build
   ```

7. **Access the app**
   - For development mode: Open your browser and go to `http://localhost:4000`.
   - For production mode: Deploy the build files and backend to your server.

---

## 📸 Screenshots

### Dashboard

![login-web](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153540.png)
![login-mobile](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153800.png)
![register-web](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153608.png)
![register-phone](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153808.png)
![home](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153630.png)
![profile-web](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153642.png)
![profile-phone](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153842.png)
![dashboard-web](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153734.png)
![dashboard-phone](https://raw.githubusercontent.com/Ayush-Martin/mern-admin-dashboard/refs/heads/main/preview/Screenshot%202025-01-05%20153908.png)

---

---

## 🧩 Scripts

- `npm run dev`: Runs both the **frontend** and **backend** in development mode.
- `npm run build`: Builds both the frontend and backend for production.
- `npm run frontend`: Builds the frontend files.
- `npm run backend`: Builds the backend files.
- `npm run frontend-dev`: Runs the frontend in development mode.
- `npm run backend-dev`: Runs the backend in watch mode with `nodemon`.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with your ideas or improvements.

---

## 📧 Contact

For questions or suggestions, reach out to:  
📧 Email: [ayushmartin@gmail.com](mailto:ayushmartin@gmail.com)  
💻 GitHub: [Ayush-Martin](https://github.com/Ayush-Martin)
