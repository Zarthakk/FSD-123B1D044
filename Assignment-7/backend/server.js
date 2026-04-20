const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
const PORT = 5007;

// Replace this with your MongoDB Atlas connection string if needed.
const MONGODB_URI = "mongodb://127.0.0.1:27017/student_feedback_system";

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/feedback", feedbackRoutes);

// Simple default route to confirm the server is working.
app.get("/", (req, res) => {
  res.send("Student Feedback Review System backend is running.");
});

// Connect to MongoDB, then start the Express server.
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
