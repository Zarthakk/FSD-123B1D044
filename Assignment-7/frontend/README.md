# Assignment 7 - Student Feedback Review System (React + Node.js + MongoDB)

## 📌 Problem Statement

Design and develop a full-stack web application using React.js, Node.js, Express, and MongoDB. The application should allow users to submit and manage feedback dynamically.

---

## 🎯 Objective

To build a modern full-stack application where users can:

* Submit feedback
* View all feedback
* Delete feedback
* Store and retrieve data from MongoDB

---

## 🌐 Features

* 📝 Add Feedback (Name, Message, Rating)
* 📋 View Feedback (Dynamic UI with cards)
* ❌ Delete Feedback
* 🔄 Real-time updates (React state management)
* 🎨 Modern UI with responsive design and hover effects

---

## 🛠️ Technologies Used

### Frontend:

* React.js (Functional Components + Hooks)
* HTML, CSS
* JavaScript (ES6)

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB (Mongoose)

---

## 🧠 How It Works

1. User enters feedback in the form
2. React sends POST request to backend
3. Backend stores data in MongoDB
4. Feedback is fetched and displayed dynamically
5. User can delete feedback (DELETE request)

---

## 📁 Project Structure

```
Assignment-7/
 ├── backend/
 │    ├── server.js
 │    ├── package.json
 │    ├── models/
 │    │    └── Feedback.js
 │    └── routes/
 │         └── feedbackRoutes.js
 │
 ├── frontend/
 │    ├── package.json
 │    ├── public/
 │    └── src/
 │         ├── App.js
 │         ├── index.js
 │         ├── App.css
 │         └── components/
 │              ├── FeedbackForm.js
 │              └── FeedbackList.js
```

---

## 🚀 How to Run

### 1️⃣ Start Backend

```
cd backend
npm install
node server.js
```

👉 Backend runs on:

```
http://localhost:5001
```

---

### 2️⃣ Start Frontend

Open new terminal:

```
cd frontend
npm install
npm start
```

👉 Frontend runs on:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

* GET `/api/feedback` → Get all feedback
* POST `/api/feedback` → Add new feedback
* DELETE `/api/feedback/:id` → Delete feedback

---

## 📚 Learning Outcomes

* Full-stack development using MERN stack
* API creation using Express.js
* MongoDB integration using Mongoose
* React component-based architecture
* Handling HTTP requests (GET, POST, DELETE)
* Building responsive and interactive UI

---

## ⚠️ Note

* MongoDB must be running locally
* Backend and frontend should run simultaneously
* Ports must match between frontend and backend

---

## 👨‍💻 Author

Sarthak Bagde