# Admin Dashboard Project

## 📌 Introduction
This project is an **Admin Dashboard** built using **React.js (Frontend)** and **Node.js with PostgreSQL (Backend)**. The dashboard allows administrators to manage students, profiles, and authentication securely.

---

## 📌 Features
✅ Admin Registration & Login  
✅ JWT Authentication  
✅ Admin Profile Management  
✅ Student Management (Add, Edit, Delete, List, View)  
✅ Responsive Design with Navbar & Sidebar  
✅ Protected Routes (Only logged-in users can access the dashboard)  
✅ Prisma ORM with PostgreSQL  

---

## 📌 Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Token)
- **Routing:** React Router

---

## 📌 Project Setup

### 🛠 1. **Clone the Repository**
```sh
 git clone https://github.com/your-repo-link.git
 cd project-folder
```

### 🛠 2. **Install Dependencies**

#### **Frontend**
```sh
cd frontend
npm install
```

#### **Backend**
```sh
cd backend
npm install
```

---

## 📌 Running the Project

### 🚀 1. **Start Backend Server**
```sh
cd backend
npm run dev
```

### 🚀 2. **Start Frontend**
```sh
cd frontend
npm start
```

The project will run at: `http://localhost:3000`

---

## 📌 API Documentation
- Import the provided **Postman Collection** to test APIs.
- Check `Admin-Student Application.postman_collection.json` for API endpoints.

---



## 📌 Environment Variables
Create a `.env` file in both `frontend` and `backend`.

### **Frontend (`frontend/.env`)**
```sh
REACT_APP_API_URL=http://localhost:5000
```

### **Backend (`backend/.env`)**
```sh
DATABASE_URL="postgresql://postgres:Sairam@123@localhost:5433/hotel_booking_DB?schema=public"
JWT_SECRET="your_secret_key"
PORT=5000
```





