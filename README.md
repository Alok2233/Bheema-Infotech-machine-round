#  MERN Dating App – Bheema Infotech Machine Test

A modern **MERN Stack Dating Application** built as part of the **Bheema Infotech MERN Intern Machine Test**.  
It features user registration, authentication, nearby user discovery using geolocation, and a real-time chat system inspired by WhatsApp — all wrapped in a beautiful **Tailwind CSS + Framer Motion** UI.

---

## 🚀 Features

### 🔐 Authentication
- Secure registration & login using **JWT tokens**
- Passwords hashed with **bcryptjs**

### 🌍 Location & Nearby Users
- Auto-detect user’s latitude and longitude via browser geolocation
- MongoDB **2dsphere** indexing to find users within a 10 km radius
- Excludes the logged-in user from the nearby list

### 💬 Real-Time Chat
- Built using **Socket.IO**
- WhatsApp-style chat page with live messaging
- “Messages” inbox page showing users who have contacted you

### 🧭 User Interface
- **Tailwind CSS + Framer Motion** animations
- Modern, responsive design with smooth transitions
- Gradient backgrounds and responsive layout for all screen sizes

---

## 🧱 Tech Stack

| Layer | Technology |
|:------|:------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (Compass / Atlas) |
| Realtime | Socket.IO |
| Auth | JWT (JSON Web Token) |
| Location | HTML5 Geolocation API + MongoDB 2dsphere |

---

## ⚙️ Environment Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Alok2233/Bheema-Infotech-machine-round

🧩 MongoDB Schema Details
🧍 User Schema — /models/User.js
{
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  gender:     { type: String, enum: ["Male", "Female", "Other"], required: true },
  age:        { type: Number, required: true },
  location: {
    type:       { type: String, enum: ["Point"], default: "Point" },
    coordinates:[Number],  
  }
}

📡 REST API Documentation

Base URL:

http://localhost:5000/api

🔐 Authentication Routes — /api
1️⃣ Register User

POST /register

Request Body:

{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "123456",
  "gender": "Female",
  "age": 25,
  "latitude": 12.9716,
  "longitude": 77.5946
}


Response (201):

{
  "message": "User registered successfully",
  "user": {
    "_id": "65a7c3f...",
    "name": "Alice",
    "email": "alice@example.com",
    "gender": "Female",
    "age": 25,
    "location": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716]
    }
  }
}

2️⃣ Login User

POST /login

{
  "email": "alice@example.com",
  "password": "123456"
}


Response:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65a7c3f...",
    "name": "Alice",
    "email": "alice@example.com"
  }
}

🌍 Nearby Users — /api/nearby-users (Protected)

GET /nearby-users

Header:

Authorization: Bearer <JWT_TOKEN>


Response:

[
  {
    "_id": "65a7c5f...",
    "name": "Bob",
    "gender": "Male",
    "age": 27,
    "location": {
      "type": "Point",
      "coordinates": [77.5900, 12.9722]
    }
  }
]

