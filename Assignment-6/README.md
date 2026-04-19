# Assignment 6 - Online Appointment Booking System (Node.js + MongoDB)

## 📌 Problem Statement
Create an online appointment booking application using Node.js and Express. Use a NoSQL database like MongoDB to store and manage data.

---

## 🎯 Objective
To build a full-stack web application where users can:
- Book appointments
- View all appointments
- Delete appointments
- Store data persistently using MongoDB

---

## 🌐 Features
- 🏠 Home Dashboard with modern UI
- 📝 Book Appointment (Name, Date, Time)
- 📋 View Appointments (Card-based UI)
- ❌ Delete Appointment
- ✅ Success message after booking
- 🎨 Premium UI (Glassmorphism + Gradient + Hover Effects)

---

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS (Template Engine)
- HTML, CSS (Modern UI Design)

---

## 🧠 How It Works
1. User visits homepage  
2. Navigates to booking page  
3. Fills form and submits  
4. Data is stored in MongoDB  
5. User can view and delete appointments  

---

## 📁 Project Structure
Assignment-6/
├── server.js
├── package.json
├── models/
│ └── Appointment.js
├── views/
│ ├── index.ejs
│ ├── book.ejs
│ └── appointments.ejs
└── public/
└── style.css

---

## 🚀 How to Run

1. Install dependencies: npm install
2. Start MongoDB: brew services start mongodb-community
3. Run server: node server.js
4. Open in browser: http://localhost:3006

---

## 📚 Learning Outcomes
- Express routing and middleware
- MongoDB integration using Mongoose
- CRUD operations (Create, Read, Delete)
- Dynamic rendering using EJS
- UI/UX design improvements

---

## ⚠️ Note
This project uses local MongoDB. It can be extended to MongoDB Atlas for deployment.

---

## 👨‍💻 Author
Sarthak Bagde