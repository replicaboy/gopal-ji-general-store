# 🛒 ShopFlow: Local Shop Management Dashboard

**ShopFlow** is a complete, production-ready MERN stack application designed to help small business owners and shopkeepers digitize their daily operations. It provides an intuitive dashboard to manage inventory, track daily sales, and visualize business growth in real-time.

---

## ✨ Key Features

- **📊 Real-Time Analytics:** Visual charts and graphs for daily, weekly, and monthly sales performance.
- **📦 Inventory Management:** Full CRUD (Create, Read, Update, Delete) operations for products.
- **🔐 Secure Authentication:** Protected routes and secure user sessions using JSON Web Tokens (JWT).
- **⚠️ Low Stock Alerts:** Automatic dashboard notifications when product inventory falls below a certain threshold.
- **📱 Fully Responsive:** Seamless experience across mobile, tablet, and desktop screens built with Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Context API, Tailwind CSS, Recharts (for data visualization).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Mongoose for Object Data Modeling).
- **Security:** JWT (Authentication), bcrypt.js (Password Hashing).

---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/replicaboy/shop-dashboard.git](https://github.com/replicaboy/shop-dashboard.git)
cd shop-dashboard
```

### 2. Install Dependencies
You need to install packages for both the backend (server) and the frontend (client).
```bash
# Install backend dependencies
npm install

# Navigate to frontend directory and install dependencies
cd client
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory (server-side) and add your specific configuration:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Run the Application
You can run both the server and client concurrently (make sure you have `concurrently` installed, or run them in separate terminals).
```bash
# Go back to the root directory
cd ..

# Start the server (runs on http://localhost:5000)
npm run server

# Start the frontend (runs on http://localhost:3000)
npm run client
```

---

## 📂 Folder Structure

```text
├── server/               # Node.js/Express Backend
│   ├── config/           # Database connection
│   ├── controllers/      # Route logic and business logic
│   ├── models/           # Mongoose schemas (User, Product, Sale)
│   ├── routes/           # Express API endpoints
│   ├── middleware/       # Custom middleware (Auth validation)
│   └── server.js         # Entry point for backend
├── client/               # React.js Frontend
│   ├── src/components/   # Reusable UI components
│   ├── src/pages/        # Main dashboard views
│   ├── src/context/      # State management
│   └── App.js            # Entry point for frontend
└── README.md
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are always welcome! Feel free to check the issues page if you want to contribute.

## 📄 License
Copyright © 2026 **Hariom Thakur**. All Rights Reserved.
